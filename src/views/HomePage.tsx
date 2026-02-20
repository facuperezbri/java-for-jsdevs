'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { useCurriculum } from '../data/curriculum';
import { ModuleCard } from '../components/home/ModuleCard';
import { RoadmapHero } from '../components/home/RoadmapHero';
import { staggerContainer, staggerItem } from '../lib/motion';

export function HomePage() {
  const { setLastVisited } = useProgress();
  const { t } = useTranslation();
  const { CURRICULUM } = useCurriculum();

  useEffect(() => {
    setLastVisited('/');
  }, [setLastVisited]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <RoadmapHero />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={staggerItem} className="font-display text-display-sm text-text-primary mb-4">
          {t('home.courseModules', 'Course Modules')}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURRICULUM.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={staggerItem}
        initial="hidden"
        animate="visible"
        className="mt-12 text-center"
      >
        <p className="text-sm text-text-tertiary">
          {t('home.stats', '4 modules · 22 lessons · 4 quizzes · Built for React/JS developers')}
        </p>
      </motion.div>
    </div>
  );
}
