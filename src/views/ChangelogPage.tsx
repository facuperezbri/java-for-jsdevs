'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CHANGELOG } from '@/src/data/changelog';
import { cn } from '@/src/lib/utils';

const typeColors: Record<string, string> = {
  feat: 'bg-module-green/20 text-module-green',
  fix: 'bg-module-blue/20 text-module-blue',
  refactor: 'bg-module-purple/20 text-module-purple',
  perf: 'bg-module-yellow/20 text-module-yellow',
  chore: 'bg-text-muted/20 text-text-muted',
};

export function ChangelogPage() {
  const { t } = useTranslation('ui');

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-text-tertiary hover:text-text-primary transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        {t('changelog.backToHome', 'Back to home')}
      </Link>

      <h1 className="font-display text-display-sm text-text-primary mb-2">
        {t('changelog.title', 'Changelog')}
      </h1>
      <p className="text-text-secondary text-sm mb-10">
        {t('changelog.subtitle', 'Summary of changes and improvements.')}
      </p>

      <div className="space-y-10">
        {CHANGELOG.map((entry) => (
          <section key={entry.version} className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-text-primary">
                {t('changelog.version', 'Version')} {entry.version}
              </span>
              <span className="text-xs text-text-muted">{entry.date}</span>
            </div>

            {entry.description && (
              <div className="rounded-lg bg-surface-2 border border-border-subtle px-4 py-3 text-sm text-text-secondary">
                {entry.description}
              </div>
            )}

            <ul className="space-y-2">
              {entry.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span
                    className={cn(
                      'shrink-0 px-1.5 py-0.5 rounded text-xs font-medium uppercase',
                      typeColors[change.type] ?? typeColors.chore
                    )}
                  >
                    {t(`changelog.types.${change.type}`, change.type)}
                  </span>
                  <span className="text-text-secondary">{change.title}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
