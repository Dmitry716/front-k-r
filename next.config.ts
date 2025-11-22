import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Таргетинг на современные браузеры - отключаем полифилы через SWC
  transpilePackages: [],
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
  // Настройки для современных браузеров
  env: {
    BROWSERSLIST_ENV: 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'k-r.by',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
  // Отключаем восстановление скролла
  experimental: {
    scrollRestoration: false,
    optimizeCss: true, // Оптимизация CSS для уменьшения критического пути
    optimizePackageImports: ['react-icons'], // Tree-shaking для иконок
    cssChunking: 'strict', // Строгое разделение CSS для оптимизации загрузки
    swcPlugins: [],
  },
  // Настройка компилятора для современных браузеров (SWC)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true,
  // Минимальная целевая версия JS для современных браузеров
  webpack: (config, { isServer, webpack }) => {
    // Отключаем полифилы для современных браузеров
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // Отключаем core-js полифилы
      'core-js': false,
      'core-js/modules': false,
    };
    
    if (!isServer) {
      // Агрессивная оптимизация для клиентской сборки
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunks для библиотек
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
            },
            // React и React-DOM отдельно
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              name: 'react',
              priority: 30,
              reuseExistingChunk: true,
            },
            // Next.js runtime
            next: {
              test: /[\\/]node_modules[\\/]next[\\/]/,
              name: 'next',
              priority: 25,
              reuseExistingChunk: true,
            },
            // Общий код между страницами
            common: {
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  // Оптимизация для production
  poweredByHeader: false,
  compress: true,
  // Минимизация и оптимизация
  productionBrowserSourceMaps: false,
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
