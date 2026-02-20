import { Info, AlertTriangle, Lightbulb, Zap } from 'lucide-react';
import type { ConceptSection } from '../../types';
import { CodeComparison } from './CodeComparison';
import { CodeChallenge } from './CodeChallenge';
import { cn } from '../../lib/utils';

interface ConceptBlockProps {
  concept: ConceptSection;
  isChallengeComplete?: boolean;
  onChallengeComplete?: (id: string) => void;
}

const calloutConfig = {
  info: { icon: Info, bg: 'bg-blue-50 dark:bg-blue-900/30', border: 'border-blue-200 dark:border-blue-800/50', text: 'text-blue-800 dark:text-blue-300', iconColor: 'text-blue-600 dark:text-blue-400' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50 dark:bg-amber-900/30', border: 'border-amber-200 dark:border-amber-800/50', text: 'text-amber-800 dark:text-amber-300', iconColor: 'text-amber-600 dark:text-amber-400' },
  tip: { icon: Lightbulb, bg: 'bg-emerald-50 dark:bg-emerald-900/30', border: 'border-emerald-200 dark:border-emerald-800/50', text: 'text-emerald-800 dark:text-emerald-300', iconColor: 'text-emerald-600 dark:text-emerald-400' },
  gotcha: { icon: Zap, bg: 'bg-red-50 dark:bg-red-900/30', border: 'border-red-200 dark:border-red-800/50', text: 'text-red-800 dark:text-red-300', iconColor: 'text-red-600 dark:text-red-400' },
};

export function ConceptBlock({ concept, isChallengeComplete, onChallengeComplete }: ConceptBlockProps) {
  const callout = concept.callout ? calloutConfig[concept.callout.type] : null;
  const CalloutIcon = callout?.icon;

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{concept.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{concept.explanation}</p>
      </div>

      {concept.analogy && (
        <div className="flex gap-3 p-3 bg-surface-800 rounded-lg border border-surface-700 shadow-sm transition-transform duration-300 hover:scale-[1.01]">
          <span className="text-xl flex-shrink-0">💡</span>
          <p className="text-sm text-gray-700 dark:text-gray-300 italic">{concept.analogy}</p>
        </div>
      )}

      {concept.codeExample && (
        <CodeComparison example={concept.codeExample} />
      )}

      {concept.callout && callout && CalloutIcon && (
        <div className={cn('flex gap-3 p-3 rounded-lg border shadow-sm transition-transform duration-300 hover:scale-[1.01]', callout.bg, callout.border)}>
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
    </div>
  );
}
