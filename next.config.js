/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const { i18n } = require("./next-i18next.config.js");

const { loadCustomBuildParams } = require("./next-utils.config");
const { esmExternals = false, tsconfigPath } = loadCustomBuildParams();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals, // https://nextjs.org/blog/next-11-1#es-modules-support
  },
  i18n,
  reactStrictMode: true,
  typescript: {
    tsconfigPath,
  },
};

module.exports = nextConfig;
