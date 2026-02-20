import { Menu, BookOpen, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('es') ? 'en' : 'es');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between h-14 px-4 bg-surface-900 border-b border-surface-700 md:hidden">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-surface-800 dark:hover:text-gray-100 transition-colors"
          aria-label={t('aria.openMenu', 'Open menu')}
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 ml-3">
          <BookOpen size={18} className="text-java" />
          <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{t('topBar.appName', 'Java for JS Devs')}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={toggleLanguage}
          className="px-2 py-1.5 rounded-lg text-xs font-bold text-gray-500 hover:text-gray-900 hover:bg-surface-800 dark:hover:text-gray-100 transition-colors"
          aria-label={t('aria.toggleLanguage', 'Toggle language')}
        >
          {i18n.language.startsWith('es') ? 'ES' : 'EN'}
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-surface-800 dark:hover:text-gray-100 transition-colors"
          aria-label={t('aria.toggleTheme', 'Toggle theme')}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
