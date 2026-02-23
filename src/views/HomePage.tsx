'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useProgress } from '../context/ProgressContext';
import { usePathCurriculum } from '../data/curriculum';
import { ModuleCard } from '../components/home/ModuleCard';
import { RoadmapHero } from '../components/home/RoadmapHero';
import { staggerContainer, staggerItem } from '../lib/motion';

interface HomePageProps {
  pathId: string;
}

export function HomePage({ pathId }: HomePageProps) {
  const { setLastVisited } = useProgress();
  const { t } = useTranslation();
  const { CURRICULUM, path } = usePathCurriculum(pathId);

  useEffect(() => {
    setLastVisited(`/path/${pathId}`, pathId);
  }, [setLastVisited, pathId]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <RoadmapHero pathId={pathId} />

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
            <ModuleCard key={module.id} module={module} pathId={pathId} />
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
          {path
            ? `${path.moduleCount} ${t('home.modules', 'modules')} · ${path.lessonCount} ${t('home.lessons', 'lessons')}`
            : ''}
        </p>
      </motion.div>
    </div>
  );
}
