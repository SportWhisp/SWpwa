import Head from "next/head";

export default function AdsHardTest() {
  return (
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2796727413305777"
          crossOrigin="anonymous"
        />
      </Head>

      <div style={{ maxWidth: 740, margin: "40px auto", padding: 20, border: "1px solid #ccc" }}>
        <h1>AdSense Hard Test (unità inline pura)</h1>
        <p>Questo è lo snippet esatto dell’unità 728×90 (sw_left).</p>

        <ins className="adsbygoogle"
             style={{ display:"block", width:728, height:90 }}
             data-ad-client="ca-pub-2796727413305777"
             data-ad-slot="1796807484" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
          }}
        />
      </div>
    </>
  );
}