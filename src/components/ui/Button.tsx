import { cn } from '../../lib/utils';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-page-bg disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-java text-white hover:bg-java-700 hover:shadow-editorial active:scale-[0.98] focus-visible:ring-java shadow-sm': variant === 'primary',
          'bg-surface-1 text-text-primary hover:bg-surface-2 border border-border focus-visible:ring-border shadow-sm': variant === 'secondary',
          'text-text-secondary hover:text-text-primary hover:bg-surface-2 focus-visible:ring-border': variant === 'ghost',
          'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] focus-visible:ring-red-500 shadow-sm': variant === 'danger',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
