import '@mantine/core/styles.css';
import '../../public/global.css';

import { NextPage } from 'next';
import NextApp, { AppProps, AppContext, AppInitialProps } from 'next/app';
import Head from 'next/head';

import { localStorageColorSchemeManager, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme as AppTheme } from '@modules/config/theme';
import { StoreProvider } from '@modules/store/provider';

import { appWithTranslation, useTranslation } from '@lib/getServerSideTranslactions';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type FullyAppProps = AppPropsWithLayout & AppInitialProps;

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'portfolio-color-scheme',
});

const App = (props: FullyAppProps) => {
  const { Component, pageProps } = props;

  const { t } = useTranslation('document');
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        colorSchemeManager={colorSchemeManager}
        defaultColorScheme="dark"
        theme={AppTheme}
      >
        <StoreProvider>
          {getLayout(<Component {...pageProps} />)}
          <Notifications />
        </StoreProvider>
      </MantineProvider>
    </>
  );
};

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  return {
    ...appProps,
  };
};

export default appWithTranslation(App);
