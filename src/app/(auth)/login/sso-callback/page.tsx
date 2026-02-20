import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallbackPage() {
  return (
    <div className="grain min-h-screen flex flex-col items-center justify-center gap-4 bg-page-bg p-4">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-border-subtle border-t-java" />
      <p className="text-sm text-text-tertiary">Completing sign in...</p>
      <AuthenticateWithRedirectCallback
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
      />
    </div>
  );
}
