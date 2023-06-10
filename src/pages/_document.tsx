import { ServerStyles, createStylesServer } from "@mantine/next";
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

import i18nextConfig from "../../next-i18next.config";

const stylesServer = createStylesServer();

export default class _Document extends Document {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
    return (
      <Html lang={currentLocale}>
        <Head>
          <meta charSet='utf-8' />
          <meta name='theme-color' content='#ffffff' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='icon' href='/favicon.ico' />
          <link rel='apple-touch-icon' href='/logo_192.png' />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
        </Head>
        <body>
          <Main />
          <NextScript />
          <ServerStyles server={stylesServer} html='body' />
        </body>
      </Html>
    );
  }

  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const currentLocale = ctx.locale || i18nextConfig.i18n.defaultLocale;

    return {
      ...initialProps,
      locale: currentLocale,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key='styles'
        />,
      ],
    };
  }
}
