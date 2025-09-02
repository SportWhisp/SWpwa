import React from "react";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Head from "next/head";
import fs from "fs";
import path from "path";

function formatDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("it-IT", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

export default function Home({ whispPrincipali, whispMinori }) {
  return (
    <Layout>
      <Head>
        <title>SportWhisp - Previsioni Calcio</title>
        <meta
          name="description"
          content="Statistiche e previsioni personalizzate (WHISP) sui principali campionati di calcio europei e sulle leghe minori. Solo dati elaborati da modelli originali, aggiornati ogni settimana."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="SportWhisp - Previsioni Calcio" />
        <meta
          property="og:description"
          content="Modelli statistici originali per pronostici (WHISP) sui principali campionati europei e sulle leghe minori. Solo dati e analisi."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sportwhisp.it" />
        <link rel="canonical" href="https://sportwhisp.it/" />
        <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
        <meta property="og:site_name" content="SportWhisp" />
      </Head>

      <h1>SportWhisp - Il calcio visto dai numeri</h1>
      <p>
        Benvenuto su <strong>SPORTWHISP</strong>, la piattaforma dedicata a chi vuole vivere il calcio con 
        uno sguardo diverso: quello delle <strong>statistiche</strong> e delle analisi <strong>predittive</strong>.
        <br />
        Ogni settimana elaboriamo migliaia di dati sugli incontri dei principali campionati europei e non, per offrirti 
        i nostri <strong>WHISP</strong>: previsioni basate su modelli matematici sviluppati dal nostro team di analisti.
        <br />
        Che tu sia un tifoso curioso, un appassionato di statistiche o semplicemente voglia capire meglio le probabilità 
        dietro a un match, qui troverai un supporto affidabile e facile da consultare.
      </p>
      <h2>Come funzionano i WHISP</h2>
      <p>
        Un <strong>WHISP</strong> è una previsione statistica che nasce dall’analisi di diversi fattori:
        <br />
        andamento complessivo, prestazioni in casa e trasferta, numero dei gol fatti e subiti, trend storici, ed altri indicatori
         <br />
        Il risultato finale è un <strong>indice di affidabilità</strong>: più è alto, maggiore è la confidenza che il modello 
        attribuisce a quell’esito.
         <br />
        👉 Questo significa che in questa sezione non troverai mai una lista infinita di partite, 
        ma solo le selezioni più forti secondo i nostri calcoli.
         <br />
        ⚠️ Attenzione: la percentuale di affidabilità della previsione di un match già disputato potrebbe essere ancora mostrata
        tra i WHISP, fino a quanto non saranno terminate anche le altre partite del matchday. Tuttavia, tale valore potrebbe variare 
        in considerazione dei novi dati acquisiti nel frattempo. 
        </p>

      <h2>WHISP PRINCIPALI</h2>
      <p>
       Nella sezione WHISP principali raccogliamo i pronostici più affidabili dei campionati “top 7”:
       <br />
       Italia (Serie A), Inghilterra (Premier League), Spagna (LaLiga), Germania (Bundesliga), 
       Francia (Ligue 1), Portogallo (Primeira Liga), Olanda (Eredivisie)
       <br />
       Questi sono i tornei più seguiti e con il maggior numero di dati storici disponibili: 
       ecco perché le previsioni tendono a essere più solide.
      </p>

<table className="whisp-table">
  <thead>
    <tr style={{ backgroundColor: "#2f3336", color: "#fff", height: "30px" }}>
      <th>Data</th>
      <th>Partita</th>
      <th>WHISP</th>
      <th>Affidabilità</th>
    </tr>
  </thead>
  <tbody>
    {whispPrincipali.map((row, index) => (
      <tr
        key={index}
        style={{
          backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2",
          height: "30px"
        }}
      >
        <td>{new Date(row.Data).toLocaleDateString("it-IT")}</td>
        <td>{row.Partita}</td>
        <td>{row.WHISP}</td>
        <td style={{ textAlign: "center", fontWeight: "bold", color: "#2e7d32" }}>
          {row.Affidabilità.toFixed(2)}%
        </td>
      </tr>
    ))}
  </tbody>
</table>

      {/* Banner orizzontale tra le due sezioni */}
      <Banner position="middle" />

      <h2>WHISP CAMPIONATI MINORI</h2>
      <p>
        Nella sezione WHISP campionati minori diamo spazio a quelle leghe spesso trascurate 
        dai media, ma che offrono spunti interessanti:
        <br />
        Austria, Belgio, Danimarca, Grecia, Polonia, Romania, Svizzera, Ungheria, 
        Turchia (Super Lig), con sempre più squadre protagoniste nel panorama calcistico
        <br />
        Anche qui selezioniamo i match più rilevanti in base all’affidabilità delle nostre analisi.
      </p>

<table className="whisp-table">
  <thead>
    <tr>
      <th>Data</th>
      <th>Partita</th>
      <th>WHISP</th>
      <th>Affidabilità</th>
    </tr>
  </thead>
  <tbody>
    {whispMinori.map((row, index) => (
      <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#ffffff" : "#f2f2f2", height: "30px" }}>
        <td>{formatDate(row.Data)}</td>
        <td>{row.Partita}</td>
        <td>{row.WHISP}</td>
        <td style={{ textAlign: "center", fontWeight: "bold", color: "#2e7d32" }}>
          {row.Affidabilità.toFixed(2)}%
        </td>
      </tr>
    ))}
  </tbody>
</table>

      {/* Banner finale */}
      <Banner position="middle" />

      <h2>Perché scegliere SportWhisp</h2>
      <p>
        Oggettività: niente sensazioni o opinioni, solo numeri.
        <br />
        Accessibilità: tabelle semplici e immediate, comprensibili anche senza conoscenze avanzate di statistica.
        <br />
        Completezza: copriamo più di 15 campionati europei ogni settimana (per ora...).
        <br />
        Aggiornamenti costanti: i dati vengono aggiornati quotidianamente per offrirti sempre le previsioni più fresche.
      </p>

      <h2>Call to action</h2>
      <p>
      Vuoi approfondire le singole giornate e consultare le classifiche aggiornate?
      <br />
      ➡️ Naviga nel menu e scegli la nazione che ti interessa: 
      scoprirai tutte le partite in programma, con le nostre analisi e le classifiche complete.
      </p>

    </Layout>
  );
}

export async function getStaticProps() {
  const folderBase = path.join(process.cwd(), "data");

  const columns = {
    "1": "p1",
    "X": "pX",
    "2": "p2",
    "Under2.5": "pUnder",
    "Over2.5": "pOver",
    "Gol": "pGG",
    "Nogol": "pNG",
  };

  const estraiDati = (fileList) => {
    const rows = [];

    for (const fileName of fileList) {
      const nationFolder = fileName.replace(/show/i, "").replace(/\.json$/i, "").toLowerCase();
      const filePath = path.join(folderBase, nationFolder, fileName);
      if (!fs.existsSync(filePath)) continue;

      const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      for (const item of json) {
        for (const [whisp, key] of Object.entries(columns)) {
          if (item[key] && typeof item[key] === "string") {
            const perc = parseFloat(item[key].replace(",", ".").replace("%", ""));
            if (!isNaN(perc)) {
              rows.push({
                Data: item.data,
                Partita: item.partita,
                WHISP: whisp,
                Affidabilità: perc,
              });
            }
          }
        }
      }
    }

    const unique = [];
    const seen = new Set();

    for (const row of rows.sort((a, b) => b.Affidabilità - a.Affidabilità)) {
      if (!seen.has(row.Partita)) {
        unique.push(row);
        seen.add(row.Partita);
      }
      if (unique.length >= 10) break;
    }

    return unique;
  };

  const principaliFiles = [
    "ShowItalia.json",
    "ShowFrancia.json",
    "ShowGermania.json",
    "ShowInghilterra.json",
    "ShowSpagna.json",
    "ShowPortogallo.json",
    "ShowOlanda.json",
  ];

  const minoriFiles = [
    "ShowAustria.json",
    "ShowBelgio.json",
    "ShowDanimarca.json",
    "ShowGrecia.json",
    "ShowPolonia.json",
    "ShowRomania.json",
    "ShowSvizzera.json",
    "ShowTurchia.json",
  ];

  return {
    props: {
      whispPrincipali: estraiDati(principaliFiles),
      whispMinori: estraiDati(minoriFiles),
    },
  };
}