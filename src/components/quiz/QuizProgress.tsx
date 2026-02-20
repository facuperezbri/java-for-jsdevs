import { cn } from '../../lib/utils';
import type { Module } from '../../types';
import { getModuleAccentClasses } from '../../lib/utils';

interface QuizProgressProps {
  current: number;
  total: number;
  answers: Record<string, string>;
  questionIds: string[];
  module: Module;
}

export function QuizProgress({ current, answers, questionIds, module }: QuizProgressProps) {
  const accent = getModuleAccentClasses(module.accentColor);

  return (
    <div className="flex items-center gap-2 mb-6">
      {questionIds.map((id, idx) => {
        const answered = id in answers;
        const isActive = idx === current;
        return (
          <div
            key={id}
            className={cn(
              'flex-1 h-1.5 rounded-full transition-all duration-300',
              isActive ? accent.bg : answered ? 'bg-module-green/60' : 'bg-surface-3'
            )}
          />
        );
      })}
    </div>
  );
}
