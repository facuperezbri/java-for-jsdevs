'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import type { LearningPath } from '../../types';
import { useProgress } from '../../context/ProgressContext';
import { getPathProgress } from '../../lib/utils';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import { staggerItem } from '../../lib/motion';

interface PathCardProps {
  path: LearningPath;
}

export function PathCard({ path }: PathCardProps) {
  const { progress } = useProgress();
  const pp = getPathProgress(progress, path.id);

  // Compute progress across all modules in this path
  const totalLessons = path.lessonCount;
  const completedLessons = Object.values(pp.modules).reduce(
    (sum, m) => sum + (m?.completedLessonIds?.length ?? 0),
    0
  );
  const percent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  const hasStarted = completedLessons > 0;

  const accentBorder = path.accentColor === 'red' ? 'border-l-java' : 'border-l-react';

  return (
    <Link href={`/path/${path.id}`}>
      <motion.div
        variants={staggerItem}
        className={cn(
          'relative rounded-2xl border border-border-subtle bg-surface-1 p-8 border-l-4 hover:border-border hover:shadow-soft transition-all duration-200 cursor-pointer group',
          accentBorder
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={cn(
              'w-14 h-14 rounded-xl flex items-center justify-center text-3xl',
              path.accentColor === 'red' ? 'bg-java/10' : 'bg-module-cyan/10'
            )}>
              {path.icon}
            </div>
            <div>
              <h3 className="font-display text-display-sm text-text-primary mb-0.5">{path.title}</h3>
              <p className="text-sm text-text-secondary">{path.subtitle}</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-text-muted group-hover:text-text-secondary mt-2 flex-shrink-0 transition-colors" />
        </div>

        {/* Description */}
        <p className="text-sm text-text-tertiary mb-4 leading-relaxed">{path.description}</p>

        {/* Meta badges */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Badge variant="gray" size="sm">{path.audienceTag}</Badge>
          <Badge variant="gray" size="sm">{path.moduleCount} modules</Badge>
          <Badge variant="gray" size="sm">{path.lessonCount} lessons</Badge>
        </div>

        {/* Progress */}
        {hasStarted ? (
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-text-tertiary">{completedLessons}/{totalLessons} lessons</span>
              <span className="text-xs text-text-secondary font-medium">{Math.round(percent)}%</span>
            </div>
            <ProgressBar value={percent} color={path.accentColor === 'red' ? 'red' : 'cyan'} size="sm" />
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-accent/10 text-accent">
            Start learning →
          </div>
        )}
      </motion.div>
    </Link>
  );
}
