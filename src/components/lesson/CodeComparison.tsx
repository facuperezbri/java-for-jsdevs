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
  const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');

  const leftLabel = example.left.label;
  const rightLabel = example.right.label;

  return (
    <div className="space-y-3 lg:-mx-8">
      {/* Mobile tab switcher (below lg) */}
      <div className="flex lg:hidden gap-1 p-1 rounded-lg bg-surface-2 border border-border-subtle">
        <button
          onClick={() => setActiveTab('left')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors',
            activeTab === 'left'
              ? 'bg-surface-1 text-text-primary'
              : 'text-text-tertiary hover:text-text-secondary'
          )}
        >
          <span className="w-2 h-2 rounded-full bg-js" />
          {leftLabel}
        </button>
        <button
          onClick={() => setActiveTab('right')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-colors',
            activeTab === 'right'
              ? 'bg-surface-1 text-text-primary'
              : 'text-text-tertiary hover:text-text-secondary'
          )}
        >
          <span className="w-2 h-2 rounded-full bg-java" />
          {rightLabel}
        </button>
      </div>

      {/* Mobile: tabbed view */}
      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'left' ? (
            <motion.div
              key="left-mobile"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-xl border border-border-subtle overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-2 border-b border-border-subtle">
                  <span className="w-2 h-2 rounded-full bg-js" />
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{leftLabel}</span>
                </div>
                <CodeBlock code={example.left.code} language={example.left.language} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="right-mobile"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="rounded-xl border border-border-subtle overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-2 border-b border-border-subtle">
                  <span className="w-2 h-2 rounded-full bg-java" />
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{rightLabel}</span>
                </div>
                <CodeBlock code={example.right.code} language={example.right.language} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: side-by-side */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-3">
        {/* Left side */}
        <div className="flex flex-col min-w-0 rounded-xl border border-border-subtle overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-2 border-b border-border-subtle">
            <span className="w-2 h-2 rounded-full bg-js" />
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{leftLabel}</span>
          </div>
          <div className="overflow-x-auto">
            <CodeBlock code={example.left.code} language={example.left.language} />
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col min-w-0 rounded-xl border border-border-subtle overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-2 border-b border-border-subtle">
            <span className="w-2 h-2 rounded-full bg-java" />
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{rightLabel}</span>
          </div>
          <div className="overflow-x-auto">
            <CodeBlock code={example.right.code} language={example.right.language} />
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
