'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { usePaths } from '../data/curriculum';
import { PathCard } from '../components/home/PathCard';
import { LandingNav } from '../components/landing/LandingNav';
import { FeatureHighlights } from '../components/landing/FeatureHighlights';
import { staggerContainer, staggerItem } from '../lib/motion';

export function PathSelectionPage() {
  const { t } = useTranslation();
  const paths = usePaths();

  return (
    <>
      <LandingNav />

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-14"
        >
          <motion.h1
            variants={staggerItem}
            className="font-display text-display-xl text-text-primary mb-4"
          >
            {t('landing.heroTitle', 'Learn by comparison.')}
          </motion.h1>
          <motion.p
            variants={staggerItem}
            className="text-lg text-text-secondary max-w-lg mx-auto"
          >
            {t('landing.heroSubtitle', 'Choose a learning path. Every concept is shown side-by-side with what you already know.')}
          </motion.p>
        </motion.div>

        {/* Path cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
        >
          {paths.map((path) => (
            <PathCard key={path.id} path={path} />
          ))}
        </motion.div>

        {/* Feature highlights */}
        <div className="mb-20">
          <FeatureHighlights />
        </div>

        {/* Footer */}
        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <p className="text-xs text-text-muted">
            {t('pathSelection.footer', 'Interactive lessons · Bilingual (EN/ES) · Free and open source')}
          </p>
        </motion.div>
      </div>
    </>
  );
}
