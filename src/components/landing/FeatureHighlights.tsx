'use client';

import { Columns2, GraduationCap, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../lib/motion';

export function FeatureHighlights() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Columns2,
      title: t('landing.featureSideBySideTitle', 'Side-by-side code'),
      description: t('landing.featureSideBySideDesc', 'Every concept shown in two languages, so you learn by comparing what you already know.'),
    },
    {
      icon: GraduationCap,
      title: t('landing.featureExercisesTitle', 'Interactive exercises'),
      description: t('landing.featureExercisesDesc', 'Translation drills, output prediction, and code challenges reinforce each lesson.'),
    },
    {
      icon: BarChart3,
      title: t('landing.featureProgressTitle', 'Track progress'),
      description: t('landing.featureProgressDesc', 'Your progress syncs across devices. Pick up right where you left off.'),
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {features.map((feature) => (
        <motion.div key={feature.title} variants={staggerItem} className="text-center md:text-left">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3 mx-auto md:mx-0">
            <feature.icon size={20} className="text-accent" />
          </div>
          <h3 className="font-display text-base font-semibold text-text-primary mb-1.5">{feature.title}</h3>
          <p className="text-sm text-text-tertiary leading-relaxed">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
