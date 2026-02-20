'use client';

import { useState } from 'react';
import { Brain, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import type { ThinkingExercise as TExercise } from '../../types';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { expandCollapse } from '../../lib/motion';

type ExerciseState = 'idle' | 'hint-revealed' | 'answer-revealed';

interface ThinkingExerciseProps {
  exercise: TExercise;
  index: number;
  isRevealed?: boolean;
  onReveal: () => void;
}

export function ThinkingExercise({ exercise, index, isRevealed, onReveal }: ThinkingExerciseProps) {
  const [state, setState] = useState<ExerciseState>(isRevealed ? 'answer-revealed' : 'idle');
  const { t } = useTranslation();

  // Update local state if the prop changes
  if (isRevealed && state !== 'answer-revealed') {
    setState('answer-revealed');
  }

  function revealHint() {
    setState('hint-revealed');
  }

  function revealAnswer() {
    setState('answer-revealed');
    onReveal();
  }

  return (
    <div className={cn(
      'rounded-xl border p-5 space-y-4 transition-all duration-300 animate-fade-in',
      state === 'answer-revealed'
        ? 'bg-module-green/5 border-module-green/20 shadow-editorial'
        : 'bg-surface-1 border-border-subtle shadow-editorial'
    )}>
      {/* Question */}
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-java/20 border border-java/30 flex items-center justify-center">
          <Brain size={14} className="text-java" />
        </div>
        <div>
          <div className="text-xs text-text-tertiary mb-1 uppercase tracking-wider font-medium">{t('thinking.exercise', 'Exercise')} {index + 1}</div>
          <p className="text-sm text-text-primary leading-relaxed">{exercise.prompt}</p>
        </div>
      </div>

      {/* Hint */}
      {state === 'idle' && (
        <div className="flex justify-start pl-10">
          <Button variant="ghost" size="sm" onClick={revealHint}>
            <Eye size={14} />
            {t('common.showHint', 'Show hint')}
          </Button>
        </div>
      )}

      <AnimatePresence>
        {(state === 'hint-revealed' || state === 'answer-revealed') && (
          <motion.div
            variants={expandCollapse}
            initial="collapsed"
            animate="expanded"
            className="ml-10"
          >
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <p className="text-xs text-text-secondary">
                <span className="font-semibold text-amber-500">{t('common.hint', 'Hint')}: </span>{exercise.hint}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer */}
      {state === 'hint-revealed' && (
        <div className="flex justify-start pl-10">
          <Button variant="ghost" size="sm" onClick={revealAnswer}>
            <EyeOff size={14} />
            {t('common.revealAnswer', 'Reveal answer')}
          </Button>
        </div>
      )}

      <AnimatePresence>
        {state === 'answer-revealed' && (
          <motion.div
            variants={expandCollapse}
            initial="collapsed"
            animate="expanded"
            className="ml-10"
          >
            <div className="p-3 rounded-lg bg-module-green/5 border border-module-green/20">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-module-green flex-shrink-0 mt-0.5" />
                <p className="text-xs text-text-secondary leading-relaxed">{exercise.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
