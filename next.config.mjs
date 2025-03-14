/** @type {import('next').NextConfig} */

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
    loader: 'custom',
    loaderFile: './src/supabase/supabaseLoader.ts',
  },
};

export default nextConfig;
