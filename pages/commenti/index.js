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

      <h1>Analisi dei WHISP del weekend precedente</h1>
      <p>
        In questa sezione trovi un <strong>resoconto personale</strong> sui WHISP della
        settimana precedente: valutazioni sull’accuratezza, riflessioni e spunti per
        interpretare al meglio le prossime giornate.
      </p>

      {/* 🔵 INSERISCI QUI IL TUO COMMENTO SETTIMANALE 🔵 */}
      <section style={{ marginTop: 24 }}>
        <h2>18/08/2025 Elche CF vs Real Betis Balompié - GOL 79.63%</h2>
        <p>
          I WHISP della prima giornata di Ligue 1 hanno mostrato una buona precisione
          sugli esiti <strong>1X2</strong>, in particolare nelle partite casalinghe.
          Più incerti invece gli <em>Over 2.5</em>, dove si sono registrate alcune sorprese.
        </p>

        <h2>16/08/2025 Brighton & Hove Albion FC vs Fulham FC - GOL 77.54%</h2>
        <p>
          In Serie A i WHISP hanno colto correttamente la vittoria della Juventus e
          dell’Inter, mentre hanno sottovalutato la prestazione del Napoli in trasferta.
          Nel complesso l’accuratezza è stata buona, con trend positivi sul mercato dei gol.
        </p>

        <h2>16/08/2025 Tottenham Hotspur FC vs Burnley FC - OVER2.5 74.33%</h2>
        <p>
          COMMENTO.
        </p>

        <h2>17/08/2025 FC Nantes vs Paris Saint-Germain FC - GOL 73.85%</h2>
        <p>
          COMMENTO.
        </p>

        <h2>15/08/2025 Liverpool FC vs AFC Bournemouth - GOL 73.31%</h2>
        <p>
          COMMENTO.
        </p>

        <h2>17/08/2025 FC Twente '65 vs PSV - OVER2.5 73.25%</h2>
        <p>
          COMMENTO.
        </p>
              <Banner position="middle" />

        <h2>18/08/2025 Leeds United FC vs Everton FC - UNDER2.5 72.16%</h2>
        <p>
          COMMENTO.
        </p>

        <h2>16/08/2025 Deportivo Alavés vs Levante UD - UNDER2.5 71.67%</h2>
        <p>
          COMMENTO.
        </p>

        <h2>15/08/2025 Galatasaray vs Fatih Karagumruk - 1 92.84%</h2>
        <p>
          COMMENTO.
        </p>

        <h2>18/08/2025 OB vs AGF - GOL 78.17%</h2>
        <p>
          COMMENTO.
        </p>

        <h2>16/08/2025 Paksi FC vs Zalaegerszegi TE - GOL 74.40%</h2>
        <p>
          COMMENTO.
        </p>

        <h2>15/08/2025 Zaglebie Lubin vs Lechia Gdansk - GOL 73.00%</h2>
        <p>
          COMMENTO.
        </p>
      <Banner position="middle" />

        <h2>17/08/2025 Radomiak Radom vs Jagiellonia Bialystok - GOL 72.14%</h2>
        <p>
          COMMENTO.
        </p>

        <h2>17/08/2025 Viborg vs Silkeborg - GOL 71.90%</h2>
        <p>
          COMMENTO.
        </p>   
      </section>
      {/* 🔵 FINE COMMENTO SETTIMANALE 🔵 */}

    </Layout>
  );
}