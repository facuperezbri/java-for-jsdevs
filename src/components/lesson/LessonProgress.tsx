'use client';

import Link from 'next/link';
import type { Module } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { getModuleAccentClasses } from '../../lib/utils';
import { cn } from '../../lib/utils';
import { CheckCircle2 } from 'lucide-react';

interface LessonProgressProps {
  module: Module;
  currentLessonId: string;
}

export function LessonProgress({ module, currentLessonId }: LessonProgressProps) {
  const { isLessonComplete } = useProgress();
  const accent = getModuleAccentClasses(module.accentColor);

  return (
    <div className="flex items-center gap-1.5">
      {module.lessons.map((lesson, idx) => {
        const isActive = lesson.id === currentLessonId;
        const isComplete = isLessonComplete(module.id, lesson.id);
        return (
          <div key={lesson.id} className="flex items-center">
            <Link
              href={`/module/${module.id}/lesson/${lesson.id}`}
              title={lesson.title}
              className={cn(
                'flex items-center justify-center transition-all duration-200',
                isActive ? 'scale-110' : ''
              )}
            >
              {isComplete ? (
                <CheckCircle2 size={16} className="text-module-green" />
              ) : (
                <div className={cn(
                  'w-2.5 h-2.5 rounded-full border transition-colors',
                  isActive
                    ? `${accent.bg} border-transparent ring-2 ring-offset-2 ring-offset-page-bg ${accent.ring}`
                    : 'bg-transparent border-border hover:border-text-muted'
                )} />
              )}
            </Link>
            {/* Connecting line */}
            {idx < module.lessons.length - 1 && (
              <div className={cn(
                'w-3 h-px mx-0.5',
                isComplete ? 'bg-module-green/40' : 'bg-border-subtle'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
