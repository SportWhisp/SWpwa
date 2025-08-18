import React from "react";
import Layout from "../../components/Layout";
import Head from "next/head";
import Banner from "../../components/Banner";

export default function Commenti() {
  return (
    <Layout>
      <Head>
        <title>Commenti sui WHISP passati | SportWhisp</title>
        <meta
          name="description"
          content="Commenti e analisi settimanali sui WHISP: valutazioni sull'accuratezza dei pronostici e riflessioni sul rendimento."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sportwhisp.it/commenti" />
        <meta property="og:title" content="Commenti sui WHISP passati | SportWhisp" />
        <meta
          property="og:description"
          content="Analisi dei WHISP delle settimane precedenti: cosa ha funzionato e cosa no, con riflessioni personalizzate."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sportwhisp.it/commenti" />
        <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
      </Head>

      <h1>Commenti sui WHISP passati</h1>
      <p>
        In questa sezione trovi un <strong>resoconto personale</strong> sui WHISP delle
        settimane precedenti: valutazioni sull’accuratezza, riflessioni e spunti per
        interpretare al meglio le prossime giornate.
      </p>

      <Banner position="top" />

      {/* 🔵 INSERISCI QUI IL TUO COMMENTO SETTIMANALE 🔵 */}
      <section style={{ marginTop: 24 }}>
        <h2>Settimana 1 – Ligue 1</h2>
        <p>
          I WHISP della prima giornata di Ligue 1 hanno mostrato una buona precisione
          sugli esiti <strong>1X2</strong>, in particolare nelle partite casalinghe.
          Più incerti invece gli <em>Over 2.5</em>, dove si sono registrate alcune sorprese.
        </p>

        <h2>Settimana 2 – Serie A</h2>
        <p>
          In Serie A i WHISP hanno colto correttamente la vittoria della Juventus e
          dell’Inter, mentre hanno sottovalutato la prestazione del Napoli in trasferta.
          Nel complesso l’accuratezza è stata buona, con trend positivi sul mercato dei gol.
        </p>
      </section>
      {/* 🔵 FINE COMMENTO SETTIMANALE 🔵 */}

      <Banner position="middle" />
    </Layout>
  );
}