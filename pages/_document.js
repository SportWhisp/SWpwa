import { Html, Head, Main, NextScript } from "next/document";

const isProd = process.env.VERCEL_ENV === "production";

export default function Document() {
  return (
    <Html lang="it">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/Logo.png" />

        {isProd && (
          <>
            {/* Consent Mode: default 'denied' PRIMA del tag AdSense */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('consent','default',{
                    ad_storage:'denied',
                    ad_user_data:'denied',
                    ad_personalization:'denied',
                    analytics_storage:'denied'
                  });
                `,
              }}
            />
            {/* Tag AdSense richiesto da Google (nel <head>) */}
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2796727413305777"
              crossOrigin="anonymous"
            ></script>
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}