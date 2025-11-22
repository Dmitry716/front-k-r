import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    domains: ['localhost', 'k-r.by'],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
  // Отключаем восстановление скролла
  experimental: {
    scrollRestoration: false,
  },
  // Добавляем поддержку статических файлов
  async rewrites() {
    return [
      {
        source: '/promo/:path*',
        destination: '/promo/:path*',
      },
      {
        source: '/accessories/:path*',
        destination: '/accessories/:path*',
      },
    ];
  },
};

export default nextConfig;
