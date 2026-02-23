'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { usePathCurriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import { isModuleUnlocked } from '../lib/utils';
import { QuizProgress } from '../components/quiz/QuizProgress';
import { QuizCard } from '../components/quiz/QuizCard';
import { QuizResults } from '../components/quiz/QuizResults';
import { ChevronLeft } from 'lucide-react';

type Phase = 'answering' | 'results';

interface QuizPageProps {
  pathId: string;
  moduleId: string;
}

export function QuizPage({ pathId, moduleId }: QuizPageProps) {
  const router = useRouter();
  const { progress, saveQuizAttempt, setLastVisited } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>('answering');
  const [finalScore, setFinalScore] = useState(0);

  const { CURRICULUM, getModule, getQuiz } = usePathCurriculum(pathId);

  const module = getModule(moduleId ?? '');
  const quiz = module ? getQuiz(module.quizId) : undefined;

  const unlocked = module ? isModuleUnlocked(module.order, CURRICULUM, progress, pathId) : false;
  const allLessonsComplete = module
    ? (progress.paths[pathId]?.modules[module.id]?.completedLessonIds.length ?? 0) >= module.lessons.length
    : false;

  useEffect(() => {
    if (!module) {
      router.replace(`/path/${pathId}`);
      return;
    }
    if (!quiz) {
      router.replace(`/path/${pathId}/module/${moduleId}`);
      return;
    }
    if (!unlocked || !allLessonsComplete) {
      router.replace(`/path/${pathId}/module/${moduleId}`);
      return;
    }
    setLastVisited(`/path/${pathId}/module/${moduleId}/quiz`, pathId, moduleId);
  }, [moduleId, module, quiz, unlocked, allLessonsComplete, router, setLastVisited, pathId]);

  if (!module || !quiz || !unlocked || !allLessonsComplete) return null;

  function handleAnswer(key: string) {
    const question = quiz!.questions[currentIndex];
    const newAnswers = { ...answers, [question.id]: key };
    setAnswers(newAnswers);

    const nextIndex = currentIndex + 1;
    if (nextIndex >= quiz!.questions.length) {
      const correct = quiz!.questions.filter((q) => newAnswers[q.id] === q.correctKey).length;
      const score = Math.round((correct / quiz!.questions.length) * 100);
      setFinalScore(score);
      saveQuizAttempt(pathId, module!.id, {
        quizId: quiz!.id,
        score,
        completedAt: new Date().toISOString(),
        answers: newAnswers,
      });
      setPhase('results');
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  function handleRetry() {
    setCurrentIndex(0);
    setAnswers({});
    setPhase('answering');
    setFinalScore(0);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href={`/path/${pathId}/module/${moduleId}`}
          className="flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-primary transition-colors"
        >
          <ChevronLeft size={16} />
          {module.title}
        </Link>
        <div className="text-sm text-text-tertiary">
          {phase === 'answering'
            ? `Question ${currentIndex + 1} of ${quiz.questions.length}`
            : 'Results'}
        </div>
      </div>

      {phase === 'answering' && (
        <>
          <QuizProgress
            current={currentIndex}
            total={quiz.questions.length}
            answers={answers}
            questionIds={quiz.questions.map((q) => q.id)}
            module={module}
          />
          <AnimatePresence mode="wait">
            <QuizCard
              key={quiz.questions[currentIndex].id}
              question={quiz.questions[currentIndex]}
              module={module}
              onAnswer={handleAnswer}
            />
          </AnimatePresence>
        </>
      )}

      {phase === 'results' && (
        <QuizResults
          score={finalScore}
          totalQuestions={quiz.questions.length}
          answers={answers}
          questions={quiz.questions}
          module={module}
          onRetry={handleRetry}
          curriculum={CURRICULUM}
        />
      )}
    </div>
  );
}
