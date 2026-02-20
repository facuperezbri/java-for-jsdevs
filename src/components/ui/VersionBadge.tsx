'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { APP_VERSION } from '@/src/data/changelog';

export function VersionBadge() {
  const { t } = useTranslation('ui');

  return (
    <Link
      href="/changelog"
      className="text-xs text-text-tertiary hover:text-text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-java focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1 rounded"
      title={t('changelog.viewChangelog', 'View changelog')}
    >
      v{APP_VERSION}
    </Link>
  );
}
