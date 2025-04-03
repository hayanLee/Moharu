/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const pwaConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // 개발모드에서 비활성화
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['xjtudfjrlmweewncuyig.supabase.co'],
  },
};

export default pwaConfig(nextConfig);
