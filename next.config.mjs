import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['cdn.jsdelivr.net'],
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion'],
    },
};

export default withNextIntl(nextConfig);
