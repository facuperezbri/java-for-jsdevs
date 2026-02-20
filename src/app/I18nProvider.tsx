'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import type { i18n as I18nType } from 'i18next';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [i18nInstance, setI18nInstance] = useState<I18nType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    
    import('@/src/i18n')
      .then(({ default: i18n }) => {
        if (!cancelled) {
          setI18nInstance(i18n);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Failed to load i18n:', err);
          setError(err);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    // If i18n fails to load, render children anyway (they'll use fallback strings)
    return <>{children}</>;
  }

  if (!i18nInstance) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page-bg">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-java" />
      </div>
    );
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
