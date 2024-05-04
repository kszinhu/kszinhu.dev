// eslint-disable-next-line import/no-unresolved
import withPlaiceholder from '@plaiceholder/next';

import i18nConfig from './next-i18next.config.js';
import { loadCustomBuildParams } from './next-utils.config.js';

const { i18n } = i18nConfig;
const { esmExternals = false, tsconfigPath } = loadCustomBuildParams();

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  experimental: {
    ...(esmExternals && { esmExternals }),
  },
  typescript: {
    tsconfigPath,
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    if (!isServer) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
    }

    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'placehold.co' },
      { hostname: 'picsum.photos' },
      { hostname: 'blox.education' },
      { hostname: '*.alboompro.com' },
    ],
  },
};

export default withPlaiceholder(nextConfig);
