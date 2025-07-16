/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // This will ignore ESLint during build
  },
  env: {
    NEXT_PUBLIC_COMPOUND_API_URL: process.env.NEXT_PUBLIC_COMPOUND_API_URL,
  },
};

module.exports = nextConfig;
