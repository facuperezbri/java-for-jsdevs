import { Link } from 'react-router-dom';
import { Trophy, CheckCircle2, XCircle, RotateCcw, ChevronRight, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Confetti from 'react-confetti';
import type { Module, QuizQuestion } from '../../types';
import { Button } from '../ui/Button';
import { useCurriculum } from '../../data/curriculum';
import { cn } from '../../lib/utils';

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
    <div className="animate-fade-in">
      {passed && <Confetti width={windowDimensions.width} height={windowDimensions.height} recycle={false} numberOfPieces={500} />}
      
      {/* Score display */}
      <div className={cn(
        'rounded-2xl border p-8 text-center mb-8 relative overflow-hidden',
        passed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 shadow-sm' : 'bg-surface-800 border-surface-700 shadow-sm',
        perfect && 'border-yellow-400 dark:border-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.2)]'
      )}>
        {perfect && (
          <div className="absolute top-0 right-0 p-4">
             <div className="flex items-center gap-1 bg-yellow-400/20 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
               <Star size={14} className="fill-yellow-500 text-yellow-500" />
               {t('quizResults.perfect', 'Perfect')}
             </div>
          </div>
        )}

        <div className={cn(
          'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10',
          passed ? 'bg-green-500/20' : 'bg-surface-700'
        )}>
          <Trophy size={36} className={passed ? 'text-amber-400' : 'text-gray-500'} />
        </div>

        <div className={cn('text-5xl font-bold mb-2 relative z-10', passed ? 'text-green-600 dark:text-green-400' : 'text-gray-900 dark:text-gray-100')}>
          {score}%
        </div>
        <div className="text-gray-600 dark:text-gray-400 mb-4 relative z-10">
          {correct} {t('quizResults.of', 'of')} {totalQuestions} {t('quizResults.correct', 'correct')}
        </div>

        {passed ? (
          <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 relative z-10">
            <CheckCircle2 size={18} />
            <span className="font-semibold">
              {nextModule ? `${nextModule.title} ${t('quizResults.unlocked', 'unlocked!')}` : t('quizResults.courseComplete', 'Course complete!')}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 relative z-10">
            <span className="text-sm font-medium">{t('quizResults.needScore', 'Need ≥60% to pass — you got {{score}}%. Try again!', { score })}</span>
          </div>
        )}
      </div>

      {/* Question review */}
      <div className="space-y-3 mb-8">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">{t('quizResults.review', 'Review')}</h3>
        {questions.map((q) => {
          const userAnswer = answers[q.id];
          const isCorrect = userAnswer === q.correctKey;
          const userOption = q.options.find((o) => o.key === userAnswer);
          const correctOption = q.options.find((o) => o.key === q.correctKey);

          return (
            <div key={q.id} className={cn(
              'p-4 rounded-xl border',
              isCorrect ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/50 shadow-sm' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/50 shadow-sm'
            )}>
              <div className="flex items-start gap-3">
                {isCorrect
                  ? <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  : <XCircle size={16} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                }
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-gray-100 mb-2 font-medium">{q.question}</p>
                  {!isCorrect && (
                    <div className="space-y-1 mt-3 p-3 bg-white dark:bg-surface-900 rounded-lg border border-surface-700">
                      <p className="text-xs text-red-700 dark:text-red-300"><span className="font-semibold">{t('quizResults.yourAnswer', 'Your answer:')}</span> {userOption?.text}</p>
                      <p className="text-xs text-green-700 dark:text-green-400"><span className="font-semibold">{t('quizResults.correctAnswer', 'Correct:')}</span> {correctOption?.text}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-8">
        <Button variant="secondary" onClick={onRetry}>
          <RotateCcw size={16} />
          {t('quizResults.retry', 'Retry quiz')}
        </Button>

        {passed && nextModule ? (
          <Link to={`/module/${nextModule.id}`}>
            <Button>
              {t('quizResults.start', 'Start')} {nextModule.title}
              <ChevronRight size={16} />
            </Button>
          </Link>
        ) : passed ? (
          <Link to="/">
            <Button>
              {t('quizResults.backHome', 'Back to home')}
              <ChevronRight size={16} />
            </Button>
          </Link>
        ) : (
          <Link to={`/module/${module.id}`}>
            <Button variant="secondary">
              {t('quizResults.reviewLessons', 'Review lessons')}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
