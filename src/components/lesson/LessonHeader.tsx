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
        <span className="text-text-muted">·</span>
        <span className="text-sm text-text-tertiary">
          {t('lessonHeader.lessonCount', 'Lesson {{current}} of {{total}}', { current: lessonIndex + 1, total: totalLessons })}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <h1 className="font-display text-display-lg text-text-primary tracking-tight">{lesson.title}</h1>
        {isComplete && (
          <div className="flex items-center gap-1.5 bg-module-green/10 text-module-green px-3 py-1 rounded-full flex-shrink-0 mt-1">
            <CheckCircle2 size={14} />
            <span className="text-xs font-medium">{t('lessonHeader.complete', 'Complete')}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Clock size={13} className="text-text-tertiary" />
        <span className="text-sm text-text-tertiary">{lesson.estimatedMinutes} {t('common.minRead', 'min read')}</span>
      </div>
    </div>
  );
}
