import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'purple' | 'green' | 'red' | 'yellow' | 'gray';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'gray', size = 'md' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        {
          'bg-module-blue/10 text-module-blue border border-module-blue/20': variant === 'blue',
          'bg-module-purple/10 text-module-purple border border-module-purple/20': variant === 'purple',
          'bg-module-green/10 text-module-green border border-module-green/20': variant === 'green',
          'bg-module-red/10 text-module-red border border-module-red/20': variant === 'red',
          'bg-js/10 text-js-dark border border-js/20': variant === 'yellow',
          'bg-surface-2 text-text-secondary border border-border-subtle': variant === 'gray',
        },
        {
          'text-xs px-2 py-0.5': size === 'sm',
          'text-sm px-2.5 py-1': size === 'md',
        }
      )}
    >
      {children}
    </span>
  );
}
