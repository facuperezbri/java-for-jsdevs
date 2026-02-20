import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCurriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';

export function useLesson(moduleId: string | undefined, lessonId: string | undefined) {
  const router = useRouter();
  const { progress, markLessonComplete, isLessonComplete } = useProgress();
  const { CURRICULUM, getModule, getLesson } = useCurriculum();

  const module = useMemo(
    () => (moduleId ? getModule(moduleId) : undefined),
    [moduleId, getModule]
  );

  const lesson = useMemo(
    () => (moduleId && lessonId ? getLesson(moduleId, lessonId) : undefined),
    [moduleId, lessonId, getLesson]
  );

  const { prevLesson, nextLesson } = useMemo(() => {
    if (!module || !lessonId) return { prevLesson: undefined, nextLesson: undefined };
    const idx = module.lessons.findIndex((l) => l.id === lessonId);
    return {
      prevLesson: idx > 0 ? module.lessons[idx - 1] : undefined,
      nextLesson: idx < module.lessons.length - 1 ? module.lessons[idx + 1] : undefined,
    };
  }, [module, lessonId]);

  const isComplete = moduleId && lessonId ? isLessonComplete(moduleId, lessonId) : false;

  const allLessonsComplete = useMemo(() => {
    if (!module) return false;
    return module.lessons.every((l) => isLessonComplete(module.id, l.id));
  }, [module, isLessonComplete]);

  function complete() {
    if (moduleId && lessonId) {
      markLessonComplete(moduleId, lessonId);
    }
  }

  function goNext() {
    if (nextLesson && moduleId) {
      router.push(`/module/${moduleId}/lesson/${nextLesson.id}`);
    } else if (module && allLessonsComplete) {
      router.push(`/module/${module.id}/quiz`);
    }
  }

  function goPrev() {
    if (prevLesson && moduleId) {
      router.push(`/module/${moduleId}/lesson/${prevLesson.id}`);
    }
  }

  // Compute overall progress across all modules
  const overallProgress = useMemo(() => {
    const totalLessons = CURRICULUM.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedLessons = CURRICULUM.reduce((sum, m) => {
      return sum + (progress.modules[m.id]?.completedLessonIds.length ?? 0);
    }, 0);
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  }, [progress, CURRICULUM]);

  return {
    module,
    lesson,
    prevLesson,
    nextLesson,
    isComplete,
    allLessonsComplete,
    complete,
    goNext,
    goPrev,
    overallProgress,
  };
}
