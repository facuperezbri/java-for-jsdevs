'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import type { CodeChallenge as CodeChallengeType } from '../../types';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface CodeChallengeProps {
  challenge: CodeChallengeType;
  isComplete: boolean;
  onComplete: (id: string) => void;
}

export function CodeChallenge({ challenge, isComplete, onComplete }: CodeChallengeProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(isComplete);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [shaking, setShaking] = useState(false);
  const { t } = useTranslation();

  function handleChange(blankId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [blankId]: value }));
    if (submitted) {
      setSubmitted(false);
      setResults({});
    }
  }

  function handleCheck() {
    const newResults: Record<string, boolean> = {};
    let allCorrect = true;

    for (const blank of challenge.blanks) {
      const userAnswer = (answers[blank.id] ?? '').trim();
      const correct = blank.expected.some(
        (exp) => exp.trim().toLowerCase() === userAnswer.toLowerCase()
      );
      newResults[blank.id] = correct;
      if (!correct) allCorrect = false;
    }

    setResults(newResults);
    setSubmitted(true);

    if (allCorrect) {
      onComplete(challenge.id);
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  }

  const allCorrect = submitted && challenge.blanks.every((b) => results[b.id]);

  // Parse code and replace placeholders with inputs
  function renderCode() {
    const parts = challenge.code.split(/(___BLANK_\d+___)/g);
    return parts.map((part, i) => {
      const match = part.match(/___BLANK_(\d+)___/);
      if (match) {
        const blankIndex = parseInt(match[1], 10) - 1;
        const blank = challenge.blanks[blankIndex];
        if (!blank) return <span key={i}>{part}</span>;

        const isCorrect = submitted && results[blank.id] === true;
        const isWrong = submitted && results[blank.id] === false;
        const maxLen = Math.max(...blank.expected.map((e) => e.length), 6);

        return (
          <input
            key={i}
            type="text"
            value={isComplete ? blank.expected[0] : (answers[blank.id] ?? '')}
            onChange={(e) => handleChange(blank.id, e.target.value)}
            disabled={isComplete || allCorrect}
            placeholder={blank.hint ?? '...'}
            style={{ width: `${maxLen + 2}ch` }}
            className={cn(
              'inline-block mx-2 my-1 px-2 py-0.5 rounded text-sm font-mono border text-white placeholder-text-muted outline-none transition-all',
              isCorrect && 'border-module-green bg-module-green/10',
              isWrong && 'border-module-red bg-module-red/10',
              !submitted && 'border-border bg-surface-3 focus:border-module-blue',
              isWrong && shaking && 'animate-[shake_0.3s_ease-in-out]'
            )}
          />
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <div
      className={cn(
        'mt-4 rounded-xl border p-4 space-y-3 transition-all',
        allCorrect || isComplete
          ? 'bg-module-green/5 border-module-green/20'
          : 'bg-surface-1 border-border-subtle'
      )}
    >
      <div className="flex items-center gap-2">
        <Code2 size={14} className="text-module-blue" />
        <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">
          {challenge.type === 'fill-blank' ? t('challenge.fillBlanks', 'Fill in the Blanks') : t('challenge.fixBug', 'Fix the Bug')}
        </span>
        {(allCorrect || isComplete) && <CheckCircle2 size={14} className="text-module-green" />}
      </div>

      <p className="text-sm text-text-primary">{challenge.prompt}</p>

      <div className="rounded-lg overflow-hidden border border-border-subtle">
        <pre
          className="p-4 text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap"
          style={{
            background: 'var(--color-code-bg)',
            fontFamily: "var(--font-jetbrains), 'Fira Code', monospace",
            color: '#d4d4d4',
          }}
        >
          {renderCode()}
        </pre>
      </div>

      {!isComplete && !allCorrect && (
        <div className="flex justify-end">
          <Button
            size="sm"
            onClick={handleCheck}
            disabled={challenge.blanks.some((b) => !(answers[b.id] ?? '').trim())}
          >
            {t('common.check', 'Check')}
          </Button>
        </div>
      )}

      {submitted && !allCorrect && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-module-red/5 border border-module-red/20">
          <XCircle size={14} className="text-module-red flex-shrink-0 mt-0.5" />
          <p className="text-xs text-text-secondary">{t('challenge.notQuite', 'Not quite right. Check the highlighted blanks and try again.')}</p>
        </div>
      )}

      <AnimatePresence>
        {(allCorrect || isComplete) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="flex items-start gap-2 p-3 rounded-lg bg-module-green/5 border border-module-green/20">
              <CheckCircle2 size={14} className="text-module-green flex-shrink-0 mt-0.5" />
              <p className="text-xs text-text-secondary leading-relaxed">{challenge.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
