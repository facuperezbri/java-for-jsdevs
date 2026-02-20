'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import type { i18n as I18nType } from 'i18next';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [i18nInstance, setI18nInstance] = useState<I18nType | null>(null);

  useEffect(() => {
    import('@/src/i18n').then(({ default: i18n }) => setI18nInstance(i18n));
  }, []);

  if (!i18nInstance) return null;

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
