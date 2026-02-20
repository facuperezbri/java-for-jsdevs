'use client';

import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { Lesson, Module } from '../../types';
import { Button } from '../ui/Button';

interface LessonNavProps {
  prevLesson?: Lesson;
  nextLesson?: Lesson;
  module: Module;
  allLessonsComplete: boolean;
  onPrev: () => void;
  onNext: () => void;
  onGoToQuiz: () => void;
}

export function LessonNav({ prevLesson, nextLesson, allLessonsComplete, onPrev, onNext, onGoToQuiz }: LessonNavProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border-subtle">
      <div>
        {prevLesson ? (
          <Button variant="secondary" size="sm" onClick={onPrev}>
            <ChevronLeft size={16} />
            {t('lessonNav.previous', 'Previous')}
          </Button>
        ) : <div />}
      </div>

      <div className="flex items-center gap-3">
        {nextLesson ? (
          <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <Button variant="primary" onClick={onNext}>
              {t('lessonNav.nextLesson', 'Next lesson')}
              <ChevronRight size={16} />
            </Button>
          </motion.div>
        ) : allLessonsComplete ? (
          <Button variant="primary" onClick={onGoToQuiz}>
            <Trophy size={16} />
            {t('lessonNav.takeQuiz', 'Take quiz')}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
