import { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronRight, Clock, CheckCircle2, Trophy, Lock, Hammer } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCurriculum } from '../data/curriculum';
import { useProgress } from '../context/ProgressContext';
import { isModuleUnlocked, getModuleProgress, getBestQuizScore, getModuleAccentClasses } from '../lib/utils';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { cn } from '../lib/utils';

export function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { progress, setLastVisited } = useProgress();
  const { t } = useTranslation();
  const { CURRICULUM, getModule } = useCurriculum();

  const module = getModule(moduleId ?? '');
  if (!module) return <Navigate to="/" />;

  const unlocked = isModuleUnlocked(module.order, CURRICULUM, progress);
  if (!unlocked) return <Navigate to="/" />;

  const accent = getModuleAccentClasses(module.accentColor);
  const { completed, total, percent } = getModuleProgress(module, progress);
  const bestScore = getBestQuizScore(module.id, progress);
  const allLessonsComplete = completed === total;

  useEffect(() => {
    setLastVisited(`/module/${moduleId}`, moduleId);
  }, [moduleId]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Module header */}
      <div className={cn('rounded-2xl border p-6 mb-8', accent.bgLight, 'border-' + module.accentColor + '/20')}>
        <div className="flex items-center gap-2 mb-4">
          <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">{t('common.home', 'Home')}</Link>
          <ChevronRight size={14} className="text-gray-600 dark:text-gray-400" />
          <span className="text-sm text-gray-800 dark:text-gray-300">{module.title}</span>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-4xl">{module.icon}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={module.accentColor} size="sm">{t('modulePage.module', 'Module')} {module.order}</Badge>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{module.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{module.subtitle}</p>
          </div>
        </div>

        <div className="mt-5 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{completed} {t('modulePage.of', 'of')} {total} {t('modulePage.lessonsComplete', 'lessons complete')}</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">{Math.round(percent)}%</span>
          </div>
          <ProgressBar value={percent} color={module.accentColor} />
        </div>
      </div>

      {/* Lesson list */}
      <div className="space-y-2 mb-6">
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">{t('modulePage.lessons', 'Lessons')}</h2>
        {module.lessons.map((lesson, idx) => {
          const isComplete = progress.modules[module.id]?.completedLessonIds.includes(lesson.id);
          return (
            <Link
              key={lesson.id}
              to={`/module/${module.id}/lesson/${lesson.id}`}
              className="flex items-center gap-4 p-4 bg-surface-900 dark:bg-surface-800 hover:bg-gray-50 dark:hover:bg-surface-700 border border-surface-700 hover:border-surface-600 rounded-xl transition-all shadow-sm group"
            >
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold',
                isComplete ? 'bg-green-500/20' : accent.bgLight
              )}>
                {isComplete
                  ? <CheckCircle2 size={16} className="text-green-500" />
                  : <span className={accent.text}>{idx + 1}</span>}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-gray-900 dark:text-gray-100 font-medium text-sm group-hover:text-gray-900 dark:group-hover:text-gray-100">{lesson.title}</div>
                <div className="flex items-center gap-3 mt-0.5">
                  <div className="flex items-center gap-1">
                    <Clock size={11} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{lesson.estimatedMinutes} {t('common.min', 'min')}</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-500">·</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{lesson.concepts.length} {t('modulePage.concepts', 'concepts')}</span>
                  {lesson.exercises.length > 0 && (
                    <>
                      <span className="text-xs text-gray-600 dark:text-gray-500">·</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{lesson.exercises.length} {t('modulePage.exercises', 'exercises')}</span>
                    </>
                  )}
                </div>
              </div>

              <ChevronRight size={16} className="text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 flex-shrink-0" />
            </Link>
          );
        })}
      </div>

      {/* Mini Project */}
      {module.project && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">{t('modulePage.miniProject', 'Mini Project')}</h2>
          <Link to={`/module/${module.id}/project`}>
            <div className={cn(
              'flex items-center gap-4 p-4 rounded-xl border transition-all',
              `${accent.bgLight} border-${module.accentColor}/20 hover:bg-${module.accentColor}/10`
            )}>
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                <Hammer size={16} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900 dark:text-gray-100 font-medium text-sm">{module.project.title}</div>
                <div className="flex items-center gap-3 mt-0.5">
                  <div className="flex items-center gap-1">
                    <Clock size={11} className="text-gray-500 dark:text-gray-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">~{module.project.estimatedMinutes} {t('common.min', 'min')}</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-500">·</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{module.project.steps.length} {t('modulePage.steps', 'steps')}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-500">·</span>
                  <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">{t('modulePage.optional', 'Optional')}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />
            </div>
          </Link>
        </div>
      )}

      {/* Quiz section */}
      <div className="border-t border-surface-700 pt-6">
        <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-3">{t('modulePage.moduleQuiz', 'Module Quiz')}</h2>
        {allLessonsComplete ? (
          <Link to={`/module/${module.id}/quiz`}>
            <div className={cn(
              'flex items-center gap-4 p-4 rounded-xl border transition-all',
              bestScore !== null && bestScore >= 60
                ? 'bg-green-500/10 border-green-500/20 hover:bg-green-500/15'
                : `${accent.bgLight} border-${module.accentColor}/20 hover:bg-${module.accentColor}/10`
            )}>
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <Trophy size={16} className="text-amber-500 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900 dark:text-gray-100 font-medium text-sm">{t('modulePage.moduleQuiz', 'Module Quiz')}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  {bestScore !== null
                    ? `${t('modulePage.bestScore', 'Best score')}: ${bestScore}% — ${bestScore >= 60 ? '✓ ' + t('modulePage.passed', 'Passed') : t('modulePage.tryAgain', 'Try again to improve')}`
                    : t('modulePage.quizDesc', '8 questions · Pass with ≥60% to unlock next module')}
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />
            </div>
          </Link>
        ) : (
          <div className="flex items-center gap-4 p-4 rounded-xl border bg-surface-950 dark:bg-surface-900 border-surface-700 opacity-60 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-surface-600 flex items-center justify-center flex-shrink-0">
              <Lock size={14} className="text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400 font-medium text-sm">{t('modulePage.moduleQuiz', 'Module Quiz')}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{t('modulePage.completeAllLessons', 'Complete all lessons to unlock')}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
