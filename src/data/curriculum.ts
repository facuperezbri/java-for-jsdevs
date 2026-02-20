import { useTranslation } from 'react-i18next';
import type { Module, Lesson, Quiz, MiniProject } from '../types';
import module1En from './modules/module-1-basics';
import module2En from './modules/module-2-oop';
import module3En from './modules/module-3-collections';
import module4En from './modules/module-4-spring';
import module1Es from './modules/module-1-basics.es';
import module2Es from './modules/module-2-oop.es';
import module3Es from './modules/module-3-collections.es';
import module4Es from './modules/module-4-spring.es';
import quiz1En from './quizzes/quiz-1';
import quiz2En from './quizzes/quiz-2';
import quiz3En from './quizzes/quiz-3';
import quiz4En from './quizzes/quiz-4';
import quiz1Es from './quizzes/quiz-1.es';
import quiz2Es from './quizzes/quiz-2.es';
import quiz3Es from './quizzes/quiz-3.es';
import quiz4Es from './quizzes/quiz-4.es';

const CURRICULUM_EN: Module[] = [module1En, module2En, module3En, module4En];
const QUIZZES_EN: Quiz[] = [quiz1En, quiz2En, quiz3En, quiz4En];

const CURRICULUM_ES: Module[] = [module1Es, module2Es, module3Es, module4Es];
const QUIZZES_ES: Quiz[] = [quiz1Es, quiz2Es, quiz3Es, quiz4Es];

export function useCurriculum() {
  const { i18n } = useTranslation();
  const isEs = i18n.language.startsWith('es');
  
  const CURRICULUM = isEs ? CURRICULUM_ES : CURRICULUM_EN;
  const QUIZZES = isEs ? QUIZZES_ES : QUIZZES_EN;

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
    CURRICULUM,
    QUIZZES,
    getModule,
    getLesson,
    getQuiz,
    getModuleByQuiz,
    getProject
  };
}

