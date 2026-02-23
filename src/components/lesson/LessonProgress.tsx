'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  // Extract pathId from URL
  const pathMatch = pathname.match(/\/path\/([^/]+)/);
  const pathId = pathMatch?.[1] ?? 'java';

  return (
    <div className="flex items-center gap-1.5">
      {module.lessons.map((lesson, idx) => {
        const isActive = lesson.id === currentLessonId;
        const isComplete = isLessonComplete(pathId, module.id, lesson.id);
        return (
          <div key={lesson.id} className="flex items-center">
            <Link
              href={`/path/${pathId}/module/${module.id}/lesson/${lesson.id}`}
              title={lesson.title}
              className="flex items-center justify-center transition-all duration-200"
            >
              {isComplete ? (
                <CheckCircle2 size={16} className="text-module-green" />
              ) : (
                <div className={cn(
                  'w-3 h-3 rounded-full transition-colors',
                  isActive
                    ? `${accent.bg}`
                    : 'bg-surface-3 hover:bg-border'
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
