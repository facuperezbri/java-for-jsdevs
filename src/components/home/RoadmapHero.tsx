'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useProgress } from '../../context/ProgressContext';
import { useCurriculum } from '../../data/curriculum';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { staggerContainer, staggerItem } from '../../lib/motion';

export function RoadmapHero() {
  const { progress } = useProgress();
  const router = useRouter();
  const { t } = useTranslation();
  const { CURRICULUM } = useCurriculum();

  const totalLessons = CURRICULUM.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = CURRICULUM.reduce(
    (s, m) => s + (progress.modules[m.id]?.completedLessonIds.length ?? 0),
    0
  );
  const overallPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  function handleContinue() {
    if (progress.lastVisitedPath && progress.lastVisitedPath !== '/') {
      router.push(progress.lastVisitedPath);
      return;
    }
    // Find first incomplete lesson
    for (const mod of CURRICULUM) {
      for (const lesson of mod.lessons) {
        const done = progress.modules[mod.id]?.completedLessonIds.includes(lesson.id);
        if (!done) {
          router.push(`/module/${mod.id}/lesson/${lesson.id}`);
          return;
        }
      }
    }
    // All done!
    router.push(`/module/${CURRICULUM[0].id}/lesson/${CURRICULUM[0].lessons[0].id}`);
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="bg-gradient-to-br from-surface-1 to-surface-2 rounded-2xl border border-border-subtle shadow-editorial p-8 mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <motion.div variants={staggerItem} className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={20} className="text-java" />
            <span className="text-sm font-medium text-text-tertiary uppercase tracking-wider">{t('roadmap.learningPath', 'Learning Path')}</span>
          </div>
          <h1 className="font-display text-display-lg text-text-primary mb-2">
            {t('roadmap.title', 'Java for JavaScript Developers')}
          </h1>
          {/* Decorative rule */}
          <div className="h-0.5 w-16 bg-gradient-to-r from-java to-java/30 rounded-full mb-4" />
          <p className="text-text-secondary mb-5 max-w-lg">
            {t('roadmap.description', 'Master Java by comparing it to what you already know. Every concept is shown side-by-side with its JavaScript equivalent.')}
          </p>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">
                {completedLessons === 0
                  ? t('roadmap.startJourney', 'Start your journey')
                  : t('roadmap.lessonsComplete', '{{completed}} of {{total}} lessons complete', { completed: completedLessons, total: totalLessons })}
              </span>
              <span className="text-sm text-text-primary font-semibold">{Math.round(overallPercent)}%</span>
            </div>
            <ProgressBar value={overallPercent} color="default" />
          </div>
        </motion.div>

        <motion.div variants={staggerItem} className="flex-shrink-0">
          <Button size="lg" onClick={handleContinue}>
            <Zap size={18} />
            {completedLessons === 0 ? t('roadmap.startLearning', 'Start learning') : t('roadmap.continue', 'Continue')}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
