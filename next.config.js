/* eslint-disable no-undef */
import withPlaiceholder from "@plaiceholder/next";

import { i18n } from "./next-i18next.config.js";
import { loadCustomBuildParams } from "./next-utils.config.js";

const { esmExternals = false, tsconfigPath } = loadCustomBuildParams();

/** @type {import('next').NextConfig} */
export default withPlaiceholder({
  i18n,
  reactStrictMode: true,
  experimental: {
    esmExternals, // https://nextjs.org/blog/next-11-1#es-modules-support
  },
  typescript: {
    tsconfigPath,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "placehold.co" },
      { hostname: "picsum.photos" },
    ],
  },
});
