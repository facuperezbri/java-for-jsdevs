import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'purple' | 'green' | 'red' | 'yellow' | 'gray' | 'cyan';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'gray', size = 'md' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        {
          'bg-module-blue/10 text-module-blue': variant === 'blue',
          'bg-module-purple/10 text-module-purple': variant === 'purple',
          'bg-module-green/10 text-module-green': variant === 'green',
          'bg-module-red/10 text-module-red': variant === 'red',
          'bg-js/10 text-js-dark': variant === 'yellow',
          'bg-module-cyan/10 text-module-cyan': variant === 'cyan',
          'bg-surface-2 text-text-secondary': variant === 'gray',
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
