'use client';

import { Info, AlertTriangle, Lightbulb, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ConceptSection } from '../../types';
import { CodeComparison } from './CodeComparison';
import { CodeChallenge } from './CodeChallenge';
import { cn } from '../../lib/utils';
import { staggerItem } from '../../lib/motion';

interface ConceptBlockProps {
  concept: ConceptSection;
  isChallengeComplete?: boolean;
  onChallengeComplete?: (id: string) => void;
}

const calloutConfig = {
  info: { icon: Info, border: 'border-l-module-blue', bg: 'bg-module-blue/5', text: 'text-text-secondary', iconColor: 'text-module-blue' },
  warning: { icon: AlertTriangle, border: 'border-l-amber-500', bg: 'bg-amber-500/5', text: 'text-text-secondary', iconColor: 'text-amber-500' },
  tip: { icon: Lightbulb, border: 'border-l-module-green', bg: 'bg-module-green/5', text: 'text-text-secondary', iconColor: 'text-module-green' },
  gotcha: { icon: Zap, border: 'border-l-java', bg: 'bg-java/5', text: 'text-text-secondary', iconColor: 'text-java' },
};

export function ConceptBlock({ concept, isChallengeComplete, onChallengeComplete }: ConceptBlockProps) {
  const callout = concept.callout ? calloutConfig[concept.callout.type] : null;
  const CalloutIcon = callout?.icon;

  return (
    <motion.div
      variants={staggerItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="space-y-4"
    >
      <div>
        <h3 className="font-display text-display-sm text-text-primary mb-2">{concept.title}</h3>
        <p className="text-text-secondary leading-reading">{concept.explanation}</p>
      </div>

      {concept.analogy && (
        <div className="flex gap-3 p-3 border-l-2 border-java/30 bg-surface-2/50 rounded-r-lg">
          <span className="text-xl flex-shrink-0">💡</span>
          <p className="text-sm text-text-secondary italic">{concept.analogy}</p>
        </div>
      )}

      {concept.codeExample && (
        <CodeComparison example={concept.codeExample} />
      )}

      {concept.callout && callout && CalloutIcon && (
        <div className={cn('flex gap-3 p-3 rounded-r-lg border-l-[3px]', callout.border, callout.bg)}>
          <CalloutIcon size={16} className={cn('flex-shrink-0 mt-0.5', callout.iconColor)} />
          <p className={cn('text-sm', callout.text)}>{concept.callout.text}</p>
        </div>
      )}

      {concept.challenge && onChallengeComplete && (
        <CodeChallenge
          challenge={concept.challenge}
          isComplete={isChallengeComplete ?? false}
          onComplete={onChallengeComplete}
        />
      )}
    </motion.div>
  );
}
