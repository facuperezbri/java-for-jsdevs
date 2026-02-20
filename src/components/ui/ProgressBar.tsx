import { cn } from '../../lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  color?: 'blue' | 'purple' | 'green' | 'red' | 'default';
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ value, color = 'default', size = 'md', showLabel = false, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{Math.round(clamped)}%</span>
        </div>
      )}
      <div
        className={cn('w-full rounded-full bg-surface-700 overflow-hidden', {
          'h-1.5': size === 'sm',
          'h-2': size === 'md',
        })}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', {
            'bg-module-blue': color === 'blue',
            'bg-module-purple': color === 'purple',
            'bg-module-green': color === 'green',
            'bg-module-red': color === 'red',
            'bg-java': color === 'default',
          })}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
