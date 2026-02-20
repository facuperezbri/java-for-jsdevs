import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCurriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';

export function useLesson() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();
  const { progress, markLessonComplete, isLessonComplete } = useProgress();
  const { CURRICULUM, getModule, getLesson } = useCurriculum();

  const module = useMemo(
    () => (moduleId ? getModule(moduleId) : undefined),
    [moduleId]
  );

  const lesson = useMemo(
    () => (moduleId && lessonId ? getLesson(moduleId, lessonId) : undefined),
    [moduleId, lessonId]
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
      navigate(`/module/${moduleId}/lesson/${nextLesson.id}`);
    } else if (module && allLessonsComplete) {
      navigate(`/module/${module.id}/quiz`);
    }
  }

  function goPrev() {
    if (prevLesson && moduleId) {
      navigate(`/module/${moduleId}/lesson/${prevLesson.id}`);
    }
  }

  // Compute overall progress across all modules
  const overallProgress = useMemo(() => {
    const totalLessons = CURRICULUM.reduce((sum, m) => sum + m.lessons.length, 0);
    const completedLessons = CURRICULUM.reduce((sum, m) => {
      return sum + (progress.modules[m.id]?.completedLessonIds.length ?? 0);
    }, 0);
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  }, [progress]);

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
