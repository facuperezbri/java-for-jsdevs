import { Link } from 'react-router-dom';
import { Lock, CheckCircle2, ChevronRight, Trophy } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Module } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { isModuleUnlocked, getModuleProgress, getBestQuizScore, getModuleAccentClasses } from '../../lib/utils';
import { useCurriculum } from '../../data/curriculum';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

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
    <div 
      onClick={!unlocked ? handleLockedClick : undefined}
      className={cn(
        'relative rounded-xl border p-6 transition-all duration-200',
        unlocked
          ? `bg-surface-900 border-surface-700 hover:border-surface-600 hover:shadow-md cursor-pointer`
          : 'bg-surface-950 border-surface-700 cursor-not-allowed opacity-60',
        lockedShake && 'animate-[shake_0.5s_ease-in-out]'
      )}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-2xl', accent.bgLight)}>
            {module.icon}
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 font-medium uppercase tracking-wider mb-0.5">
              {t('moduleCard.module', 'Module')} {module.order}
            </div>
            <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-base leading-tight">{module.title}</h3>
          </div>
        </div>

        <div className="flex-shrink-0">
          {!unlocked ? (
            <div className="w-8 h-8 rounded-full bg-surface-700 flex items-center justify-center">
              <Lock size={14} className="text-gray-600 dark:text-gray-400" />
            </div>
          ) : isFullyComplete ? (
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle2 size={16} className="text-green-400" />
            </div>
          ) : (
            <ChevronRight size={18} className="text-gray-600 dark:text-gray-400 mt-0.5" />
          )}
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{module.subtitle}</p>

      {/* Progress section */}
      {unlocked && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">{completed}/{total} {t('moduleCard.lessons', 'lessons')}</span>
            {bestScore !== null && (
              <div className="flex items-center gap-1">
                <Trophy size={11} className="text-amber-500 dark:text-amber-400" />
                <span className="text-xs text-amber-500 dark:text-amber-400 font-medium">{t('moduleCard.quiz', 'Quiz')}: {bestScore}%</span>
              </div>
            )}
          </div>
          <ProgressBar value={percent} color={module.accentColor} size="sm" />
        </div>
      )}

      {!unlocked && (
        <div className={cn("flex items-center gap-2 mt-2 transition-colors", lockedShake && "text-red-500 dark:text-red-400")}>
          <Lock size={12} className={cn(lockedShake ? "text-red-500 dark:text-red-400" : "text-gray-600 dark:text-gray-400")} />
          <span className={cn("text-xs", lockedShake ? "text-red-500 dark:text-red-400 font-medium" : "text-gray-700 dark:text-gray-400")}>
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
    </div>
  );

  if (!unlocked) return cardContent;

  return (
    <Link to={`/module/${module.id}`}>
      {cardContent}
    </Link>
  );
}
