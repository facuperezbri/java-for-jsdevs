'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { QuizQuestion, Module } from '../../types';
import { Button } from '../ui/Button';
import { getModuleAccentClasses } from '../../lib/utils';
import { cn } from '../../lib/utils';
import { slideTransition } from '../../lib/motion';

interface QuizCardProps {
  question: QuizQuestion;
  module: Module;
  onAnswer: (key: string) => void;
}

export function QuizCard({ question, module, onAnswer }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const accent = getModuleAccentClasses(module.accentColor);
  const { t } = useTranslation();

  function handleSelect(key: string) {
    if (confirmed) return;
    setSelected(key);
  }

  function handleConfirm() {
    if (!selected || confirmed) return;
    setConfirmed(true);
  }

  function handleNext() {
    if (!selected) return;
    onAnswer(selected);
    setSelected(null);
    setConfirmed(false);
  }

  const isCorrect = selected === question.correctKey;

  return (
    <motion.div
      variants={slideTransition}
      initial="enter"
      animate="center"
      exit="exit"
    >
      <h2 className="font-display text-lg font-semibold text-text-primary mb-6 leading-relaxed">{question.question}</h2>

      <div className="space-y-3 mb-6">
        {question.options.map((opt) => {
          let optClass = 'bg-surface-1 border-border-subtle text-text-secondary hover:border-border hover:text-text-primary hover:shadow-editorial hover:-translate-y-0.5';

          if (confirmed) {
            if (opt.key === question.correctKey) {
              optClass = 'bg-module-green/5 border-module-green/30 text-module-green shadow-editorial';
            } else if (opt.key === selected) {
              optClass = 'bg-module-red/5 border-module-red/30 text-module-red shadow-editorial';
            } else {
              optClass = 'bg-surface-1 border-border-subtle text-text-muted opacity-50';
            }
          } else if (opt.key === selected) {
            optClass = `${accent.bgLight} ${accent.border} text-text-primary shadow-editorial transform scale-[1.01]`;
          }

          return (
            <button
              key={opt.key}
              onClick={() => handleSelect(opt.key)}
              disabled={confirmed}
              className={cn(
                'w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 ease-out flex items-center gap-3',
                optClass,
                !confirmed && 'cursor-pointer'
              )}
            >
              <div className={cn(
                'w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 text-xs font-bold',
                opt.key === selected && !confirmed ? `${accent.border} ${accent.text}` : 'border-border text-text-muted'
              )}>
                {confirmed && opt.key === question.correctKey ? (
                  <CheckCircle2 size={14} className="text-module-green" />
                ) : confirmed && opt.key === selected && !isCorrect ? (
                  <XCircle size={14} className="text-module-red" />
                ) : (
                  opt.key.toUpperCase()
                )}
              </div>
              <span className="text-sm text-text-primary">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {confirmed && (
        <div className={cn(
          'p-4 rounded-xl border mb-6 animate-fade-in shadow-editorial',
          isCorrect
            ? 'bg-module-green/5 border-module-green/20'
            : 'bg-module-red/5 border-module-red/20'
        )}>
          <div className="flex items-start gap-2">
            {isCorrect
              ? <CheckCircle2 size={16} className="text-module-green flex-shrink-0 mt-0.5" />
              : <XCircle size={16} className="text-module-red flex-shrink-0 mt-0.5" />
            }
            <div>
              <div className={cn('text-sm font-semibold mb-1', isCorrect ? 'text-module-green' : 'text-module-red')}>
                {isCorrect ? t('quiz.correct', 'Correct!') : t('quiz.notQuite', 'Not quite')}
              </div>
              <p className="text-sm text-text-secondary">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end">
        {!confirmed ? (
          <Button onClick={handleConfirm} disabled={!selected}>
            {t('quiz.checkAnswer', 'Check answer')}
          </Button>
        ) : (
          <Button onClick={handleNext}>
            {t('quiz.nextQuestion', 'Next question')}
            <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
