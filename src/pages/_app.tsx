import { useState } from "react";

import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import themeOverride from "@modules/config/theme";
import { StoreProvider } from "@modules/store/provider";
import { getCookie, setCookie } from "cookies-next";
import { NextPage } from "next";
import { appWithTranslation, useTranslation } from "next-i18next";
import NextApp, { AppProps, AppContext, AppInitialProps } from "next/app";
import Head from "next/head";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type FullyAppProps = AppPropsWithLayout &
  AppInitialProps & {
    colorScheme: ColorScheme;
  };

const App = (props: FullyAppProps) => {
  const { Component, pageProps } = props;

  const { t } = useTranslation("document");
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );
  const getLayout = Component.getLayout ?? ((page) => page);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  };

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <link rel='shortcut icon' href='/favicon.svg' />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ ...themeOverride, colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <StoreProvider>
            {getLayout(<Component {...pageProps} />)}
            <Notifications />
          </StoreProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie("mantine-color-scheme", appContext.ctx) || "dark",
  };
};

export default appWithTranslation(App);
