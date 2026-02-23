'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useProgress } from '../../context/ProgressContext';
import { usePathCurriculum } from '../../data/curriculum';
import { getPathProgress } from '../../lib/utils';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { staggerContainer, staggerItem } from '../../lib/motion';

interface RoadmapHeroProps {
  pathId: string;
}

export function RoadmapHero({ pathId }: RoadmapHeroProps) {
  const { progress } = useProgress();
  const router = useRouter();
  const { t } = useTranslation();
  const { CURRICULUM, path } = usePathCurriculum(pathId);

  const pp = getPathProgress(progress, pathId);
  const totalLessons = CURRICULUM.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = CURRICULUM.reduce(
    (s, m) => s + (pp.modules[m.id]?.completedLessonIds.length ?? 0),
    0
  );
  const overallPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  function handleContinue() {
    // Find first incomplete lesson
    for (const mod of CURRICULUM) {
      for (const lesson of mod.lessons) {
        const done = pp.modules[mod.id]?.completedLessonIds.includes(lesson.id);
        if (!done) {
          router.push(`/path/${pathId}/module/${mod.id}/lesson/${lesson.id}`);
          return;
        }
      }
    }
    // All done — go to first lesson
    if (CURRICULUM.length > 0 && CURRICULUM[0].lessons.length > 0) {
      router.push(`/path/${pathId}/module/${CURRICULUM[0].id}/lesson/${CURRICULUM[0].lessons[0].id}`);
    }
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="bg-surface-1 rounded-2xl border border-border-subtle p-8 mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <motion.div variants={staggerItem} className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={20} className="text-accent" />
            <span className="text-sm font-medium text-text-tertiary uppercase tracking-wider">{t('roadmap.learningPath', 'Learning Path')}</span>
          </div>
          <h1 className="font-display text-display-lg text-text-primary mb-4">
            {path?.title ?? t('roadmap.title', 'Learning Path')}
          </h1>
          <p className="text-text-secondary mb-5 max-w-lg">
            {path?.description ?? t('roadmap.description', 'Master new skills through interactive lessons and comparisons.')}
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
