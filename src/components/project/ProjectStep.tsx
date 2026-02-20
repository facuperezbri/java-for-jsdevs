'use client';

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
        'rounded-xl border p-6 space-y-4 transition-all shadow-editorial',
        done
          ? 'bg-module-green/5 border-module-green/20'
          : 'bg-surface-1 border-border-subtle'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
            done
              ? 'bg-module-green/10 text-module-green'
              : 'bg-module-blue/10 text-module-blue'
          )}
        >
          {done ? <CheckCircle2 size={16} /> : stepNumber}
        </div>
        <h3 className="font-display text-lg font-semibold text-text-primary">{step.title}</h3>
      </div>

      <div className="prose prose-sm max-w-none">
        <p className="text-text-secondary leading-relaxed whitespace-pre-line">{step.instructions}</p>
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
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border-l-[3px] border-l-amber-500 bg-amber-500/5 animate-fade-in">
              <Lightbulb size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary">{hint}</p>
            </div>
          ))}
          {revealedHints < step.hints.length && (
            <button
              onClick={handleRevealHint}
              className="flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 transition-colors"
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
        <div className="flex items-start gap-2 p-3 rounded-lg bg-module-red/5 border border-module-red/20 animate-fade-in">
          <XCircle size={14} className="text-module-red flex-shrink-0 mt-0.5" />
          <div className="text-xs text-text-secondary">
            <p>{t('project.incorrect', "Your solution doesn't match the expected pattern yet.")}</p>
            <button onClick={handleRetry} className="underline mt-1 hover:text-text-primary">
              {t('common.tryAgain', 'Try again')}
            </button>
          </div>
        </div>
      )}

      {done && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-module-green/5 border border-module-green/20 animate-fade-in">
          <CheckCircle2 size={14} className="text-module-green flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-secondary leading-relaxed">{step.explanation}</p>
        </div>
      )}
    </div>
  );
}
