import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { cn } from '../../lib/utils';

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-surface-950 text-gray-900 dark:text-gray-100">
      {/* Mobile top bar */}
      <TopBar onMenuClick={() => setSidebarOpen(true)} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:hidden',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Desktop layout */}
      <div className="md:flex md:h-screen md:overflow-hidden">
        {/* Desktop sidebar - always visible */}
        <div className="hidden md:flex md:flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto pt-14 md:pt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
