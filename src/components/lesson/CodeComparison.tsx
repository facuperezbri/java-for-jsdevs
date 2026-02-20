import { useTranslation } from 'react-i18next';
import { CodeBlock } from './CodeBlock';
import type { CodeExample } from '../../types';

interface CodeComparisonProps {
  example: CodeExample;
}

export function CodeComparison({ example }: CodeComparisonProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* JavaScript side */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50/50 dark:bg-[#1a1a00] border border-[#f7df1e]/20 rounded-t-lg">
            <span className="text-sm">🟨</span>
            <span className="text-xs font-semibold text-yellow-700 dark:text-[#f7df1e] uppercase tracking-wider">{t('codeLabels.javascript', 'JavaScript')}</span>
          </div>
          <div className="rounded-t-none rounded-b-lg overflow-x-auto">
            <CodeBlock code={example.javascript} language="javascript" />
          </div>
        </div>

        {/* Java side */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50/50 dark:bg-[#1a0000] border border-java/20 rounded-t-lg">
            <span className="text-sm">☕</span>
            <span className="text-xs font-semibold text-red-700 dark:text-java uppercase tracking-wider">{t('codeLabels.java', 'Java')}</span>
          </div>
          <div className="rounded-t-none rounded-b-lg overflow-x-auto">
            <CodeBlock code={example.java} language="java" />
          </div>
        </div>
      </div>

      {example.caption && (
        <p className="text-sm text-gray-600 dark:text-gray-400 italic text-center px-4 py-2 bg-surface-800/50 rounded-lg border border-surface-700">
          {example.caption}
        </p>
      )}
    </div>
  );
}
