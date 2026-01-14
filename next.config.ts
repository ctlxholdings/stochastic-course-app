import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/risk-return/:path*',
        destination: 'https://risk-return-simulator.vercel.app/:path*',
      },
    ];
  },
};

export default nextConfig;
