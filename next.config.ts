import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: process.env.DOCKER_BUILD ? 'standalone' : undefined,

  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },

  images: {
    domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
    formats: ['image/webp', 'image/avif'],
  },

  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
      ],
    },
  ],

  poweredByHeader: false,
}

export default nextConfig
