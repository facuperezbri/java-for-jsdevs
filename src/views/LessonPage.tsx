'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLesson } from '../hooks/useLesson';
import { useProgress } from '../context/ProgressContext';
import { useCurriculum } from '../data/curriculum';
import { isModuleUnlocked } from '../lib/utils';
import { LessonHeader } from '../components/lesson/LessonHeader';
import { ConceptBlock } from '../components/lesson/ConceptBlock';
import { ThinkingExercise } from '../components/lesson/ThinkingExercise';
import { PredictOutputExercise } from '../components/lesson/PredictOutput';
import { TranslationDrillExercise } from '../components/lesson/TranslationDrill';
import { LessonNav } from '../components/lesson/LessonNav';
import { LessonProgress } from '../components/lesson/LessonProgress';
import { Button } from '../components/ui/Button';

interface LessonPageProps {
  moduleId: string;
  lessonId: string;
}

export function LessonPage({ moduleId, lessonId }: LessonPageProps) {
  const { module, lesson, prevLesson, nextLesson, isComplete, allLessonsComplete, complete, goNext, goPrev } = useLesson(moduleId, lessonId);
  const {
    progress, setLastVisited, revealExercise,
    completeChallenge, isChallengeComplete,
    completeDrill, isDrillComplete,
    completePrediction, isPredictionComplete,
  } = useProgress();
  const router = useRouter();
  const { t } = useTranslation();
  const { CURRICULUM } = useCurriculum();
  const bottomRef = useRef<HTMLDivElement>(null);

  const unlocked = module ? isModuleUnlocked(module.order, CURRICULUM, progress) : false;

  useEffect(() => {
    if (!module || !lesson || !unlocked) {
      router.replace('/');
      return;
    }
    setLastVisited(`/module/${module.id}/lesson/${lesson.id}`, module.id, lesson.id);
  }, [lesson?.id, module?.id, setLastVisited, module, lesson, unlocked, router]);

  if (!module || !lesson || !unlocked) return null;

  const lessonIndex = module.lessons.findIndex((l) => l.id === lesson.id);
  const revealedFromContext = progress.modules[module.id]?.revealedExercises?.[lesson.id] || [];

  const allExercisesRevealed =
    lesson.exercises.length === 0 || revealedFromContext.length >= lesson.exercises.length;

  function handleExerciseReveal(exerciseId: string) {
    revealExercise(module!.id, lesson!.id, exerciseId);
  }

  function handleChallengeComplete(challengeId: string) {
    completeChallenge(module!.id, lesson!.id, challengeId);
  }

  function handleDrillComplete(drillId: string) {
    completeDrill(module!.id, lesson!.id, drillId);
  }

  function handlePredictionComplete(predictionId: string) {
    completePrediction(module!.id, lesson!.id, predictionId);
  }

  function handleMarkComplete() {
    complete();
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }

  function handleGoToQuiz() {
    router.push(`/module/${module!.id}/quiz`);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Lesson position dots */}
      <div className="flex justify-between items-center mb-6">
        <LessonProgress module={module} currentLessonId={lesson.id} />
      </div>

      <LessonHeader
        lesson={lesson}
        module={module}
        isComplete={isComplete}
        lessonIndex={lessonIndex}
        totalLessons={module.lessons.length}
      />

      {/* Concepts (with inline challenges) */}
      <div className="space-y-10 mb-10">
        {lesson.concepts.map((concept, idx) => (
          <div key={concept.id}>
            {idx > 0 && <div className="h-px bg-surface-700 mb-10" />}
            <ConceptBlock
              concept={concept}
              isChallengeComplete={
                concept.challenge
                  ? isChallengeComplete(module.id, lesson.id, concept.challenge.id)
                  : undefined
              }
              onChallengeComplete={concept.challenge ? handleChallengeComplete : undefined}
            />
          </div>
        ))}
      </div>

      {/* Translation Drills */}
      {lesson.translationDrills && lesson.translationDrills.length > 0 && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-surface-700" />
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider px-2">
              {t('lessonPage.translateIt', 'Translate It')}
            </h2>
            <div className="h-px flex-1 bg-surface-700" />
          </div>

          {lesson.translationDrills.map((drill, idx) => (
            <TranslationDrillExercise
              key={drill.id}
              drill={drill}
              index={idx}
              isComplete={isDrillComplete(module.id, lesson.id, drill.id)}
              onComplete={handleDrillComplete}
            />
          ))}
        </div>
      )}

      {/* Predict the Output */}
      {lesson.predictOutputs && lesson.predictOutputs.length > 0 && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-surface-700" />
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider px-2">
              {t('lessonPage.predictOutput', 'Predict the Output')}
            </h2>
            <div className="h-px flex-1 bg-surface-700" />
          </div>

          {lesson.predictOutputs.map((exercise, idx) => (
            <PredictOutputExercise
              key={exercise.id}
              exercise={exercise}
              index={idx}
              isComplete={isPredictionComplete(module.id, lesson.id, exercise.id)}
              onComplete={handlePredictionComplete}
            />
          ))}
        </div>
      )}

      {/* Think About It Exercises */}
      {lesson.exercises.length > 0 && (
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-surface-700" />
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider px-2">
              {t('lessonPage.thinkAboutIt', 'Think About It')}
            </h2>
            <div className="h-px flex-1 bg-surface-700" />
          </div>

          {lesson.exercises.map((exercise, idx) => (
            <ThinkingExercise
              key={exercise.id}
              exercise={exercise}
              index={idx}
              isRevealed={revealedFromContext.includes(exercise.id)}
              onReveal={() => handleExerciseReveal(exercise.id)}
            />
          ))}
        </div>
      )}

      {/* Mark complete button */}
      {!isComplete && allExercisesRevealed && (
        <div className="flex justify-center mb-6">
          <Button size="lg" onClick={handleMarkComplete}>
            <CheckCircle2 size={18} />
            {t('lessonPage.markComplete', 'Mark lesson complete')}
          </Button>
        </div>
      )}

      {isComplete && !nextLesson && allLessonsComplete && (
        <div className="flex justify-center mb-6 animate-[fadeIn_0.5s_ease-out]">
          <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <CheckCircle2 size={32} className="text-green-500 mx-auto mb-2 animate-bounce" />
            <p className="text-sm text-green-600 dark:text-green-400 font-medium">{t('lessonPage.moduleComplete', 'Module complete! Take the quiz to unlock the next module.')}</p>
          </div>
        </div>
      )}

      {/* Lesson navigation */}
      <LessonNav
        prevLesson={prevLesson}
        nextLesson={nextLesson}
        module={module}
        allLessonsComplete={allLessonsComplete}
        onPrev={goPrev}
        onNext={goNext}
        onGoToQuiz={handleGoToQuiz}
      />
      <div ref={bottomRef} />
    </div>
  );
}
