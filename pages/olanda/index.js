import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banner from "../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../data/olanda/ShowOlanda.json");
} catch {
  console.warn("⚠️ ShowOlanda.json non trovato");
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("it-IT", {
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

export default function Olanda() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Eredivisie: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici Eredivisie: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti. Dati aggiornati e modelli originali."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/olanda" />
  <meta property="og:title" content="Eredivisie: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni Eredivisie basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol per ogni partita."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/olanda" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>Eredivisie - Statistiche e WHISP</h1>
      <p>
        L’Eredivisie è il campionato nazionale dei Paesi Bassi, celebre per il suo calcio offensivo 
        e spettacolare. Club storici come Ajax, PSV Eindhoven e Feyenoord hanno dato vita a rivalità 
        leggendarie, ma anche squadre più piccole riescono spesso a sorprendere grazie alla tradizione 
        olandese di valorizzare i giovani talenti.
       <br />
        Con <strong>SportWhisp</strong> puoi seguire la stagione con un approccio diverso: i nostri 
        <strong>Whisp</strong>, previsioni statistiche costruite su dati aggiornati e modelli matematici esclusivi.
      </p>

      <h2>Cosa troverai in questa sezione</h2>
      <p>
        La lista delle partite della prossima giornata di Eredivisie, con i risultati disponibili quando gli 
        incontri sono stati giocati.
      <br />
        I <strong>Whisp Eredivisie</strong>, che offrono percentuali di affidabilità per i principali esiti:
         1, X, 2, Under 2.5 / Over 2.5, Gol / NoGol.
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

      <h2>Come interpretare le percentuali</h2>
      <p>
       Ogni valore rappresenta la probabilità stimata dai nostri modelli:
       <br />
       <strong>oltre il 55%</strong> → cella verde chiaro: WHISP da monitorare con interesse.
       <br />
       <strong>oltre il 70%</strong> → lcella verde scuro: WHISP con alto livello di affidabilità.
       <br />
       Questo sistema cromatico ti consente di individuare a colpo d’occhio i pronostici più significativi della giornata.
      </p>

      <h2>Il valore dei Whisp</h2>
      <p>
       Le analisi considerano l’andamento recente, il rendimento casalingo e in trasferta, le medie gol e i 
       precedenti tra le squadre. I WHISP non sono predizioni assolute, ma uno strumento utile per orientarsi 
       in un campionato dinamico e ricco di sorprese come quello olandese.
       <br />
       Se vuoi verificare tu stesso la situazione delle squadre, consulta la classifica aggiornata dell’Eredivisie.
      </p>

      <Link href="/olanda/classifica" legacyBehavior>
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
          Consulta la Classifica della Eredivisie
        </a>
      </Link>
      
            {/* Banner finale */}
            <Banner position="middle" />
      
    </Layout>
  );
}