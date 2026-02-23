import type { AppProgress, PathProgress } from '../types';

const defaultProgress: AppProgress = { paths: {} };

/** Migrate legacy flat `{ modules: {...} }` → `{ paths: { java: { modules: {...} } } }` */
export function migrateProgress(raw: Record<string, unknown>): AppProgress {
  // Already migrated
  if (raw.paths && typeof raw.paths === 'object') {
    return raw as unknown as AppProgress;
  }
  // Legacy format: has `modules` at top level
  if (raw.modules && typeof raw.modules === 'object') {
    return {
      paths: {
        java: {
          modules: raw.modules as PathProgress['modules'],
          lastVisitedLessonPath: raw.lastVisitedPath as string | undefined,
        },
      },
      activePath: 'java',
      lastVisitedPath: raw.lastVisitedPath as string | undefined,
    };
  }
  return defaultProgress;
}
