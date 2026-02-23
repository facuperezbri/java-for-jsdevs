import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-syntax-highlighter'],
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  async redirects() {
    return [
      // Legacy URLs: /module/X → /path/java/module/X
      {
        source: '/module/:moduleId',
        destination: '/path/java/module/:moduleId',
        permanent: true,
      },
      {
        source: '/module/:moduleId/lesson/:lessonId',
        destination: '/path/java/module/:moduleId/lesson/:lessonId',
        permanent: true,
      },
      {
        source: '/module/:moduleId/quiz',
        destination: '/path/java/module/:moduleId/quiz',
        permanent: true,
      },
      {
        source: '/module/:moduleId/project',
        destination: '/path/java/module/:moduleId/project',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
