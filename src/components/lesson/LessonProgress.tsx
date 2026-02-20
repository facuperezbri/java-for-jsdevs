import { Link } from 'react-router-dom';
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
      {module.lessons.map((lesson) => {
        const isActive = lesson.id === currentLessonId;
        const isComplete = isLessonComplete(module.id, lesson.id);
        return (
          <Link
            key={lesson.id}
            to={`/module/${module.id}/lesson/${lesson.id}`}
            title={lesson.title}
            className={cn(
              'flex items-center justify-center transition-all duration-200',
              isActive ? 'scale-110' : ''
            )}
          >
            {isComplete ? (
              <CheckCircle2 size={16} className="text-green-400" />
            ) : (
              <div className={cn(
                'w-2.5 h-2.5 rounded-full border transition-colors',
                isActive ? `${accent.bg} border-transparent` : 'bg-transparent border-surface-600 hover:border-gray-400'
              )} />
            )}
          </Link>
        );
      })}
    </div>
  );
}
