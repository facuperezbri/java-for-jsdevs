import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Providers } from './providers';
import { I18nProvider } from './I18nProvider';

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
    <html lang="en" suppressHydrationWarning>
      <body>
        {publishableKey ? (
          <ClerkProvider publishableKey={publishableKey}>
            <I18nProvider>
              <Providers>
                {children}
              </Providers>
            </I18nProvider>
          </ClerkProvider>
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-8">
            <div className="max-w-md text-center">
              <h1 className="text-xl font-semibold mb-2">Setup Required</h1>
              <p className="text-gray-400 mb-4">
                Copy <code className="bg-gray-800 px-2 py-1 rounded">.env.example</code> to <code className="bg-gray-800 px-2 py-1 rounded">.env.local</code> and add your Clerk and Neon keys.
              </p>
              <p className="text-sm text-gray-500">
                Get keys at <a href="https://clerk.com" className="text-blue-400 hover:underline">clerk.com</a> and <a href="https://neon.tech" className="text-blue-400 hover:underline">neon.tech</a>
              </p>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
