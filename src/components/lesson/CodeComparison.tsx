'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { CodeBlock } from './CodeBlock';
import type { CodeExample } from '../../types';
import { cn } from '../../lib/utils';

interface CodeComparisonProps {
  example: CodeExample;
}

export function CodeComparison({ example }: CodeComparisonProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'js' | 'java'>('js');

  return (
    <div className="space-y-3">
      {/* Mobile tab switcher (below lg) */}
      <div className="flex lg:hidden gap-1 p-1 rounded-lg bg-surface-2 border border-border-subtle">
        <button
          onClick={() => setActiveTab('js')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors',
            activeTab === 'js'
              ? 'bg-js-muted text-js-dark border border-js/20'
              : 'text-text-tertiary hover:text-text-secondary'
          )}
        >
          <span className="w-2 h-2 rounded-full bg-js" />
          {t('codeLabels.javascript', 'JavaScript')}
        </button>
        <button
          onClick={() => setActiveTab('java')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors',
            activeTab === 'java'
              ? 'bg-java-glow text-java border border-java/20'
              : 'text-text-tertiary hover:text-text-secondary'
          )}
        >
          <span className="w-2 h-2 rounded-full bg-java" />
          {t('codeLabels.java', 'Java')}
        </button>
      </div>

      {/* Mobile: tabbed view */}
      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'js' ? (
            <motion.div
              key="js-mobile"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-xl border border-border-subtle overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-js-muted border-b border-js/20">
                  <span className="w-2 h-2 rounded-full bg-js" />
                  <span className="text-xs font-semibold text-js-dark uppercase tracking-wider">{t('codeLabels.javascript', 'JavaScript')}</span>
                </div>
                <CodeBlock code={example.javascript} language="javascript" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="java-mobile"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-xl border border-border-subtle overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-java-glow border-b border-java/20">
                  <span className="w-2 h-2 rounded-full bg-java" />
                  <span className="text-xs font-semibold text-java uppercase tracking-wider">{t('codeLabels.java', 'Java')}</span>
                </div>
                <CodeBlock code={example.java} language="java" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: side-by-side */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-3">
        {/* JavaScript side */}
        <div className="flex flex-col min-w-0 rounded-xl border border-border-subtle overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-js-muted border-b border-js/20">
            <span className="w-2 h-2 rounded-full bg-js" />
            <span className="text-xs font-semibold text-js-dark uppercase tracking-wider">{t('codeLabels.javascript', 'JavaScript')}</span>
          </div>
          <div className="overflow-x-auto">
            <CodeBlock code={example.javascript} language="javascript" />
          </div>
        </div>

        {/* Java side */}
        <div className="flex flex-col min-w-0 rounded-xl border border-border-subtle overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-java-glow border-b border-java/20">
            <span className="w-2 h-2 rounded-full bg-java" />
            <span className="text-xs font-semibold text-java uppercase tracking-wider">{t('codeLabels.java', 'Java')}</span>
          </div>
          <div className="overflow-x-auto">
            <CodeBlock code={example.java} language="java" />
          </div>
        </div>
      </div>

      {example.caption && (
        <p className="font-display text-sm text-text-secondary italic text-center px-4 py-2 bg-surface-2/50 rounded-lg border border-border-subtle">
          {example.caption}
        </p>
      )}
    </div>
  );
}
