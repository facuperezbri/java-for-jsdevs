import type { LearningPath } from '../types';

export const PATHS: LearningPath[] = [
  {
    id: 'java',
    title: 'Java for JS Devs',
    subtitle: 'Master Java through JavaScript comparisons',
    description:
      'Learn Java by comparing it to what you already know. Every concept is shown side-by-side with its JavaScript equivalent.',
    icon: '☕',
    accentColor: 'red',
    audienceTag: 'For JS Developers',
    moduleCount: 4,
    lessonCount: 22,
  },
  {
    id: 'react',
    title: 'React for Backend Devs',
    subtitle: 'Learn React through class ↔ hooks comparisons',
    description:
      'Master React by seeing every concept as both class components and modern hooks — side by side. Built for backend developers entering the frontend world.',
    icon: '⚛️',
    accentColor: 'cyan',
    audienceTag: 'For Backend Devs',
    moduleCount: 5,
    lessonCount: 25,
  },
];

export function getPath(pathId: string): LearningPath | undefined {
  return PATHS.find((p) => p.id === pathId);
}
