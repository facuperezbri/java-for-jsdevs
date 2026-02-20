import { Link, useLocation, useParams } from 'react-router-dom';
import { BookOpen, CheckCircle2, Lock, ChevronRight, Trophy, Hammer } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { useCurriculum } from '../../data/curriculum';
import { isModuleUnlocked, getModuleProgress, getBestQuizScore, getModuleAccentClasses } from '../../lib/utils';
import { ProgressBar } from '../ui/ProgressBar';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const { progress } = useProgress();
  const location = useLocation();
  const { moduleId, lessonId } = useParams();
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();
  const { CURRICULUM } = useCurriculum();

  const totalLessons = CURRICULUM.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = CURRICULUM.reduce(
    (s, m) => s + (progress.modules[m.id]?.completedLessonIds.length ?? 0),
    0
  );
  const overallPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="flex flex-col h-full bg-surface-900 border-r border-surface-700 w-72 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-surface-700 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <BookOpen size={20} className="text-java" />
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">{t('sidebar.appName', 'Java for JS Devs')}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{t('sidebar.interactiveCourse', 'Interactive Course')}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es')}
            className="px-2 py-1 rounded-md text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-surface-800 dark:hover:text-gray-100 transition-colors"
            title={t('aria.toggleLanguage', 'Toggle language')}
          >
            {i18n.language.startsWith('es') ? 'ES' : 'EN'}
          </button>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-surface-800 dark:hover:text-gray-100 transition-colors"
            title={t('aria.toggleTheme', 'Toggle theme')}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>

      {/* Overall progress */}
      <div className="px-5 py-3 border-b border-surface-700 flex-shrink-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400">{t('sidebar.overallProgress', 'Overall Progress')}</span>
          <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{completedLessons}/{totalLessons} {t('sidebar.lessons', 'lessons')}</span>
        </div>
        <ProgressBar value={overallPercent} color="default" size="sm" />
      </div>

      {/* Module list */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {CURRICULUM.map((mod) => {
          const unlocked = isModuleUnlocked(mod.order, CURRICULUM, progress);
          const { completed, total, percent } = getModuleProgress(mod, progress);
          const bestScore = getBestQuizScore(mod.id, progress);
          const accent = getModuleAccentClasses(mod.accentColor);
          const isActiveModule = moduleId === mod.id;

          return (
            <div key={mod.id} className="mb-1">
              {/* Module header */}
              <Link
                to={unlocked ? `/module/${mod.id}` : '#'}
                onClick={unlocked ? onClose : undefined}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors group',
                  unlocked ? 'hover:bg-surface-800 cursor-pointer' : 'cursor-not-allowed opacity-50',
                  isActiveModule && !lessonId ? 'bg-surface-800' : ''
                )}
              >
                <span className="text-base">{mod.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={cn('text-sm font-medium truncate', isActiveModule ? 'text-gray-900 dark:text-gray-100' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100')}>
                    {mod.title}
                  </div>
                  {unlocked && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {completed}/{total} {t('sidebar.lessons', 'lessons')}
                    </div>
                  )}
                </div>
                {!unlocked ? (
                  <Lock size={14} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
                ) : completed === total && total > 0 ? (
                  <CheckCircle2 size={14} className="text-green-400 flex-shrink-0" />
                ) : (
                  <ChevronRight size={14} className="text-gray-600 dark:text-gray-400 flex-shrink-0" />
                )}
              </Link>

              {/* Lessons — show when this module is active */}
              {isActiveModule && unlocked && (
                <div className="ml-4 mt-1 mb-2 space-y-0.5">
                  {mod.lessons.map((lesson) => {
                    const isLessonComplete = progress.modules[mod.id]?.completedLessonIds.includes(lesson.id);
                    const isActiveLesson = lessonId === lesson.id;
                    return (
                      <Link
                        key={lesson.id}
                        to={`/module/${mod.id}/lesson/${lesson.id}`}
                        onClick={onClose}
                        className={cn(
                          'flex items-center gap-2.5 px-3 py-1.5 mx-2 rounded-md text-xs transition-colors',
                          isActiveLesson
                            ? `${accent.bgLight} ${accent.text} font-medium animate-[pulse_1.5s_ease-in-out_1]`
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-surface-800'
                        )}
                      >
                        {isLessonComplete ? (
                          <CheckCircle2 size={12} className="text-green-400 flex-shrink-0" />
                        ) : (
                          <div className={cn('w-3 h-3 rounded-full border flex-shrink-0', isActiveLesson ? accent.border : 'border-surface-600')} />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    );
                  })}

                  {/* Project link */}
                  {mod.project && (
                    <Link
                      to={`/module/${mod.id}/project`}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-1.5 mx-2 rounded-md text-xs transition-colors',
                        location.pathname.endsWith('/project')
                          ? `${accent.bgLight} ${accent.text} font-medium`
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-surface-800'
                      )}
                    >
                      <Hammer size={12} className="flex-shrink-0" />
                      <span>{t('sidebar.miniProject', 'Mini Project')}</span>
                    </Link>
                  )}

                  {/* Quiz link */}
                  {completed === total && total > 0 && (
                    <Link
                      to={`/module/${mod.id}/quiz`}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-1.5 mx-2 rounded-md text-xs transition-colors',
                        location.pathname.endsWith('/quiz')
                          ? `${accent.bgLight} ${accent.text} font-medium`
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-surface-800'
                      )}
                    >
                      <Trophy size={12} className="flex-shrink-0" />
                      <span>{t('sidebar.moduleQuiz', 'Module Quiz')} {bestScore !== null ? `(${t('modulePage.bestScore', 'Best score')}: ${bestScore}%)` : ''}</span>
                    </Link>
                  )}
                </div>
              )}

              {/* Module progress bar */}
              {unlocked && completed > 0 && (
                <div className="px-6 pb-1">
                  <ProgressBar value={percent} color={mod.accentColor} size="sm" />
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-surface-700 flex-shrink-0">
        <Link to="/" onClick={onClose} className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          {t('sidebar.backToRoadmap', '← Back to Roadmap')}
        </Link>
      </div>
    </div>
  );
}
