import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { AppProgress, Module, MiniProject, PathProgress } from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

export function getModuleAccentClasses(color: Module['accentColor']) {
  const map = {
    blue: {
      bg: 'bg-module-blue',
      text: 'text-module-blue',
      border: 'border-module-blue',
      bgLight: 'bg-module-blue/10',
      ring: 'ring-module-blue',
      gradient: 'from-module-blue/80 to-module-blue',
    },
    purple: {
      bg: 'bg-module-purple',
      text: 'text-module-purple',
      border: 'border-module-purple',
      bgLight: 'bg-module-purple/10',
      ring: 'ring-module-purple',
      gradient: 'from-module-purple/80 to-module-purple',
    },
    green: {
      bg: 'bg-module-green',
      text: 'text-module-green',
      border: 'border-module-green',
      bgLight: 'bg-module-green/10',
      ring: 'ring-module-green',
      gradient: 'from-module-green/80 to-module-green',
    },
    red: {
      bg: 'bg-module-red',
      text: 'text-module-red',
      border: 'border-module-red',
      bgLight: 'bg-module-red/10',
      ring: 'ring-module-red',
      gradient: 'from-module-red/80 to-module-red',
    },
    cyan: {
      bg: 'bg-module-cyan',
      text: 'text-module-cyan',
      border: 'border-module-cyan',
      bgLight: 'bg-module-cyan/10',
      ring: 'ring-module-cyan',
      gradient: 'from-module-cyan/80 to-module-cyan',
    },
  };
  return map[color];
}

/** Get the PathProgress for a given pathId, or an empty one */
export function getPathProgress(progress: AppProgress, pathId: string): PathProgress {
  return progress.paths[pathId] ?? { modules: {} };
}

export function isModuleUnlocked(
  order: number,
  allModules: Module[],
  progress: AppProgress,
  pathId: string
): boolean {
  if (order === 1) return true;
  const prev = allModules.find((m) => m.order === order - 1);
  if (!prev) return false;
  const pp = getPathProgress(progress, pathId);
  const attempts = pp.modules[prev.id]?.quizAttempts ?? [];
  return attempts.length > 0 && Math.max(...attempts.map((a) => a.score)) >= 60;
}

export function getModuleProgress(
  module: Module,
  progress: AppProgress,
  pathId: string
): { completed: number; total: number; percent: number } {
  const pp = getPathProgress(progress, pathId);
  const mp = pp.modules[module.id];
  const completed = mp?.completedLessonIds.length ?? 0;
  const total = module.lessons.length;
  return { completed, total, percent: total > 0 ? (completed / total) * 100 : 0 };
}

export function getBestQuizScore(
  moduleId: string,
  progress: AppProgress,
  pathId: string
): number | null {
  const pp = getPathProgress(progress, pathId);
  const attempts = pp.modules[moduleId]?.quizAttempts ?? [];
  if (attempts.length === 0) return null;
  return Math.max(...attempts.map((a) => a.score));
}

export function normalizeOutput(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function checkPrediction(userAnswer: string, expected: string): boolean {
  return normalizeOutput(userAnswer) === normalizeOutput(expected);
}

export function getProjectProgress(
  moduleId: string,
  project: MiniProject,
  progress: AppProgress,
  pathId: string
): { completed: number; total: number; percent: number } {
  const pp = getPathProgress(progress, pathId);
  const mp = pp.modules[moduleId]?.projectProgress;
  const completed = mp?.completedStepIds.length ?? 0;
  const total = project.steps.length;
  return { completed, total, percent: total > 0 ? (completed / total) * 100 : 0 };
}
