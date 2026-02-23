'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import type { AppProgress, QuizAttempt, PathProgress } from '../types';

const STORAGE_KEY = 'java_jsdevs_progress';

const defaultProgress: AppProgress = { paths: {} };

function emptyPathProgress(): PathProgress {
  return { modules: {} };
}

/** Migrate legacy flat `{ modules: {...} }` → `{ paths: { java: { modules: {...} } } }` */
function migrateProgress(raw: Record<string, unknown>): AppProgress {
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

function loadFromStorage(): AppProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return migrateProgress(JSON.parse(raw));
  } catch {
    return defaultProgress;
  }
}

function saveToStorage(progress: AppProgress) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

interface ProgressContextValue {
  progress: AppProgress;
  markLessonComplete: (pathId: string, moduleId: string, lessonId: string) => void;
  saveQuizAttempt: (pathId: string, moduleId: string, attempt: QuizAttempt) => void;
  setLastVisited: (path: string, pathId?: string, moduleId?: string, lessonId?: string) => void;
  isLessonComplete: (pathId: string, moduleId: string, lessonId: string) => boolean;
  revealExercise: (pathId: string, moduleId: string, lessonId: string, exerciseId: string) => void;
  completeChallenge: (pathId: string, moduleId: string, lessonId: string, challengeId: string) => void;
  isChallengeComplete: (pathId: string, moduleId: string, lessonId: string, challengeId: string) => boolean;
  completeDrill: (pathId: string, moduleId: string, lessonId: string, drillId: string) => void;
  isDrillComplete: (pathId: string, moduleId: string, lessonId: string, drillId: string) => boolean;
  completePrediction: (pathId: string, moduleId: string, lessonId: string, predictionId: string) => void;
  isPredictionComplete: (pathId: string, moduleId: string, lessonId: string, predictionId: string) => boolean;
  completeProjectStep: (pathId: string, moduleId: string, stepId: string) => void;
  isProjectStepComplete: (pathId: string, moduleId: string, stepId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const [progress, setProgress] = useState<AppProgress>(loadFromStorage);
  const [loaded, setLoaded] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from API when signed in (wait for Clerk to finish loading first)
  useEffect(() => {
    if (!isAuthLoaded) {
      setProgress(loadFromStorage());
      setLoaded(true);
      return;
    }

    if (!isSignedIn) {
      setProgress(loadFromStorage());
      setLoaded(true);
      return;
    }

    let cancelled = false;
    async function fetchProgress() {
      try {
        if (cancelled) return;
        const res = await fetch('/api/progress', { credentials: 'include' });
        if (cancelled) return;
        if (!res.ok) {
          setProgress(loadFromStorage());
          if (!cancelled) setLoaded(true);
          return;
        }
        const data = await res.json();
        if (!cancelled) setProgress(migrateProgress(data as Record<string, unknown>));
      } catch {
        setProgress(loadFromStorage());
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }
    fetchProgress();
    return () => {
      cancelled = true;
    };
  }, [isAuthLoaded, isSignedIn]);

  // Persist: API when signed in, localStorage otherwise
  const persist = useCallback(
    (next: AppProgress) => {
      if (!loaded) return;

      if (isSignedIn) {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(async () => {
          saveTimeoutRef.current = null;
          try {
            await fetch('/api/progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify(next),
            });
          } catch {
            // fallback to localStorage on error
            saveToStorage(next);
          }
        }, 300);
      } else {
        saveToStorage(next);
      }
    },
    [isSignedIn, loaded]
  );

  useEffect(() => {
    if (loaded) persist(progress);
  }, [progress, loaded, persist]);

  const ensureModule = useCallback(
    (prev: AppProgress, pathId: string, moduleId: string): AppProgress => {
      const pathProg = prev.paths[pathId] ?? emptyPathProgress();
      if (pathProg.modules[moduleId]) {
        // Make sure the path exists in paths
        if (!prev.paths[pathId]) {
          return { ...prev, paths: { ...prev.paths, [pathId]: pathProg } };
        }
        return prev;
      }
      return {
        ...prev,
        paths: {
          ...prev.paths,
          [pathId]: {
            ...pathProg,
            modules: {
              ...pathProg.modules,
              [moduleId]: {
                moduleId,
                completedLessonIds: [],
                quizAttempts: [],
                revealedExercises: {},
                completedChallenges: {},
                completedDrills: {},
                completedPredictions: {},
              },
            },
          },
        },
      };
    },
    []
  );

  /** Helper: update a module within a path */
  const updateModule = useCallback(
    (prev: AppProgress, pathId: string, moduleId: string, updater: (mp: AppProgress['paths'][string]['modules'][string]) => AppProgress['paths'][string]['modules'][string]): AppProgress => {
      const pp = prev.paths[pathId] ?? emptyPathProgress();
      const mp = pp.modules[moduleId];
      if (!mp) return prev;
      return {
        ...prev,
        paths: {
          ...prev.paths,
          [pathId]: {
            ...pp,
            modules: {
              ...pp.modules,
              [moduleId]: updater(mp),
            },
          },
        },
      };
    },
    []
  );

  const markLessonComplete = useCallback(
    (pathId: string, moduleId: string, lessonId: string) => {
      setProgress((prev) => {
        const next = ensureModule(prev, pathId, moduleId);
        const mp = next.paths[pathId].modules[moduleId];
        if (mp.completedLessonIds.includes(lessonId)) return prev;
        return updateModule(next, pathId, moduleId, (m) => ({
          ...m,
          completedLessonIds: [...m.completedLessonIds, lessonId],
        }));
      });
    },
    [ensureModule, updateModule]
  );

  const saveQuizAttempt = useCallback(
    (pathId: string, moduleId: string, attempt: QuizAttempt) => {
      setProgress((prev) => {
        const next = ensureModule(prev, pathId, moduleId);
        return updateModule(next, pathId, moduleId, (m) => ({
          ...m,
          quizAttempts: [...m.quizAttempts, attempt],
        }));
      });
    },
    [ensureModule, updateModule]
  );

  const setLastVisited = useCallback(
    (path: string, pathId?: string, moduleId?: string, lessonId?: string) => {
      setProgress((prev) => {
        let next: AppProgress = { ...prev, lastVisitedPath: path };
        if (pathId) {
          next = { ...next, activePath: pathId };
          if (moduleId) {
            next = ensureModule(next, pathId, moduleId);
            if (lessonId) {
              next = updateModule(next, pathId, moduleId, (m) => ({
                ...m,
                lastVisitedLessonId: lessonId,
              }));
            }
          }
        }
        return next;
      });
    },
    [ensureModule, updateModule]
  );

  const isLessonComplete = useCallback(
    (pathId: string, moduleId: string, lessonId: string) =>
      progress.paths[pathId]?.modules[moduleId]?.completedLessonIds.includes(lessonId) ?? false,
    [progress]
  );

  const revealExercise = useCallback(
    (pathId: string, moduleId: string, lessonId: string, exerciseId: string) => {
      setProgress((prev) => {
        const next = ensureModule(prev, pathId, moduleId);
        const mp = next.paths[pathId].modules[moduleId];
        const currentRevealed = mp.revealedExercises || {};
        const lessonRevealed = currentRevealed[lessonId] || [];
        if (lessonRevealed.includes(exerciseId)) return prev;
        return updateModule(next, pathId, moduleId, (m) => ({
          ...m,
          revealedExercises: {
            ...(m.revealedExercises || {}),
            [lessonId]: [...lessonRevealed, exerciseId],
          },
        }));
      });
    },
    [ensureModule, updateModule]
  );

  const completeChallenge = useCallback(
    (pathId: string, moduleId: string, lessonId: string, challengeId: string) => {
      setProgress((prev) => {
        const next = ensureModule(prev, pathId, moduleId);
        const mp = next.paths[pathId].modules[moduleId];
        const current = mp.completedChallenges || {};
        const lessonChallenges = current[lessonId] || [];
        if (lessonChallenges.includes(challengeId)) return prev;
        return updateModule(next, pathId, moduleId, (m) => ({
          ...m,
          completedChallenges: {
            ...(m.completedChallenges || {}),
            [lessonId]: [...lessonChallenges, challengeId],
          },
        }));
      });
    },
    [ensureModule, updateModule]
  );

  const isChallengeComplete = useCallback(
    (pathId: string, moduleId: string, lessonId: string, challengeId: string) =>
      progress.paths[pathId]?.modules[moduleId]?.completedChallenges?.[lessonId]?.includes(challengeId) ?? false,
    [progress]
  );

  const completeDrill = useCallback(
    (pathId: string, moduleId: string, lessonId: string, drillId: string) => {
      setProgress((prev) => {
        const next = ensureModule(prev, pathId, moduleId);
        const mp = next.paths[pathId].modules[moduleId];
        const current = mp.completedDrills || {};
        const lessonDrills = current[lessonId] || [];
        if (lessonDrills.includes(drillId)) return prev;
        return updateModule(next, pathId, moduleId, (m) => ({
          ...m,
          completedDrills: {
            ...(m.completedDrills || {}),
            [lessonId]: [...lessonDrills, drillId],
          },
        }));
      });
    },
    [ensureModule, updateModule]
  );

  const isDrillComplete = useCallback(
    (pathId: string, moduleId: string, lessonId: string, drillId: string) =>
      progress.paths[pathId]?.modules[moduleId]?.completedDrills?.[lessonId]?.includes(drillId) ?? false,
    [progress]
  );

  const completePrediction = useCallback(
    (pathId: string, moduleId: string, lessonId: string, predictionId: string) => {
      setProgress((prev) => {
        const next = ensureModule(prev, pathId, moduleId);
        const mp = next.paths[pathId].modules[moduleId];
        const current = mp.completedPredictions || {};
        const lessonPredictions = current[lessonId] || [];
        if (lessonPredictions.includes(predictionId)) return prev;
        return updateModule(next, pathId, moduleId, (m) => ({
          ...m,
          completedPredictions: {
            ...(m.completedPredictions || {}),
            [lessonId]: [...lessonPredictions, predictionId],
          },
        }));
      });
    },
    [ensureModule, updateModule]
  );

  const isPredictionComplete = useCallback(
    (pathId: string, moduleId: string, lessonId: string, predictionId: string) =>
      progress.paths[pathId]?.modules[moduleId]?.completedPredictions?.[lessonId]?.includes(predictionId) ?? false,
    [progress]
  );

  const completeProjectStep = useCallback(
    (pathId: string, moduleId: string, stepId: string) => {
      setProgress((prev) => {
        const next = ensureModule(prev, pathId, moduleId);
        const mp = next.paths[pathId].modules[moduleId];
        const pp = mp.projectProgress || { completedStepIds: [] };
        if (pp.completedStepIds.includes(stepId)) return prev;
        return updateModule(next, pathId, moduleId, (m) => ({
          ...m,
          projectProgress: {
            completedStepIds: [...pp.completedStepIds, stepId],
            lastStepId: stepId,
          },
        }));
      });
    },
    [ensureModule, updateModule]
  );

  const isProjectStepComplete = useCallback(
    (pathId: string, moduleId: string, stepId: string) =>
      progress.paths[pathId]?.modules[moduleId]?.projectProgress?.completedStepIds.includes(stepId) ?? false,
    [progress]
  );

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markLessonComplete,
        saveQuizAttempt,
        setLastVisited,
        isLessonComplete,
        revealExercise,
        completeChallenge,
        isChallengeComplete,
        completeDrill,
        isDrillComplete,
        completePrediction,
        isPredictionComplete,
        completeProjectStep,
        isProjectStepComplete,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
