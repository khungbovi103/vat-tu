import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: false,
    transpilePackages: ['antd'],
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/app')],
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    compiler: {
        styledComponents: true,
    },
    optimizeFonts: true,
    compress: true,
    // experimental: {
    //     esmExternals: 'loose', // Enables ESM support
    // },
};

export default nextConfig;
