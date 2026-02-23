'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { BookOpen, CheckCircle2, Lock, ChevronRight, Trophy, Hammer, Sun, Moon, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { usePathCurriculum } from '../../data/curriculum';
import { isModuleUnlocked, getModuleProgress, getBestQuizScore, getModuleAccentClasses, getPathProgress } from '../../lib/utils';
import { ProgressBar } from '../ui/ProgressBar';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import { useSidebar } from '../../context/SidebarContext';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const { progress } = useProgress();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { isCollapsed, toggle } = useSidebar();
  const { i18n, t } = useTranslation();

  // Extract pathId from URL: /path/[pathId]/...
  const pathMatch = pathname.match(/\/path\/([^/]+)/);
  const pathId = pathMatch?.[1] ?? progress.activePath ?? 'java';

  const { CURRICULUM, path } = usePathCurriculum(pathId);

  const moduleId = pathname.match(/\/module\/([^/]+)/)?.[1];
  const lessonId = pathname.match(/\/lesson\/([^/]+)/)?.[1];

  const pp = getPathProgress(progress, pathId);
  const totalLessons = CURRICULUM.reduce((s, m) => s + m.lessons.length, 0);
  const completedLessons = CURRICULUM.reduce(
    (s, m) => s + (pp.modules[m.id]?.completedLessonIds.length ?? 0),
    0
  );
  const overallPercent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const appName = path?.title ?? t('sidebar.appName', 'Learning for Devs');

  // Collapsed icon rail
  if (isCollapsed && !onClose) {
    return (
      <div className="flex flex-col h-full bg-surface-1 border-r border-border-subtle w-16">
        {/* Logo mark */}
        <div className="flex items-center justify-center h-16 border-b border-border-subtle flex-shrink-0">
          <div className="p-1.5 bg-accent/10 rounded-lg">
            <BookOpen size={18} className="text-accent" />
          </div>
        </div>

        {/* Module icons */}
        <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin flex flex-col items-center gap-1">
          {CURRICULUM.map((mod) => {
            const unlocked = isModuleUnlocked(mod.order, CURRICULUM, progress, pathId);
            const { completed, total } = getModuleProgress(mod, progress, pathId);
            const isActiveModule = moduleId === mod.id;
            const isFullyComplete = completed === total && total > 0;

            return (
              <Link
                key={mod.id}
                href={unlocked ? `/path/${pathId}/module/${mod.id}` : '#'}
                onClick={unlocked ? onClose : undefined}
                title={mod.title}
                className={cn(
                  'w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-colors',
                  unlocked ? 'hover:bg-surface-2 cursor-pointer' : 'cursor-not-allowed opacity-40',
                  isActiveModule && 'bg-surface-2 ring-2 ring-accent/30'
                )}
              >
                {!unlocked ? (
                  <Lock size={14} className="text-text-muted" />
                ) : isFullyComplete ? (
                  <div className="relative">
                    <span>{mod.icon}</span>
                    <CheckCircle2 size={10} className="text-module-green absolute -bottom-0.5 -right-0.5" />
                  </div>
                ) : (
                  <span>{mod.icon}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom controls */}
        <div className="border-t border-border-subtle flex-shrink-0 flex flex-col items-center gap-2 py-3">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors"
            title={t('aria.toggleTheme', 'Toggle theme')}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={toggle}
            className="p-1.5 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors"
            title="Expand sidebar"
          >
            <PanelLeftOpen size={16} />
          </button>
          <UserButton afterSignOutUrl="/login" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-surface-1 border-r border-border-subtle w-72">
      {/* Header */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-border-subtle flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-accent/10 rounded-lg">
            <BookOpen size={18} className="text-accent" />
          </div>
          <div>
            <div className="font-display text-sm font-semibold text-text-primary leading-tight">{appName}</div>
            <div className="text-[10px] text-text-muted uppercase tracking-widest leading-tight">{t('sidebar.interactiveCourse', 'Interactive Course')}</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5 rounded-lg border border-border-subtle p-0.5">
            <button
              onClick={() => i18n.changeLanguage('en')}
              className={cn(
                'px-2 py-1 rounded text-base transition-all',
                i18n.language.startsWith('en')
                  ? 'bg-surface-2 opacity-100'
                  : 'opacity-50 hover:opacity-75'
              )}
              title="English"
            >
              🇺🇸
            </button>
            <button
              onClick={() => i18n.changeLanguage('es')}
              className={cn(
                'px-2 py-1 rounded text-base transition-all',
                i18n.language.startsWith('es')
                  ? 'bg-surface-2 opacity-100'
                  : 'opacity-50 hover:opacity-75'
              )}
              title="Español"
            >
              🇪🇸
            </button>
          </div>
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors"
            title={t('aria.toggleTheme', 'Toggle theme')}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {/* Collapse toggle -- desktop only */}
          {!onClose && (
            <button
              onClick={toggle}
              className="hidden md:flex p-1.5 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors"
              title="Collapse sidebar"
            >
              <PanelLeftClose size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Overall progress */}
      <div className="px-5 py-3 border-b border-border-subtle flex-shrink-0">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-text-tertiary">{t('sidebar.overallProgress', 'Overall Progress')}</span>
          <span className="text-xs text-text-secondary font-medium">{completedLessons}/{totalLessons} {t('sidebar.lessons', 'lessons')}</span>
        </div>
        <ProgressBar value={overallPercent} color="default" size="sm" />
      </div>

      {/* Module list */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin">
        {CURRICULUM.map((mod) => {
          const unlocked = isModuleUnlocked(mod.order, CURRICULUM, progress, pathId);
          const { completed, total, percent } = getModuleProgress(mod, progress, pathId);
          const bestScore = getBestQuizScore(mod.id, progress, pathId);
          const accent = getModuleAccentClasses(mod.accentColor);
          const isActiveModule = moduleId === mod.id;

          return (
            <div key={mod.id} className="mb-1">
              {/* Module header */}
              <Link
                href={unlocked ? `/path/${pathId}/module/${mod.id}` : '#'}
                onClick={unlocked ? onClose : undefined}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg transition-colors group relative',
                  unlocked ? 'hover:bg-surface-2 cursor-pointer' : 'cursor-not-allowed',
                  isActiveModule && !lessonId ? 'bg-surface-2 border-l-[3px] border-l-accent' : ''
                )}
              >
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-base', accent.bgLight)}>
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn('text-sm font-medium truncate', isActiveModule ? 'text-text-primary' : unlocked ? 'text-text-secondary group-hover:text-text-primary' : 'text-text-secondary')}>
                    {mod.title}
                  </div>
                  {unlocked && (
                    <div className="text-xs text-text-tertiary mt-0.5">
                      {completed}/{total} {t('sidebar.lessons', 'lessons')}
                    </div>
                  )}
                </div>
                {!unlocked ? (
                  <Lock size={14} className="text-text-muted flex-shrink-0" />
                ) : completed === total && total > 0 ? (
                  <CheckCircle2 size={14} className="text-module-green flex-shrink-0" />
                ) : (
                  <ChevronRight size={14} className="text-text-muted flex-shrink-0" />
                )}
              </Link>

              {/* Lessons — show when this module is active */}
              {isActiveModule && unlocked && (
                <div className="ml-4 mt-1 mb-2 space-y-0.5">
                  {mod.lessons.map((lesson) => {
                    const isLessonComplete = pp.modules[mod.id]?.completedLessonIds.includes(lesson.id) ?? false;
                    const isActiveLesson = lessonId === lesson.id;
                    return (
                      <Link
                        key={lesson.id}
                        href={`/path/${pathId}/module/${mod.id}/lesson/${lesson.id}`}
                        onClick={onClose}
                        className={cn(
                          'flex items-center gap-2.5 px-3 py-1.5 mx-2 rounded-md text-xs transition-colors',
                          isActiveLesson
                            ? `${accent.bgLight} ${accent.text} font-medium`
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                        )}
                      >
                        {isLessonComplete ? (
                          <CheckCircle2 size={12} className="text-module-green flex-shrink-0" />
                        ) : (
                          <div className={cn('w-3 h-3 rounded-full border flex-shrink-0', isActiveLesson ? accent.border : 'border-border')} />
                        )}
                        <span className="truncate">{lesson.title}</span>
                      </Link>
                    );
                  })}

                  {/* Project link */}
                  {mod.project && (
                    <Link
                      href={`/path/${pathId}/module/${mod.id}/project`}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-1.5 mx-2 rounded-md text-xs transition-colors',
                        pathname.endsWith('/project')
                          ? `${accent.bgLight} ${accent.text} font-medium`
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
                      )}
                    >
                      <Hammer size={12} className="flex-shrink-0" />
                      <span>{t('sidebar.miniProject', 'Mini Project')}</span>
                    </Link>
                  )}

                  {/* Quiz link */}
                  {completed === total && total > 0 && (
                    <Link
                      href={`/path/${pathId}/module/${mod.id}/quiz`}
                      onClick={onClose}
                      className={cn(
                        'flex items-center gap-2.5 px-3 py-1.5 mx-2 rounded-md text-xs transition-colors',
                        pathname.endsWith('/quiz')
                          ? `${accent.bgLight} ${accent.text} font-medium`
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
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
      <div className="px-5 py-3 border-t border-border-subtle flex-shrink-0 flex items-center justify-between">
        <Link href="/" onClick={onClose} className="text-xs text-text-tertiary hover:text-text-primary transition-colors">
          {t('sidebar.switchPath', '← All paths')}
        </Link>
        <UserButton afterSignOutUrl="/login" />
      </div>
    </div>
  );
}
