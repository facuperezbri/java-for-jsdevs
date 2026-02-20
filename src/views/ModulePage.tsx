'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Clock, CheckCircle2, Trophy, Lock, Hammer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useCurriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import { isModuleUnlocked, getModuleProgress, getBestQuizScore, getModuleAccentClasses } from '../lib/utils';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';
import { staggerContainer, staggerItem } from '../lib/motion';

interface ModulePageProps {
  moduleId: string;
}

export function ModulePage({ moduleId }: ModulePageProps) {
  const router = useRouter();
  const { progress, setLastVisited } = useProgress();
  const { t } = useTranslation();
  const { CURRICULUM, getModule } = useCurriculum();

  const module = getModule(moduleId);
  const unlocked = module ? isModuleUnlocked(module.order, CURRICULUM, progress) : false;

  useEffect(() => {
    if (!module || !unlocked) {
      router.replace('/');
      return;
    }
    setLastVisited(`/module/${moduleId}`, moduleId);
  }, [moduleId, module, unlocked, router, setLastVisited]);

  if (!module || !unlocked) return null;

  const accent = getModuleAccentClasses(module.accentColor);
  const { completed, total, percent } = getModuleProgress(module, progress);
  const bestScore = getBestQuizScore(module.id, progress);
  const allLessonsComplete = completed === total;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto px-4 py-8"
    >
      {/* Module header */}
      <motion.div variants={staggerItem} className={cn('rounded-2xl border p-6 mb-8 bg-gradient-to-br', accent.bgLight, 'border-border-subtle')}>
        <div className="flex items-center gap-2 mb-4">
          <Link href="/" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">{t('common.home', 'Home')}</Link>
          <ChevronRight size={14} className="text-text-muted" />
          <span className="text-sm text-text-secondary">{module.title}</span>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-4xl">{module.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={module.accentColor} size="sm">{t('modulePage.module', 'Module')} {module.order}</Badge>
            </div>
            <h1 className="font-display text-display-md text-text-primary mb-1">{module.title}</h1>
            <p className="text-text-secondary text-sm">{module.subtitle}</p>
          </div>
        </div>

        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">{completed} {t('modulePage.of', 'of')} {total} {t('modulePage.lessonsComplete', 'lessons complete')}</span>
            <span className="text-text-primary font-medium">{Math.round(percent)}%</span>
          </div>
          <ProgressBar value={percent} color={module.accentColor} />
        </div>
      </motion.div>

      {/* Lesson list */}
      <motion.div variants={staggerContainer} className="space-y-2 mb-6">
        <motion.h2 variants={staggerItem} className="font-display text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-3">
          {t('modulePage.lessons', 'Lessons')}
        </motion.h2>
        {module.lessons.map((lesson, idx) => {
          const isComplete = progress.modules[module.id]?.completedLessonIds.includes(lesson.id);
          return (
            <motion.div key={lesson.id} variants={staggerItem}>
              <Link
                href={`/module/${module.id}/lesson/${lesson.id}`}
                className="flex items-center gap-4 p-4 bg-surface-1 hover:bg-surface-2 border border-border-subtle hover:border-border rounded-xl transition-all shadow-editorial group"
              >
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold',
                  isComplete ? 'bg-module-green/10' : accent.bgLight
                )}>
                  {isComplete
                    ? <CheckCircle2 size={16} className="text-module-green" />
                    : <span className={accent.text}>{idx + 1}</span>}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-text-primary font-medium text-sm">{lesson.title}</div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <div className="flex items-center gap-1">
                      <Clock size={11} className="text-text-muted" />
                      <span className="text-xs text-text-tertiary">{lesson.estimatedMinutes} {t('common.min', 'min')}</span>
                    </div>
                    <span className="text-xs text-text-muted">·</span>
                    <span className="text-xs text-text-tertiary">{lesson.concepts.length} {t('modulePage.concepts', 'concepts')}</span>
                    {lesson.exercises.length > 0 && (
                      <>
                        <span className="text-xs text-text-muted">·</span>
                        <span className="text-xs text-text-tertiary">{lesson.exercises.length} {t('modulePage.exercises', 'exercises')}</span>
                      </>
                    )}
                  </div>
                </div>

                <ChevronRight size={16} className="text-text-muted group-hover:text-text-secondary flex-shrink-0" />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mini Project */}
      {module.project && (
        <motion.div variants={staggerItem} className="mb-6">
          <h2 className="font-display text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-3">{t('modulePage.miniProject', 'Mini Project')}</h2>
          <Link href={`/module/${module.id}/project`}>
            <div className={cn(
              'flex items-center gap-4 p-4 rounded-xl border transition-all shadow-editorial hover:shadow-editorial-lg',
              accent.bgLight, 'border-border-subtle'
            )}>
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Hammer size={16} className="text-amber-500" />
              </div>
              <div className="flex-1">
                <div className="text-text-primary font-medium text-sm">{module.project.title}</div>
                <div className="flex items-center gap-3 mt-0.5">
                  <div className="flex items-center gap-1">
                    <Clock size={11} className="text-text-muted" />
                    <span className="text-xs text-text-tertiary">~{module.project.estimatedMinutes} {t('common.min', 'min')}</span>
                  </div>
                  <span className="text-xs text-text-muted">·</span>
                  <span className="text-xs text-text-tertiary">{module.project.steps.length} {t('modulePage.steps', 'steps')}</span>
                  <span className="text-xs text-text-muted">·</span>
                  <span className="text-xs text-amber-500 font-medium">{t('modulePage.optional', 'Optional')}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-text-muted" />
            </div>
          </Link>
        </motion.div>
      )}

      {/* Quiz section */}
      <motion.div variants={staggerItem} className="border-t border-border-subtle pt-6">
        <h2 className="font-display text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-3">{t('modulePage.moduleQuiz', 'Module Quiz')}</h2>
        {allLessonsComplete ? (
          <Link href={`/module/${module.id}/quiz`}>
            <div className={cn(
              'flex items-center gap-4 p-4 rounded-xl border transition-all shadow-editorial hover:shadow-editorial-lg',
              bestScore !== null && bestScore >= 60
                ? 'bg-module-green/5 border-module-green/20'
                : `${accent.bgLight} border-border-subtle`
            )}>
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Trophy size={16} className="text-amber-500" />
              </div>
              <div className="flex-1">
                <div className="text-text-primary font-medium text-sm">{t('modulePage.moduleQuiz', 'Module Quiz')}</div>
                <div className="text-xs text-text-tertiary mt-0.5">
                  {bestScore !== null
                    ? `${t('modulePage.bestScore', 'Best score')}: ${bestScore}% — ${bestScore >= 60 ? '✓ ' + t('modulePage.passed', 'Passed') : t('modulePage.tryAgain', 'Try again to improve')}`
                    : t('modulePage.quizDesc', '8 questions · Pass with ≥60% to unlock next module')}
                </div>
              </div>
              <ChevronRight size={16} className="text-text-muted" />
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-4 p-4 rounded-xl border bg-surface-2 border-border-subtle opacity-60 shadow-editorial">
            <div className="w-8 h-8 rounded-full bg-surface-3 flex items-center justify-center flex-shrink-0">
              <Lock size={14} className="text-text-muted" />
            </div>
            <div>
              <div className="text-text-secondary font-medium text-sm">{t('modulePage.moduleQuiz', 'Module Quiz')}</div>
              <div className="text-xs text-text-tertiary mt-0.5">{t('modulePage.completeAllLessons', 'Complete all lessons to unlock')}</div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
