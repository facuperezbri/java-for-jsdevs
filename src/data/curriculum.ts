import { useTranslation } from 'react-i18next';
import type { Module, Lesson, Quiz, MiniProject, LearningPath } from '../types';
import { PATHS } from './paths';

// ─── Java path ──────────────────────────────────────────────────────────────
import javaM1En from './paths/java/modules/module-1-basics';
import javaM2En from './paths/java/modules/module-2-oop';
import javaM3En from './paths/java/modules/module-3-collections';
import javaM4En from './paths/java/modules/module-4-spring';
import javaM1Es from './paths/java/modules/module-1-basics.es';
import javaM2Es from './paths/java/modules/module-2-oop.es';
import javaM3Es from './paths/java/modules/module-3-collections.es';
import javaM4Es from './paths/java/modules/module-4-spring.es';
import javaQ1En from './paths/java/quizzes/quiz-1';
import javaQ2En from './paths/java/quizzes/quiz-2';
import javaQ3En from './paths/java/quizzes/quiz-3';
import javaQ4En from './paths/java/quizzes/quiz-4';
import javaQ1Es from './paths/java/quizzes/quiz-1.es';
import javaQ2Es from './paths/java/quizzes/quiz-2.es';
import javaQ3Es from './paths/java/quizzes/quiz-3.es';
import javaQ4Es from './paths/java/quizzes/quiz-4.es';

// ─── React path ─────────────────────────────────────────────────────────────
import reactM1En from './paths/react/modules/react-m1-js-essentials';
import reactM2En from './paths/react/modules/react-m2-fundamentals';
import reactM3En from './paths/react/modules/react-m3-state-lifecycle';
import reactM4En from './paths/react/modules/react-m4-advanced-patterns';
import reactM5En from './paths/react/modules/react-m5-react18';
import reactM1Es from './paths/react/modules/react-m1-js-essentials.es';
import reactM2Es from './paths/react/modules/react-m2-fundamentals.es';
import reactM3Es from './paths/react/modules/react-m3-state-lifecycle.es';
import reactM4Es from './paths/react/modules/react-m4-advanced-patterns.es';
import reactM5Es from './paths/react/modules/react-m5-react18.es';
import reactQ1En from './paths/react/quizzes/react-quiz-1';
import reactQ2En from './paths/react/quizzes/react-quiz-2';
import reactQ3En from './paths/react/quizzes/react-quiz-3';
import reactQ4En from './paths/react/quizzes/react-quiz-4';
import reactQ5En from './paths/react/quizzes/react-quiz-5';
import reactQ1Es from './paths/react/quizzes/react-quiz-1.es';
import reactQ2Es from './paths/react/quizzes/react-quiz-2.es';
import reactQ3Es from './paths/react/quizzes/react-quiz-3.es';
import reactQ4Es from './paths/react/quizzes/react-quiz-4.es';
import reactQ5Es from './paths/react/quizzes/react-quiz-5.es';

// ─── Data maps ──────────────────────────────────────────────────────────────

const PATH_CURRICULA: Record<string, { en: Module[]; es: Module[] }> = {
  java: {
    en: [javaM1En, javaM2En, javaM3En, javaM4En],
    es: [javaM1Es, javaM2Es, javaM3Es, javaM4Es],
  },
  react: {
    en: [reactM1En, reactM2En, reactM3En, reactM4En, reactM5En],
    es: [reactM1Es, reactM2Es, reactM3Es, reactM4Es, reactM5Es],
  },
};

const PATH_QUIZZES: Record<string, { en: Quiz[]; es: Quiz[] }> = {
  java: {
    en: [javaQ1En, javaQ2En, javaQ3En, javaQ4En],
    es: [javaQ1Es, javaQ2Es, javaQ3Es, javaQ4Es],
  },
  react: {
    en: [reactQ1En, reactQ2En, reactQ3En, reactQ4En, reactQ5En],
    es: [reactQ1Es, reactQ2Es, reactQ3Es, reactQ4Es, reactQ5Es],
  },
};

// ─── Hooks ──────────────────────────────────────────────────────────────────

export function usePaths(): LearningPath[] {
  return PATHS;
}

export function usePathCurriculum(pathId: string) {
  const { i18n } = useTranslation();
  const isEs = i18n.language.startsWith('es');
  const lang = isEs ? 'es' : 'en';

  const pathData = PATH_CURRICULA[pathId];
  const quizData = PATH_QUIZZES[pathId];

  const CURRICULUM: Module[] = pathData?.[lang] ?? [];
  const QUIZZES: Quiz[] = quizData?.[lang] ?? [];
  const path = PATHS.find((p) => p.id === pathId);

  function getModule(moduleId: string): Module | undefined {
    return CURRICULUM.find((m) => m.id === moduleId);
  }

  function getLesson(moduleId: string, lessonId: string): Lesson | undefined {
    return getModule(moduleId)?.lessons.find((l) => l.id === lessonId);
  }

  function getQuiz(quizId: string): Quiz | undefined {
    return QUIZZES.find((q) => q.id === quizId);
  }

  function getModuleByQuiz(quizId: string): Module | undefined {
    return CURRICULUM.find((m) => m.quizId === quizId);
  }

  function getProject(moduleId: string): MiniProject | undefined {
    return getModule(moduleId)?.project;
  }

  return {
    path,
    CURRICULUM,
    QUIZZES,
    getModule,
    getLesson,
    getQuiz,
    getModuleByQuiz,
    getProject,
  };
}

/** Backward-compatible hook — returns Java path by default */
export function useCurriculum() {
  return usePathCurriculum('java');
}
