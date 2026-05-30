import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'http://localhost:3000/:path*', // Mengarah ke port NestJS backend lu
      },
    ];
  },
};

export default nextConfig;