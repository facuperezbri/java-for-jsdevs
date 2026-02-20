import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-syntax-highlighter'],
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
