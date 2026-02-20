'use client';

import Link from 'next/link';
import { Trophy, CheckCircle2, XCircle, RotateCcw, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import type { Module, QuizQuestion } from '../../types';
import { Button } from '../ui/Button';
import { useCurriculum } from '../../data/curriculum';
import { cn } from '../../lib/utils';
import { springScale, staggerContainer, staggerItem } from '../../lib/motion';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  answers: Record<string, string>;
  questions: QuizQuestion[];
  module: Module;
  onRetry: () => void;
}

export function QuizResults({ score, totalQuestions, answers, questions, module, onRetry }: QuizResultsProps) {
  const { CURRICULUM } = useCurriculum();
  const { t } = useTranslation();
  const passed = score >= 60;
  const perfect = score === 100;
  const correct = Math.round((score / 100) * totalQuestions);

  const nextModule = CURRICULUM.find((m) => m.order === module.order + 1);

  const [windowDimensions, setWindowDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {passed && <Confetti width={windowDimensions.width} height={windowDimensions.height} recycle={false} numberOfPieces={500} />}

      {/* Score display */}
      <motion.div
        variants={springScale}
        className={cn(
          'rounded-2xl border p-8 text-center mb-8 relative overflow-hidden',
          passed ? 'bg-module-green/5 border-module-green/20 shadow-editorial' : 'bg-surface-1 border-border-subtle shadow-editorial',
          perfect && 'border-amber-400 shadow-glow-yellow'
        )}
      >
        {perfect && (
          <div className="absolute top-0 right-0 p-4">
             <div className="flex items-center gap-1 bg-amber-400/20 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
               <Star size={14} className="fill-amber-500 text-amber-500" />
               {t('quizResults.perfect', 'Perfect')}
             </div>
          </div>
        )}

        <div className={cn(
          'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10',
          passed ? 'bg-module-green/20' : 'bg-surface-3'
        )}>
          <Trophy size={36} className={passed ? 'text-amber-400' : 'text-text-muted'} />
        </div>

        <div className={cn('font-display text-6xl font-bold mb-2 relative z-10', passed ? 'text-module-green' : 'text-text-primary')}>
          {score}%
        </div>
        <div className="text-text-secondary mb-4 relative z-10">
          {correct} {t('quizResults.of', 'of')} {totalQuestions} {t('quizResults.correct', 'correct')}
        </div>

        {passed ? (
          <div className="flex items-center justify-center gap-2 text-module-green relative z-10">
            <CheckCircle2 size={18} />
            <span className="font-semibold">
              {nextModule ? `${nextModule.title} ${t('quizResults.unlocked', 'unlocked!')}` : t('quizResults.courseComplete', 'Course complete!')}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-amber-500 relative z-10">
            <span className="text-sm font-medium">{t('quizResults.needScore', 'Need ≥60% to pass — you got {{score}}%. Try again!', { score })}</span>
          </div>
        )}
      </motion.div>

      {/* Question review */}
      <motion.div variants={staggerContainer} className="space-y-3 mb-8">
        <motion.h3 variants={staggerItem} className="font-display text-sm font-semibold text-text-tertiary uppercase tracking-wider">
          {t('quizResults.review', 'Review')}
        </motion.h3>
        {questions.map((q) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correctKey;
          const userOption = q.options.find((o) => o.key === userAnswer);
          const correctOption = q.options.find((o) => o.key === q.correctKey);

          return (
            <motion.div key={q.id} variants={staggerItem} className={cn(
              'p-4 rounded-xl border shadow-editorial',
              isCorrect ? 'bg-module-green/5 border-module-green/20' : 'bg-module-red/5 border-module-red/20'
            )}>
              <div className="flex items-start gap-3">
                {isCorrect
                  ? <CheckCircle2 size={16} className="text-module-green flex-shrink-0 mt-0.5" />
                  : <XCircle size={16} className="text-module-red flex-shrink-0 mt-0.5" />
                }
                <div className="flex-1">
                  <p className="text-sm text-text-primary mb-2 font-medium">{q.question}</p>
                  {!isCorrect && (
                    <div className="space-y-1 mt-3 p-3 bg-surface-1 rounded-lg border border-border-subtle">
                      <p className="text-xs text-module-red"><span className="font-semibold">{t('quizResults.yourAnswer', 'Your answer:')}</span> {userOption?.text}</p>
                      <p className="text-xs text-module-green"><span className="font-semibold">{t('quizResults.correctAnswer', 'Correct:')}</span> {correctOption?.text}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-8">
        <Button variant="secondary" onClick={onRetry}>
          <RotateCcw size={16} />
          {t('quizResults.retry', 'Retry quiz')}
        </Button>

        {passed && nextModule ? (
          <Link href={`/module/${nextModule.id}`}>
            <Button>
              {t('quizResults.start', 'Start')} {nextModule.title}
              <ChevronRight size={16} />
            </Button>
          </Link>
        ) : passed ? (
          <Link href="/">
            <Button>
              {t('quizResults.backHome', 'Back to home')}
              <ChevronRight size={16} />
            </Button>
          </Link>
        ) : (
          <Link href={`/module/${module.id}`}>
            <Button variant="secondary">
              {t('quizResults.reviewLessons', 'Review lessons')}
            </Button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
