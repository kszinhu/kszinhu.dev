/* eslint-disable no-undef */
import path from "path";

/**
 * @type {import('next-i18next').UserConfig}
 */
const modules = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: process.env.NODE_ENV === "development",
  compatibilityJSON: "v4",
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en_us"],
  },
  localePath:
    typeof window === "undefined"
      ? path.resolve("./public/locales")
      : "/locales",

  reloadOnPrerender: process.env.NODE_ENV === "development",
};

export const i18n = modules.i18n;

export default modules;
