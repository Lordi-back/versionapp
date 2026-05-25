/** @type {import('next').NextConfig} */
const nextConfig = {
    // Настройка Webpack для игнорирования 'canvas' в клиентском коде
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                canvas: false,
                fs: false,
                path: false,
                os: false,
            };
        }
        return config;
    },
    images: {
        unoptimized: true,
    },
    output: 'export', // Делаем статический сайт для простоты
    trailingSlash: true,
};

module.exports = nextConfig;
