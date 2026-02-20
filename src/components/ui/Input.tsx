import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ error, className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-lg border px-4 py-2.5 text-sm transition-colors',
          'bg-surface-1 text-text-primary',
          'placeholder:text-text-muted',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error
            ? 'border-red-500 focus-visible:ring-red-500'
            : 'border-border focus-visible:ring-java hover:border-border-subtle',
          className
        )}
        {...props}
      />
    );
  }
);
