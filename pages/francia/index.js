import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banner from "../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../data/francia/ShowFrancia.json");
} catch {
  console.warn("⚠️ ShowFrancia.json non trovato");
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

export default function Francia() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Ligue 1: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici Ligue 1: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti. Dati aggiornati e modelli originali."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/francia" />
  <meta property="og:title" content="Ligue 1: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni Ligue 1 basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol per ogni partita."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/francia" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>Ligue 1 - Analisi e WHISP</h1>
      <p>La Ligue 1 è il massimo campionato francese, una competizione in cui storia e talento si intrecciano: club 
        leggendari come il Paris Saint-Germain, il Marsiglia o il Lione si sfidano ogni stagione per il titolo nazionale.
        <br />
        Con <strong>SportWhisp</strong> puoi seguire il torneo da un punto di vista diverso: non solo risultati e 
        classifiche, ma anche <strong>previsioni statistiche</strong> costruite sui dati più aggiornati.
      </p>

      <h2>Cosa ti offriamo in questa sezione</h2>
      <p>
        L’elenco completo delle partite della prossima giornata, con risultati aggiornati quando i match vengono giocati.
      <br />
        I <strong>Whisp</strong>della Ligue 1, cioè le nostre previsioni numeriche su:: 1, X, 2, 
        Under 2.5 / Over 2.5, Gol / NoGol.
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
       Nella tabella ogni esito è accompagnato da una probabilità calcolata dai nostri modelli.
       <br />
       Valori <strong>superiori al 55%</strong> vengono messi in evidenza con il verde chiaro: indicano un WHISP 
       statisticamente interessante.
       <br />
       Valori <strong>superiori al 70%</strong>sono sottolineati in verde scuro: rappresentano i nostri WHISP più 
       solidi e affidabili.
       <br />
       In questo modo puoi orientarti a colpo d’occhio tra i numeri e trovare subito le tendenze più forti della giornata.
      </p>

      <h2>Limiti e Forza dei Whisp</h2>
      <p>
       I WHISP non sono mai predizioni certe, ma uno strumento per leggere i dati del campionato francese da una 
       prospettiva più oggettiva.
       <br />
       Le analisi prendono in considerazione rendimento recente, solidità difensiva, prolificità offensiva e 
       andamento casa/trasferta.
       <br />
       Se vuoi verificare i progressi delle squadre senza basarti solo sui nostri calcoli, ti basta dare 
       un’occhiata alla classifica Ligue 1 aggiornata.
      </p>

      <Link href="/francia/classifica" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer" style={{
          background: "#2f3336",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
          display: "inline-block",
          textDecoration: "none"
        }}>
          Consulta la Classifica della Ligue 1
        </a>
      </Link>

            {/* Banner finale */}
            <Banner position="middle" />
                       
    </Layout>
  );
}