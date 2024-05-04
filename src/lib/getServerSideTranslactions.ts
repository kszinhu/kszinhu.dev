import type { SSRConfig, UserConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import nextI18nextConfig from '../../next-i18next.config';

export const getServerSideTranslations = async (
  locale?: string,
  namespaces?: string[],
  configOverride?: UserConfig,
  extraLocales?: string[] | false
): Promise<SSRConfig> => {
  const config = configOverride ?? nextI18nextConfig;

  return serverSideTranslations(
    locale ?? config.i18n.defaultLocale,
    namespaces,
    config,
    extraLocales
  );
};

export * from 'next-i18next';
