import { cn } from '../../lib/utils';

interface ProgressBarProps {
  value: number; // 0-100
  color?: 'blue' | 'purple' | 'green' | 'red' | 'cyan' | 'default';
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
          <span className="text-xs text-text-secondary font-medium">{Math.round(clamped)}%</span>
        </div>
      )}
      <div
        className={cn('w-full rounded-full bg-surface-3 overflow-hidden', {
          'h-1.5': size === 'sm',
          'h-2': size === 'md',
        })}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r', {
            'from-module-blue/80 to-module-blue': color === 'blue',
            'from-module-purple/80 to-module-purple': color === 'purple',
            'from-module-green/80 to-module-green': color === 'green',
            'from-module-red/80 to-module-red': color === 'red',
            'from-module-cyan/80 to-module-cyan': color === 'cyan',
            'from-accent/80 to-accent': color === 'default',
          })}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
