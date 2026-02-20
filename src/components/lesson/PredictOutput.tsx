import { useState } from 'react';
import { CheckCircle2, XCircle, Terminal, Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { PredictOutput } from '../../types';
import { CodeBlock } from './CodeBlock';
import { Button } from '../ui/Button';
import { cn, checkPrediction } from '../../lib/utils';

interface PredictOutputExerciseProps {
  exercise: PredictOutput;
  index: number;
  isComplete: boolean;
  onComplete: (id: string) => void;
}

export function PredictOutputExercise({ exercise, index, isComplete, onComplete }: PredictOutputExerciseProps) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);
  const { t } = useTranslation();

  function handleCheck() {
    const isCorrect = checkPrediction(answer, exercise.expectedOutput);
    setCorrect(isCorrect);
    setSubmitted(true);
    setAttempts((prev) => prev + 1);

    if (isCorrect) {
      onComplete(exercise.id);
    }
  }

  function handleGiveUp() {
    setGaveUp(true);
    setSubmitted(true);
    setCorrect(false);
    onComplete(exercise.id);
  }

  function handleRetry() {
    setSubmitted(false);
    setCorrect(false);
    setAnswer('');
  }

  const done = isComplete || correct || gaveUp;

  return (
    <div
      className={cn(
        'rounded-xl border p-5 space-y-4 transition-all animate-fade-in',
        done
          ? 'bg-green-50/50 border-green-200 shadow-sm'
          : 'bg-white border-surface-700 shadow-sm'
      )}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/50 flex items-center justify-center">
          <Terminal size={14} className="text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wider font-medium">{t('predict.title', 'Predict the Output')} {index + 1}</div>
          <p className="text-sm text-gray-800 dark:text-gray-200">{t('predict.subtitle', 'What will this code print?')}</p>
        </div>
      </div>

      <CodeBlock code={exercise.code} language={exercise.language} />

      {!done && (
        <>
          <textarea
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              if (submitted) {
                setSubmitted(false);
                setCorrect(false);
              }
            }}
            placeholder={t('predict.placeholder', 'Type the expected output...')}
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-surface-700 bg-white dark:bg-surface-800 text-gray-900 dark:text-gray-100 text-sm font-mono placeholder-gray-500 outline-none focus:border-blue-500 resize-none transition-colors"
          />

          {exercise.hint && !showHint && (
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
            >
              <Lightbulb size={12} />
              {t('common.showHint', 'Show hint')}
            </button>
          )}

          {showHint && exercise.hint && (
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50 animate-fade-in">
              <p className="text-xs text-amber-800 dark:text-amber-300">
                <span className="font-semibold">{t('common.hint', 'Hint')}: </span>{exercise.hint}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleCheck} disabled={!answer.trim()}>
              {t('common.check', 'Check')}
            </Button>
            {attempts >= 1 && !correct && (
              <Button size="sm" variant="ghost" onClick={handleGiveUp}>
                {t('common.giveUp', 'Give Up')}
              </Button>
            )}
          </div>

          {submitted && !correct && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 animate-fade-in">
              <XCircle size={14} className="text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-red-700 dark:text-red-300">
                <p className="font-medium">{t('predict.notQuite', 'Not quite!')}</p>
                <button onClick={handleRetry} className="underline mt-1 hover:text-red-800 dark:hover:text-red-200">
                  {t('common.tryAgain', 'Try again')}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {done && (
        <div className="space-y-2 animate-fade-in">
          {gaveUp && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50">
              <Terminal size={14} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800 dark:text-amber-300">
                <span className="font-semibold">{t('predict.expectedOutput', 'Expected output:')} </span>
                <code className="bg-amber-100 dark:bg-amber-900/50 px-1 py-0.5 rounded">{exercise.expectedOutput}</code>
              </div>
            </div>
          )}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50">
            <CheckCircle2 size={14} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-800 dark:text-green-300 leading-relaxed">{exercise.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
