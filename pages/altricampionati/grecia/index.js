import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Banner from "../../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../../data/grecia/ShowGrecia.json");
} catch {
  console.warn("⚠️ ShowGrecia.json non trovato");
}

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

function getCellStyle(percentValue) {
  const val = parseFloat(percentValue.replace(",", "."));
  if (val > 70) return { backgroundColor: "#6ab04c", color: "#fff" };
  if (val >= 55) return { backgroundColor: "#c8f7c5" };
  return {};
}

export default function Grecia() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Grecia Super League: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici Super League greca: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/altricampionati/grecia" />
  <meta property="og:title" content="Grecia Super League: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni Super League greca basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/altricampionati/grecia" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>Super League - Analisi e Whisp</h1>
      <p>
        Il campionato greco, la Super League Ellada, è una competizione ricca di tradizione e rivalità accese. 
        Squadre storiche come Olympiacos, Panathinaikos, AEK Atene e PAOK Salonicco si contendono ogni anno la 
        vetta, in un torneo in cui il tifo caldo e gli stadi infuocati fanno parte integrante dello spettacolo.
        <br />
        Con <strong>SportWhisp</strong> puoi guardare alla Super League con un approccio diverso: i nostri 
        <strong>WHISP</strong>, previsioni statistiche basate su dati concreti e modelli predittivi.
      </p>

      <h2>Una competizione intensa e ricca di rivalità</h2>
      <p>
        La Super League è conosciuta per le sue sfide ad alta tensione, soprattutto i derby ateniesi e il confronto 
        tra le grandi rivali di Salonicco e del Pireo. La formula, con stagione regolare e successivi playoff per 
        il titolo e per la salvezza, garantisce equilibrio e colpi di scena fino alla fine.
      <br />
        In un contesto in cui l’aspetto emotivo è fortissimo, i dati offrono un contrappunto razionale e aiutano a 
        leggere con maggiore chiarezza le possibilità delle squadre.
      </p>

      {matches.length > 0 && (
        <div style={{ margin: "20px 0" }}>
          <h2>Prossima Giornata</h2>
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "15px" }}>
            <thead>
              <tr style={{ backgroundColor: "#2f3336", color: "#fff", height: "30px" }}>
                <th>Data</th>
                <th>Partita</th>
                <th>Risultato</th>
                <th style={{ display: "none" }}>Previsione</th>
                <th>1</th>
                <th>X</th>
                <th>2</th>
                <th>Under2.5</th>
                <th>Over2.5</th>
                <th>Gol</th>
                <th>NoGol</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((m, i) => (
                <tr key={i} style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f2f2f2", height: "30px" }}>
                  <td>{formatDate(m.data)}</td>
                  <td>{m.partita}</td>
                  <td style={{ textAlign: "center" }}>{m.risultato}</td>
                  <td style={{ display: "none" }}>{m.previsione}</td>
                  <td style={{ textAlign: "center", ...getCellStyle(m.p1) }}>{m.p1}</td>
                  <td style={{ textAlign: "center", ...getCellStyle(m.pX) }}>{m.pX}</td>
                  <td style={{ textAlign: "center", ...getCellStyle(m.p2) }}>{m.p2}</td>
                  <td style={{ textAlign: "center", ...getCellStyle(m.pUnder) }}>{m.pUnder}</td>
                  <td style={{ textAlign: "center", ...getCellStyle(m.pOver) }}>{m.pOver}</td>
                  <td style={{ textAlign: "center", ...getCellStyle(m.pGG) }}>{m.pGG}</td>
                  <td style={{ textAlign: "center", ...getCellStyle(m.pNG) }}>{m.pNG}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

       {/* Banner finale */}
      <Banner position="middle" />

      <h2>Perchè affidarsi ai WHISP</h2>
      <p>
       I <strong>Whisp</strong> raccolgono e sintetizzano elementi come rendimento recente, differenza reti, 
       prestazioni casalinghe e in trasferta, oltre agli scontri diretti. Non sono predizioni certe, ma strumenti 
       che ti permettono di interpretare con maggiore lucidità un campionato dove il fattore campo e la tradizione 
       pesano molto.
       <br />
       Se vuoi verificare direttamente l’andamento delle squadre, consulta la classifica aggiornata della 
       Super League greca.
      </p>         

      <Link href="/altricampionati/grecia/classifica" legacyBehavior>
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#2f3336",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "20px",
            display: "inline-block",
            textDecoration: "none"
          }}
        >
          Consulta la Classifica SuperLeague Grecia
        </a>
      </Link>
           
    </Layout>
  );
}