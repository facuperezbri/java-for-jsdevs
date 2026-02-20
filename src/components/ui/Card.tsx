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
          'bg-surface-1 border border-border-subtle shadow-editorial': variant === 'default',
          'bg-surface-1 border border-border-subtle shadow-editorial-lg': variant === 'elevated',
          'bg-transparent border border-border-subtle': variant === 'outlined',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
