'use client';

import { BookOpen, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

export function LandingNav() {
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-page-bg/80 border-b border-border-subtle">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-accent/10 rounded-lg">
            <BookOpen size={18} className="text-accent" />
          </div>
          <span className="font-display font-semibold text-text-primary text-sm">
            {t('topBar.appName', 'Learning for Devs')}
          </span>
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
              aria-label="English"
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
              aria-label="Español"
            >
              🇪🇸
            </button>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors"
            aria-label={t('aria.toggleTheme', 'Toggle theme')}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
