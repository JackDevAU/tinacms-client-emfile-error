/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/admin',
                destination: '/admin/index.html',
            },
        ];
    },
    i18n: {
        locales: ['sv', 'en'],
        defaultLocale: 'sv',
    },
};

export default nextConfig;
