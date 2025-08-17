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

      <h1>Benvenuto su SportWhisp</h1>
      <p>
        Qui troverai i migliori <strong>WHISP</strong>, ovvero le previsioni
        con il più alto tasso di affidabilità basate su modelli statistici
        personali realizzati dal nostro team di esperti.
        <br />
        Per approfondire i dati e le analisi, puoi navigare nelle sezioni
        dedicate a ciascuna nazione.
      </p>

      <h2>WHISP PRINCIPALI</h2>
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
    "ShowUngheria.json",
  ];

  return {
    props: {
      whispPrincipali: estraiDati(principaliFiles),
      whispMinori: estraiDati(minoriFiles),
    },
  };
}