import { Clock, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Lesson, Module } from '../../types';
import { Badge } from '../ui/Badge';

interface LessonHeaderProps {
  lesson: Lesson;
  module: Module;
  isComplete: boolean;
  lessonIndex: number;
  totalLessons: number;
}

export function LessonHeader({ lesson, module, isComplete, lessonIndex, totalLessons }: LessonHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{module.icon}</span>
        <Badge variant={module.accentColor}>{module.title}</Badge>
        <span className="text-gray-600 dark:text-gray-500">·</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {t('lessonHeader.lessonCount', 'Lesson {{current}} of {{total}}', { current: lessonIndex + 1, total: totalLessons })}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">{lesson.title}</h1>
        {isComplete && (
          <div className="flex items-center gap-1.5 text-green-600 dark:text-green-500 flex-shrink-0 mt-1">
            <CheckCircle2 size={18} />
            <span className="text-sm font-medium">{t('lessonHeader.complete', 'Complete')}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Clock size={13} className="text-gray-600 dark:text-gray-400" />
        <span className="text-sm text-gray-600 dark:text-gray-400">{lesson.estimatedMinutes} {t('common.minRead', 'min read')}</span>
      </div>
    </div>
  );
}
