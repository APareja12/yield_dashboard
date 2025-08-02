/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  ...(process.env.NODE_ENV === 'production' && { trailingSlash: true }),

  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_COMPOUND_API_URL: process.env.NEXT_PUBLIC_COMPOUND_API_URL,
  },
};

module.exports = nextConfig;
