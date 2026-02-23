'use client';

import { ThemeProvider } from '@/src/context/ThemeContext';
import { ProgressProvider } from '@/src/context/ProgressContext';
import { SidebarProvider } from '@/src/context/SidebarContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </ProgressProvider>
    </ThemeProvider>
  );
}
