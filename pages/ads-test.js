// pages/ads-test.js
import Head from "next/head";

export default function AdsTest() {
  return (
    <>
      <Head>
        {/* script globale AdSense (deve esserci anche in _document, tenerlo duplicato qui non fa male per test) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2796727413305777"
          crossOrigin="anonymous"
        />
      </Head>

      <div style={{ maxWidth: 740, margin: "40px auto", padding: 20, border: "1px solid #ccc" }}>
        <h1>Test AdSense inline</h1>
        <p>Qui sotto c'è lo slot creato in AdSense (sw_left 728x90). Nessun CSS custom.</p>

        {/* COPIA esatto dallo snippet AdSense (slot 728x90 che hai creato) */}
        <ins className="adsbygoogle"
             style={{ display: "block", width: 728, height: 90 }}
             data-ad-client="ca-pub-2796727413305777"
             data-ad-slot="1796807484" />
        <script dangerouslySetInnerHTML={{__html: `
          (adsbygoogle = window.adsbygoogle || []).push({});
        `}} />
      </div>
    </>
  );
}