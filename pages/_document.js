import { Html, Head, Main, NextScript } from "next/document";
import { useRouter } from "next/router";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="icon" href="/icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" id="manifest" />
        <meta
          property="description"
          content="Dynamic playable ads that generate a higher ROI and engagement for
            your sports media website or app."
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1479162116573574"
          crossorigin="anonymous"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-51CE0JP1N8`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-51CE0JP1N8');`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
