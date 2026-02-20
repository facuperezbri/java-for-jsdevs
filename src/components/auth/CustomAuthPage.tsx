'use client';

import * as React from 'react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import type { EmailCodeFactor, OAuthStrategy } from '@clerk/types';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import { staggerContainer, staggerItem, slideTransition } from '../../lib/motion';

function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <path
        style={{ fill: '#4285F4' }}
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        style={{ fill: '#34A853' }}
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        style={{ fill: '#FBBC05' }}
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        style={{ fill: '#EA4335' }}
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

type AuthMode = 'sign-in' | 'sign-up';

function getErrorMessage(err: unknown): string {
  if (err && typeof err === 'object' && 'errors' in err && Array.isArray((err as { errors: unknown[] }).errors)) {
    const first = (err as { errors: { longMessage?: string; message?: string }[] }).errors[0];
    return first?.longMessage || first?.message || 'Something went wrong';
  }
  return err instanceof Error ? err.message : 'Something went wrong';
}

export function CustomAuthPage() {
  const { isLoaded: signInLoaded, signIn, setActive: setSignInActive } = useSignIn();
  const { isLoaded: signUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const router = useRouter();
  const { theme } = useTheme();

  const [mode, setMode] = React.useState<AuthMode>('sign-in');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [code, setCode] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Sign-in: second factor (email code)
  const [showEmailCode, setShowEmailCode] = React.useState(false);

  // Sign-up: email verification
  const [verifying, setVerifying] = React.useState(false);

  const isLoaded = signInLoaded && signUpLoaded;

  const resetForm = () => {
    setError('');
    setCode('');
    setShowEmailCode(false);
    setVerifying(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;
    setError('');
    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setSignInActive!({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) return;
            router.push('/');
          },
        });
      } else if (signInAttempt.status === 'needs_second_factor') {
        const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor): factor is EmailCodeFactor => factor.strategy === 'email_code'
        );
        if (emailCodeFactor) {
          await signIn.prepareSecondFactor({
            strategy: 'email_code',
            emailAddressId: emailCodeFactor.emailAddressId,
          });
          setShowEmailCode(true);
        } else {
          setError('Second factor verification is required but email code is not available.');
        }
      } else {
        setError('Sign-in could not be completed. Please try again.');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailCodeSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;
    setError('');
    setLoading(true);
    try {
      const signInAttempt = await signIn.attemptSecondFactor({
        strategy: 'email_code',
        code,
      });

      if (signInAttempt.status === 'complete') {
        await setSignInActive!({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) return;
            router.push('/');
          },
        });
      } else {
        setError('Verification could not be completed. Please try again.');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;
    setError('');
    setLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });
      setVerifying(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifySignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;
    setError('');
    setLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setSignUpActive!({
          session: signUpAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) return;
            router.push('/');
          },
        });
      } else {
        setError('Verification could not be completed. Please try again.');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleModeSwitch = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  const handleSignInWithGoogle = () => {
    if (!isLoaded || !signIn) return;
    setError('');
    signIn
      .authenticateWithRedirect({
        strategy: 'oauth_google' as OAuthStrategy,
        redirectUrl: '/login/sso-callback',
        redirectUrlComplete: '/',
      })
      .catch((err) => setError(getErrorMessage(err)));
  };

  const showGoogleButton = (mode === 'sign-in' && !showEmailCode) || (mode === 'sign-up' && !verifying);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center gap-2 py-12 text-text-tertiary">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-java" />
        Loading...
      </div>
    );
  }

  const captchaTheme = theme === 'dark' ? 'dark' : 'light';

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      {/* Header */}
      <motion.div variants={staggerItem} className="flex items-center gap-2 mb-8">
        <div className="p-1.5 bg-java/10 rounded-lg">
          <BookOpen size={22} className="text-java" />
        </div>
        <h1 className="font-display text-xl font-bold text-text-primary">Java for JS Devs</h1>
      </motion.div>

      {/* Tabs with sliding indicator */}
      <motion.div variants={staggerItem} className="relative flex gap-1 p-1 rounded-lg bg-surface-2 mb-8">
        {mode === 'sign-in' && (
          <motion.div
            layoutId="auth-tab-indicator"
            className="absolute inset-y-1 left-1 right-1/2 rounded-md bg-java shadow-sm"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          />
        )}
        {mode === 'sign-up' && (
          <motion.div
            layoutId="auth-tab-indicator"
            className="absolute inset-y-1 left-1/2 right-1 rounded-md bg-java shadow-sm"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          />
        )}
        <button
          type="button"
          onClick={() => handleModeSwitch('sign-in')}
          className={cn(
            'relative z-10 flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors',
            mode === 'sign-in' ? 'text-white' : 'text-text-tertiary hover:text-text-primary'
          )}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => handleModeSwitch('sign-up')}
          className={cn(
            'relative z-10 flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors',
            mode === 'sign-up' ? 'text-white' : 'text-text-tertiary hover:text-text-primary'
          )}
        >
          Sign Up
        </button>
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mb-8 p-3 rounded-lg bg-module-red/5 border border-module-red/20 text-module-red text-sm">
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Google OAuth */}
      <motion.div variants={staggerItem}>
        {showGoogleButton && (
          <>
            <Button
              type="button"
              variant="secondary"
              className="w-full mb-6"
              onClick={handleSignInWithGoogle}
              disabled={loading}
            >
              <GoogleLogo size={20} />
              Continue with Google
            </Button>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-subtle" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-surface-1 px-2 text-text-tertiary">or continue with email</span>
              </div>
            </div>
          </>
        )}
      </motion.div>

      {/* Form content with slide transition */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            variants={slideTransition}
            initial="enter"
            animate="center"
            exit="exit"
            className="min-w-0"
          >
            {/* Sign-in: Email code verification */}
            {mode === 'sign-in' && showEmailCode && (
              <form onSubmit={handleEmailCodeSignIn}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-text-secondary mb-2">
                      Verification code
                    </label>
                    <p className="text-xs text-text-tertiary mb-2">
                      A verification code has been sent to your email.
                    </p>
                    <Input
                      id="code"
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-6" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify'}
                </Button>
              </form>
            )}

            {/* Sign-in: Email + password */}
            {mode === 'sign-in' && !showEmailCode && (
              <form onSubmit={handleSignIn} className="relative pb-20">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-6" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            )}

            {/* Sign-up: Email verification */}
            {mode === 'sign-up' && verifying && (
              <form onSubmit={handleVerifySignUp}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-text-secondary mb-2">
                      Verify your email
                    </label>
                    <p className="text-xs text-text-tertiary mb-2">
                      Enter the verification code sent to {email}
                    </p>
                    <Input
                      id="code"
                      type="text"
                      inputMode="numeric"
                      placeholder="Enter code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-6" disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify'}
                </Button>
              </form>
            )}

            {/* Sign-up: Email + password + CAPTCHA */}
            {mode === 'sign-up' && !verifying && (
              <form onSubmit={handleSignUp} className="relative pb-20">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-2">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full mt-6" disabled={loading}>
                  {loading ? 'Creating account...' : 'Create account'}
                </Button>
                <div id="clerk-captcha" data-cl-theme={captchaTheme} className="!absolute bottom-0" />
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
