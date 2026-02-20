import { CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ProjectProgressProps {
  totalSteps: number;
  currentStep: number;
  completedStepIndices: Set<number>;
  onStepClick: (index: number) => void;
}

export function ProjectProgress({ totalSteps, currentStep, completedStepIndices, onStepClick }: ProjectProgressProps) {
  return (
    <div className="flex items-center gap-1 w-full">
      {Array.from({ length: totalSteps }, (_, i) => {
        const isComplete = completedStepIndices.has(i);
        const isCurrent = i === currentStep;

        return (
          <div key={i} className="flex items-center flex-1">
            <button
              onClick={() => onStepClick(i)}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all flex-shrink-0',
                isComplete
                  ? 'bg-module-green/10 text-module-green border-2 border-module-green/30'
                  : isCurrent
                    ? 'bg-module-blue/10 text-module-blue border-2 border-module-blue/30 ring-2 ring-module-blue/20 ring-offset-2 ring-offset-page-bg'
                    : 'bg-surface-2 text-text-muted border border-border hover:bg-surface-3'
              )}
            >
              {isComplete ? <CheckCircle2 size={14} /> : i + 1}
            </button>
            {i < totalSteps - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-1',
                  isComplete ? 'bg-module-green/30' : 'bg-border-subtle'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
