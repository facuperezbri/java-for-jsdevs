import { cn } from '../../lib/utils';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
}

export function Card({ variant = 'default', className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl',
        {
          'bg-surface-800 border border-surface-700 shadow-sm': variant === 'default',
          'bg-surface-800 border border-surface-700 shadow-md shadow-zinc-200/50': variant === 'elevated',
          'bg-transparent border border-surface-700': variant === 'outlined',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
