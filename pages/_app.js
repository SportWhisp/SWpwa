import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>

      <Head>
        {/* 👇 fondamentale per Safari iOS */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Script
        id="adsense-lib"
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2796727413305777"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </>
  );
}