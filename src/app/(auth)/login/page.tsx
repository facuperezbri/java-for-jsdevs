import { BookOpen } from 'lucide-react';
import { CustomAuthPage } from '@/src/components/auth/CustomAuthPage';
import { LoginBrandingPanel } from '@/src/components/auth/LoginBrandingPanel';

export default function LoginPage() {
  return (
    <div className="grain min-h-screen bg-page-bg">
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Desktop: left branding panel (55%) */}
        <div className="hidden lg:flex lg:w-[55%] border-r border-border-subtle">
          <LoginBrandingPanel />
        </div>

        {/* Mobile: compact branded header */}
        <div className="lg:hidden px-6 pt-8 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-java/10 rounded-lg">
              <BookOpen size={20} className="text-java" />
            </div>
            <span className="font-display text-lg font-bold text-text-primary">
              Java for JS Devs
            </span>
          </div>
          <p className="text-sm text-text-secondary">
            Master Java by building on what you already know.
          </p>
          <div className="mt-4 h-0.5 w-12 rounded-full bg-gradient-to-r from-java to-js/40" />
        </div>

        {/* Right: auth form in elevated card */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <div className="bg-surface-1 border border-border-subtle shadow-editorial-lg rounded-2xl p-8 lg:p-10">
              <CustomAuthPage />
            </div>
            <p className="text-center text-xs text-text-muted mt-6">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
