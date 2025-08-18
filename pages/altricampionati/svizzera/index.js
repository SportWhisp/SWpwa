import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Banner from "../../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../../data/svizzera/ShowSvizzera.json");
} catch {
  console.warn("⚠️ ShowSvizzera.json non trovato");
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

export default function Svizzera() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Svizzera Super League: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici Super League svizzera: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/altricampionati/svizzera" />
  <meta property="og:title" content="Svizzera Super League: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni Super League svizzera basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/altricampionati/svizzera" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>Super League Svizzera - Analisi e Whisp</h1>
      <p>
       La Super League svizzera è una competizione dinamica che negli ultimi anni ha conquistato visibilità grazie 
       a club come Basilea, Young Boys e Zurigo. Nonostante la dimensione ridotta rispetto ad altri tornei, offre 
       partite spettacolari e un livello tecnico sempre più alto.
      </p>

      <h2>Una fucina di talenti</h2>
      <p>
       Il campionato svizzero è conosciuto come trampolino di lancio per giovani promesse e giocatori destinati a 
       emergere sulla scena internazionale. La cura dei vivai e l’attenzione alla crescita dei calciatori fanno della 
       Super League un laboratorio calcistico di grande interesse. Questo rende ogni stagione un mix di certezze e 
       sorprese, con squadre in grado di rinnovarsi costantemente.
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

      <h2>I WHISP per leggere il torneo</h2>
      <p>
       I nostri <strong>Whisp</strong> ti aiutano a interpretare l’andamento del campionato svizzero: numeri su 
       rendimento recente, gol segnati e subiti, solidità difensiva e scontri diretti trasformati in indicatori 
       utili. Non sono garanzie di risultato, ma strumenti per orientarsi in un torneo che valorizza giovani e in 
       cui le dinamiche possono cambiare rapidamente.
       <br />
       Per avere una visione completa sulla corsa al titolo e sulla lotta salvezza, consulta la classifica aggiornata 
       della Super League.
      </p> 

      <Link href="/altricampionati/svizzera/classifica" legacyBehavior>
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
          Consulta la Classifica Super League Svizzera
        </a>
      </Link>

    </Layout>
  );
}