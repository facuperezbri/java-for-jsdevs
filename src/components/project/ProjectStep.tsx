import { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ProjectStep as ProjectStepType } from '../../types';
import { CodeEditor } from './CodeEditor';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface ProjectStepProps {
  step: ProjectStepType;
  stepNumber: number;
  isComplete: boolean;
  onComplete: (stepId: string) => void;
}

export function ProjectStep({ step, stepNumber, isComplete, onComplete }: ProjectStepProps) {
  const [code, setCode] = useState(step.starterCode);
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const { t } = useTranslation();

  function handleCheck() {
    const normalized = code.replace(/\s+/g, ' ').trim();
    const regex = new RegExp(step.validationPattern, 's');
    const isValid = regex.test(normalized);

    setSubmitted(true);
    setValid(isValid);

    if (isValid) {
      onComplete(step.id);
    } else {
      setFailCount((prev) => prev + 1);
    }
  }

  function handleRevealHint() {
    setRevealedHints((prev) => Math.min(prev + 1, step.hints.length));
  }

  function handleShowSolution() {
    setShowSolution(true);
    onComplete(step.id);
  }

  function handleRetry() {
    setSubmitted(false);
    setValid(false);
  }

  const done = isComplete || valid || showSolution;

  return (
    <div
      className={cn(
        'rounded-xl border p-6 space-y-4 transition-all',
        done
          ? 'bg-green-50/50 border-green-200'
          : 'bg-white border-surface-700'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
            done
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          )}
        >
          {done ? <CheckCircle2 size={16} /> : stepNumber}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
      </div>

      <div className="prose prose-sm max-w-none">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line">{step.instructions}</p>
      </div>

      <CodeEditor
        value={done ? code : code}
        onChange={setCode}
        disabled={done}
      />

      {/* Hints */}
      {!done && step.hints.length > 0 && (
        <div className="space-y-2">
          {step.hints.slice(0, revealedHints).map((hint, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800/50 animate-fade-in">
              <Lightbulb size={14} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-300">{hint}</p>
            </div>
          ))}
          {revealedHints < step.hints.length && (
            <button
              onClick={handleRevealHint}
              className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
            >
              <Eye size={12} />
              {t('project.revealHint', 'Reveal hint')} ({revealedHints + 1}/{step.hints.length})
            </button>
          )}
        </div>
      )}

      {/* Actions */}
      {!done && (
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleCheck}>
            {t('project.checkSolution', 'Check Solution')}
          </Button>
          {failCount >= 2 && (
            <Button size="sm" variant="ghost" onClick={handleShowSolution}>
              {t('project.showSolution', 'Show Solution')}
            </Button>
          )}
        </div>
      )}

      {/* Feedback */}
      {submitted && !valid && !done && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 animate-fade-in">
          <XCircle size={14} className="text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-red-700 dark:text-red-300">
            <p>{t('project.incorrect', "Your solution doesn't match the expected pattern yet.")}</p>
            <button onClick={handleRetry} className="underline mt-1 hover:text-red-800 dark:hover:text-red-200">
              {t('common.tryAgain', 'Try again')}
            </button>
          </div>
        </div>
      )}

      {done && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 animate-fade-in">
          <CheckCircle2 size={14} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-green-800 dark:text-green-300 leading-relaxed">{step.explanation}</p>
        </div>
      )}
    </div>
  );
}
