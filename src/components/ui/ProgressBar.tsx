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
            'from-module-blue/80 to-module-blue shadow-[0_0_6px_rgba(91,156,246,0.3)]': color === 'blue',
            'from-module-purple/80 to-module-purple shadow-[0_0_6px_rgba(184,122,255,0.3)]': color === 'purple',
            'from-module-green/80 to-module-green shadow-[0_0_6px_rgba(74,222,128,0.3)]': color === 'green',
            'from-module-red/80 to-module-red shadow-[0_0_6px_rgba(240,82,82,0.3)]': color === 'red',
            'from-java/80 to-java shadow-[0_0_6px_rgba(229,37,32,0.3)]': color === 'default',
          })}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
