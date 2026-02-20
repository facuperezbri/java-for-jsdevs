'use client';

import Link from 'next/link';
import { Lock, CheckCircle2, ChevronRight, Trophy } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { Module } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { isModuleUnlocked, getModuleProgress, getBestQuizScore, getModuleAccentClasses } from '../../lib/utils';
import { useCurriculum } from '../../data/curriculum';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import { staggerItem } from '../../lib/motion';

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const { progress } = useProgress();
  const { t } = useTranslation();
  const { CURRICULUM } = useCurriculum();
  const unlocked = isModuleUnlocked(module.order, CURRICULUM, progress);
  const { completed, total, percent } = getModuleProgress(module, progress);
  const bestScore = getBestQuizScore(module.id, progress);
  const accent = getModuleAccentClasses(module.accentColor);

  const [lockedShake, setLockedShake] = useState(false);

  const isFullyComplete = completed === total && total > 0 && bestScore !== null && bestScore >= 60;

  const handleLockedClick = () => {
    if (!unlocked) {
      setLockedShake(true);
      setTimeout(() => setLockedShake(false), 500);
    }
  };

  const cardContent = (
    <motion.div
      variants={staggerItem}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={unlocked ? { y: -2 } : undefined}
      animate={lockedShake ? { x: [0, -4, 4, -4, 4, 0] } : {}}
      transition={lockedShake ? { duration: 0.4 } : { duration: 0.2 }}
      onClick={!unlocked ? handleLockedClick : undefined}
      className={cn(
        'relative rounded-xl border p-6 transition-all duration-200 overflow-hidden',
        unlocked
          ? 'bg-surface-1 border-border-subtle hover:shadow-editorial cursor-pointer'
          : 'bg-surface-2 border-border-subtle cursor-not-allowed opacity-60',
        unlocked && !isFullyComplete && 'grayscale-0',
      )}
    >
      {/* Gradient accent strip at top */}
      {unlocked && (
        <div className={cn('absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r', accent.gradient)} />
      )}

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl', accent.bgLight)}>
            {module.icon}
          </div>
          <div>
            <div className="text-xs text-text-tertiary font-medium uppercase tracking-wider mb-0.5">
              {t('moduleCard.module', 'Module')} {module.order}
            </div>
            <h3 className="text-text-primary font-semibold text-base leading-tight">{module.title}</h3>
          </div>
        </div>

        <div className="flex-shrink-0">
          {!unlocked ? (
            <div className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center">
              <Lock size={14} className="text-text-muted" />
            </div>
          ) : isFullyComplete ? (
            <div className="w-8 h-8 rounded-full bg-module-green/20 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-module-green" />
            </div>
          ) : (
            <ChevronRight size={18} className="text-text-muted mt-0.5" />
          )}
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-text-secondary mb-4 leading-relaxed">{module.subtitle}</p>

      {/* Progress section */}
      {unlocked && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-text-tertiary">{completed}/{total} {t('moduleCard.lessons', 'lessons')}</span>
            {bestScore !== null && (
              <div className="flex items-center gap-1">
                <Trophy size={11} className="text-amber-500" />
                <span className="text-xs text-amber-500 font-medium">{t('moduleCard.quiz', 'Quiz')}: {bestScore}%</span>
              </div>
            )}
          </div>
          <ProgressBar value={percent} color={module.accentColor} size="sm" />
        </div>
      )}

      {!unlocked && (
        <div className={cn("flex items-center gap-2 mt-2 transition-colors", lockedShake && "text-module-red")}>
          <Lock size={12} className={cn(lockedShake ? "text-module-red" : "text-text-muted")} />
          <span className={cn("text-xs", lockedShake ? "text-module-red font-medium" : "text-text-secondary")}>
            {t('moduleCard.passToUnlock', 'Pass Module {{prevOrder}} quiz (≥60%) to unlock', { prevOrder: module.order - 1 })}
          </span>
        </div>
      )}

      {/* Lesson count badge */}
      <div className="absolute top-4 right-4">
        {unlocked && !isFullyComplete && (
          <Badge variant={module.accentColor} size="sm">{total} {t('moduleCard.lessons', 'lessons')}</Badge>
        )}
      </div>
    </motion.div>
  );

  if (!unlocked) return cardContent;

  return (
    <Link href={`/module/${module.id}`}>
      {cardContent}
    </Link>
  );
}
