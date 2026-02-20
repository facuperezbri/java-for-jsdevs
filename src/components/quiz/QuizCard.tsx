import { useState } from 'react';
import { CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { QuizQuestion, Module } from '../../types';
import { Button } from '../ui/Button';
import { getModuleAccentClasses } from '../../lib/utils';
import { cn } from '../../lib/utils';

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
    <div className="animate-fade-in">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 leading-relaxed">{question.question}</h2>

      <div className="space-y-3 mb-6">
        {question.options.map((opt) => {
          let optClass = 'bg-surface-800 border-surface-700 text-gray-600 dark:text-gray-400 hover:border-surface-600 hover:text-gray-900 dark:hover:text-gray-100 hover:shadow-md hover:-translate-y-0.5';

          if (confirmed) {
            if (opt.key === question.correctKey) {
              optClass = 'bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-800/50 text-green-700 dark:text-green-400 shadow-sm';
            } else if (opt.key === selected) {
              optClass = 'bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-800/50 text-red-700 dark:text-red-400 shadow-sm';
            } else {
              optClass = 'bg-surface-800 border-surface-700 text-gray-500 dark:text-gray-500 opacity-50';
            }
          } else if (opt.key === selected) {
            optClass = `${accent.bgLight} ${accent.border} text-gray-900 dark:text-gray-100 shadow-sm transform scale-[1.01]`;
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
                opt.key === selected && !confirmed ? `${accent.border} ${accent.text}` : 'border-surface-600 text-gray-500 dark:text-gray-500'
              )}>
                {confirmed && opt.key === question.correctKey ? (
                  <CheckCircle2 size={14} className="text-green-400" />
                ) : confirmed && opt.key === selected && !isCorrect ? (
                  <XCircle size={14} className="text-red-400" />
                ) : (
                  opt.key.toUpperCase()
                )}
              </div>
              <span className="text-sm text-gray-900 dark:text-gray-100">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {confirmed && (
        <div className={cn(
          'p-4 rounded-xl border mb-6 animate-fade-in shadow-sm',
          isCorrect
            ? 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800/50'
            : 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800/50'
        )}>
          <div className="flex items-start gap-2">
            {isCorrect
              ? <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              : <XCircle size={16} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            }
            <div>
              <div className={cn('text-sm font-semibold mb-1', isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400')}>
                {isCorrect ? t('quiz.correct', 'Correct!') : t('quiz.notQuite', 'Not quite')}
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200">{question.explanation}</p>
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
    </div>
  );
}
