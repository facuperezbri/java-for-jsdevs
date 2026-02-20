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
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-2 border-green-400 dark:border-green-600'
                  : isCurrent
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-2 border-blue-400 dark:border-blue-600 ring-2 ring-blue-200 dark:ring-blue-800/50'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              {isComplete ? <CheckCircle2 size={14} /> : i + 1}
            </button>
            {i < totalSteps - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-1',
                  isComplete ? 'bg-green-300 dark:bg-green-700' : 'bg-gray-200 dark:bg-gray-700'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
