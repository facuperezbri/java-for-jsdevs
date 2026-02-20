'use client';

import { Menu, BookOpen, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between h-14 px-4 bg-surface-1 border-b border-border-subtle md:hidden">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-2 transition-colors"
          aria-label={t('aria.openMenu', 'Open menu')}
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 ml-3">
          <div className="p-1 bg-java/10 rounded-lg">
            <BookOpen size={16} className="text-java" />
          </div>
          <span className="font-display font-semibold text-text-primary text-sm">{t('topBar.appName', 'Java for JS Devs')}</span>
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
    </header>
  );
}
