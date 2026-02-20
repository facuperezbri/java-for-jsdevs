'use client';

import { ThemeProvider } from '@/src/context/ThemeContext';
import { ProgressProvider } from '@/src/context/ProgressContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ProgressProvider>
        {children}
      </ProgressProvider>
    </ThemeProvider>
  );
}
