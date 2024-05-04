const path = require('path');

/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  // https://www.i18next.com/overview/configuration-options#logging
  debug: process.env.NODE_ENV === 'development',
  compatibilityJSON: 'v4',
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
  },

  fallbackLng: false,
  localePath: typeof window === 'undefined' ? path.resolve('./public/locales') : './locales',

  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
