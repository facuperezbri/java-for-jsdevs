import { useState } from 'react';
import { CheckCircle2, XCircle, Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
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
              'inline-block mx-2 my-1 px-2 py-0.5 rounded text-sm font-mono bg-gray-700 dark:bg-gray-800 border text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-all',
              isCorrect && 'border-green-500 dark:border-green-600 bg-green-900/30 dark:bg-green-900/40',
              isWrong && 'border-red-500 dark:border-red-600 bg-red-900/30 dark:bg-red-900/40',
              !submitted && 'border-gray-600 dark:border-gray-500 focus:border-blue-500 dark:focus:border-blue-400',
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
          ? 'bg-green-50/50 dark:bg-green-900/30 border-green-200 dark:border-green-800/50'
          : 'bg-white dark:bg-surface-900 border-surface-700'
      )}
    >
      <div className="flex items-center gap-2">
        <Code2 size={14} className="text-blue-600 dark:text-blue-400" />
        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
          {challenge.type === 'fill-blank' ? t('challenge.fillBlanks', 'Fill in the Blanks') : t('challenge.fixBug', 'Fix the Bug')}
        </span>
        {(allCorrect || isComplete) && <CheckCircle2 size={14} className="text-green-500 dark:text-green-400" />}
      </div>

      <p className="text-sm text-gray-800 dark:text-gray-200">{challenge.prompt}</p>

      <div className="rounded-lg overflow-hidden border border-surface-700">
        <pre
          className="p-4 text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap"
          style={{
            background: '#111118',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
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
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50">
          <XCircle size={14} className="text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700 dark:text-red-300">{t('challenge.notQuite', 'Not quite right. Check the highlighted blanks and try again.')}</p>
        </div>
      )}

      {(allCorrect || isComplete) && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 animate-fade-in">
          <CheckCircle2 size={14} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-green-800 dark:text-green-300 leading-relaxed">{challenge.explanation}</p>
        </div>
      )}
    </div>
  );
}
