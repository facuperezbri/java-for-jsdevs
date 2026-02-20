'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import type { AppProgress, QuizAttempt } from '../types';

const STORAGE_KEY = 'java_jsdevs_progress';

const defaultProgress: AppProgress = { modules: {} };

function loadFromStorage(): AppProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AppProgress) : defaultProgress;
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
  markLessonComplete: (moduleId: string, lessonId: string) => void;
  saveQuizAttempt: (moduleId: string, attempt: QuizAttempt) => void;
  setLastVisited: (path: string, moduleId?: string, lessonId?: string) => void;
  isLessonComplete: (moduleId: string, lessonId: string) => boolean;
  revealExercise: (moduleId: string, lessonId: string, exerciseId: string) => void;
  completeChallenge: (moduleId: string, lessonId: string, challengeId: string) => void;
  isChallengeComplete: (moduleId: string, lessonId: string, challengeId: string) => boolean;
  completeDrill: (moduleId: string, lessonId: string, drillId: string) => void;
  isDrillComplete: (moduleId: string, lessonId: string, drillId: string) => boolean;
  completePrediction: (moduleId: string, lessonId: string, predictionId: string) => void;
  isPredictionComplete: (moduleId: string, lessonId: string, predictionId: string) => boolean;
  completeProjectStep: (moduleId: string, stepId: string) => void;
  isProjectStepComplete: (moduleId: string, stepId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();
  const [progress, setProgress] = useState<AppProgress>(loadFromStorage);
  const [loaded, setLoaded] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load from API when signed in
  useEffect(() => {
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
        if (!res.ok || cancelled) return;
        const data = (await res.json()) as AppProgress;
        setProgress(data);
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
  }, [isSignedIn]);

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
    (prev: AppProgress, moduleId: string): AppProgress => {
      if (prev.modules[moduleId]) return prev;
      return {
        ...prev,
        modules: {
          ...prev.modules,
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
      };
    },
    []
  );

  const markLessonComplete = useCallback(
    (moduleId: string, lessonId: string) => {
      setProgress((prev) => {
        const next = ensureModule(prev, moduleId);
        const mp = next.modules[moduleId];
        if (mp.completedLessonIds.includes(lessonId)) return prev;
        return {
          ...next,
          modules: {
            ...next.modules,
            [moduleId]: {
              ...mp,
              completedLessonIds: [...mp.completedLessonIds, lessonId],
            },
          },
        };
      });
    },
    [ensureModule]
  );

  const saveQuizAttempt = useCallback(
    (moduleId: string, attempt: QuizAttempt) => {
      setProgress((prev) => {
        const next = ensureModule(prev, moduleId);
        const mp = next.modules[moduleId];
        return {
          ...next,
          modules: {
            ...next.modules,
            [moduleId]: {
              ...mp,
              quizAttempts: [...mp.quizAttempts, attempt],
            },
          },
        };
      });
    },
    [ensureModule]
  );

  const setLastVisited = useCallback(
    (path: string, moduleId?: string, lessonId?: string) => {
      setProgress((prev) => {
        let next: AppProgress = { ...prev, lastVisitedPath: path };
        if (moduleId) {
          next = ensureModule(next, moduleId);
          if (lessonId) {
            next = {
              ...next,
              modules: {
                ...next.modules,
                [moduleId]: {
                  ...next.modules[moduleId],
                  lastVisitedLessonId: lessonId,
                },
              },
            };
          }
        }
        return next;
      });
    },
    [ensureModule]
  );

  const isLessonComplete = useCallback(
    (moduleId: string, lessonId: string) =>
      progress.modules[moduleId]?.completedLessonIds.includes(lessonId) ?? false,
    [progress]
  );

  const revealExercise = useCallback(
    (moduleId: string, lessonId: string, exerciseId: string) => {
      setProgress((prev) => {
        const next = ensureModule(prev, moduleId);
        const mp = next.modules[moduleId];
        const currentRevealed = mp.revealedExercises || {};
        const lessonRevealed = currentRevealed[lessonId] || [];

        if (lessonRevealed.includes(exerciseId)) return prev;

        return {
          ...next,
          modules: {
            ...next.modules,
            [moduleId]: {
              ...mp,
              revealedExercises: {
                ...currentRevealed,
                [lessonId]: [...lessonRevealed, exerciseId],
              },
            },
          },
        };
      });
    },
    [ensureModule]
  );

  const completeChallenge = useCallback(
    (moduleId: string, lessonId: string, challengeId: string) => {
      setProgress((prev) => {
        const next = ensureModule(prev, moduleId);
        const mp = next.modules[moduleId];
        const current = mp.completedChallenges || {};
        const lessonChallenges = current[lessonId] || [];
        if (lessonChallenges.includes(challengeId)) return prev;
        return {
          ...next,
          modules: {
            ...next.modules,
            [moduleId]: {
              ...mp,
              completedChallenges: {
                ...current,
                [lessonId]: [...lessonChallenges, challengeId],
              },
            },
          },
        };
      });
    },
    [ensureModule]
  );

  const isChallengeComplete = useCallback(
    (moduleId: string, lessonId: string, challengeId: string) =>
      progress.modules[moduleId]?.completedChallenges?.[lessonId]?.includes(challengeId) ?? false,
    [progress]
  );

  const completeDrill = useCallback(
    (moduleId: string, lessonId: string, drillId: string) => {
      setProgress((prev) => {
        const next = ensureModule(prev, moduleId);
        const mp = next.modules[moduleId];
        const current = mp.completedDrills || {};
        const lessonDrills = current[lessonId] || [];
        if (lessonDrills.includes(drillId)) return prev;
        return {
          ...next,
          modules: {
            ...next.modules,
            [moduleId]: {
              ...mp,
              completedDrills: {
                ...current,
                [lessonId]: [...lessonDrills, drillId],
              },
            },
          },
        };
      });
    },
    [ensureModule]
  );

  const isDrillComplete = useCallback(
    (moduleId: string, lessonId: string, drillId: string) =>
      progress.modules[moduleId]?.completedDrills?.[lessonId]?.includes(drillId) ?? false,
    [progress]
  );

  const completePrediction = useCallback(
    (moduleId: string, lessonId: string, predictionId: string) => {
      setProgress((prev) => {
        const next = ensureModule(prev, moduleId);
        const mp = next.modules[moduleId];
        const current = mp.completedPredictions || {};
        const lessonPredictions = current[lessonId] || [];
        if (lessonPredictions.includes(predictionId)) return prev;
        return {
          ...next,
          modules: {
            ...next.modules,
            [moduleId]: {
              ...mp,
              completedPredictions: {
                ...current,
                [lessonId]: [...lessonPredictions, predictionId],
              },
            },
          },
        };
      });
    },
    [ensureModule]
  );

  const isPredictionComplete = useCallback(
    (moduleId: string, lessonId: string, predictionId: string) =>
      progress.modules[moduleId]?.completedPredictions?.[lessonId]?.includes(predictionId) ?? false,
    [progress]
  );

  const completeProjectStep = useCallback(
    (moduleId: string, stepId: string) => {
      setProgress((prev) => {
        const next = ensureModule(prev, moduleId);
        const mp = next.modules[moduleId];
        const pp = mp.projectProgress || { completedStepIds: [] };
        if (pp.completedStepIds.includes(stepId)) return prev;
        return {
          ...next,
          modules: {
            ...next.modules,
            [moduleId]: {
              ...mp,
              projectProgress: {
                completedStepIds: [...pp.completedStepIds, stepId],
                lastStepId: stepId,
              },
            },
          },
        };
      });
    },
    [ensureModule]
  );

  const isProjectStepComplete = useCallback(
    (moduleId: string, stepId: string) =>
      progress.modules[moduleId]?.projectProgress?.completedStepIds.includes(stepId) ?? false,
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
