import { useState } from 'react';
import { Brain, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ThinkingExercise as TExercise } from '../../types';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

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

  // Update local state if the prop changes (e.g. when navigating to a different lesson)
  // or if the context loads it as already revealed.
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
        ? 'bg-green-50/50 dark:bg-green-900/30 border-green-200 dark:border-green-800/50 shadow-sm'
        : 'bg-white dark:bg-surface-900 border-surface-700 shadow-sm'
    )}>
      {/* Question */}
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-java/20 border border-java/30 flex items-center justify-center">
          <Brain size={14} className="text-java" />
        </div>
        <div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wider font-medium">{t('thinking.exercise', 'Exercise')} {index + 1}</div>
          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{exercise.prompt}</p>
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

      {(state === 'hint-revealed' || state === 'answer-revealed') && (
        <div className="ml-10 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50 animate-fade-in">
          <p className="text-xs text-amber-800 dark:text-amber-300">
            <span className="font-semibold">{t('common.hint', 'Hint')}: </span>{exercise.hint}
          </p>
        </div>
      )}

      {/* Answer */}
      {state === 'hint-revealed' && (
        <div className="flex justify-start pl-10">
          <Button variant="ghost" size="sm" onClick={revealAnswer}>
            <EyeOff size={14} />
            {t('common.revealAnswer', 'Reveal answer')}
          </Button>
        </div>
      )}

      {state === 'answer-revealed' && (
        <div className="ml-10 p-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 animate-fade-in">
          <div className="flex items-start gap-2">
            <CheckCircle2 size={14} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-800 dark:text-green-300 leading-relaxed">{exercise.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
