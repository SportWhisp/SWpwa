import "@/styles/globals.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <>
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