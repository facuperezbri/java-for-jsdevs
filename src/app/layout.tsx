import type { Metadata } from 'next';
import { Fraunces, DM_Sans, JetBrains_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Providers } from './providers';
import { I18nProvider } from './I18nProvider';
import { ChatWidget } from '@/src/components/chat/ChatWidget';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Java for JS Devs',
  description: 'Interactive course for JavaScript developers learning Java',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans">
        {publishableKey ? (
          <ClerkProvider publishableKey={publishableKey}>
            <I18nProvider>
              <Providers>
                {children}
                <ChatWidget />
              </Providers>
            </I18nProvider>
          </ClerkProvider>
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-page-bg text-text-primary p-8">
            <div className="max-w-md text-center">
              <h1 className="text-xl font-semibold mb-2">Setup Required</h1>
              <p className="text-text-secondary mb-4">
                Copy <code className="bg-surface-2 px-2 py-1 rounded">.env.example</code> to <code className="bg-surface-2 px-2 py-1 rounded">.env.local</code> and add your Clerk and Neon keys.
              </p>
              <p className="text-sm text-text-tertiary">
                Get keys at <a href="https://clerk.com" className="text-module-blue hover:underline">clerk.com</a> and <a href="https://neon.tech" className="text-module-blue hover:underline">neon.tech</a>
              </p>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
