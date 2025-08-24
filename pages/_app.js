import "@/styles/globals.css";
import Script from "next/script";

const isProd = process.env.VERCEL_ENV === "production";

export default function App({ Component, pageProps }) {
  return (
    <>
      {isProd && (
        <>
          {/* Imposta CONSENT MODE default 'denied' prima di AdSense */}
          <Script id="consent-default" strategy="beforeInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });
          `}</Script>

          <Script
            id="adsense-lib"
            strategy="afterInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2796727413305777"
            crossOrigin="anonymous"
          />
        </>
      )}
      <Component {...pageProps} />
    </>
  );
}