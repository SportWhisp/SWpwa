import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banner from "../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../data/spagna/ShowSpagna.json");
} catch {
  console.warn("⚠️ ShowSpagna.json non trovato");
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

export default function Spagna() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>La Liga: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici La Liga: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti. Dati aggiornati e modelli originali."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/spagna" />
  <meta property="og:title" content="La Liga: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni La Liga basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol per ogni partita."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/spagna" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>La Liga - Statistiche e WHISP</h1>
      <p>La Liga spagnola è una delle competizioni più affascinanti d’Europa: il duello storico tra 
        Real Madrid e Barcellona, le sorprese dell’Atlético Madrid e l’ascesa di club emergenti come il 
        Villarreal o la Real Sociedad rendono ogni giornata ricca di spunti.
        <br />
        Su <strong>SportWhisp</strong> puoi guardare oltre i semplici risultati, grazie ai nostri <strong>WHISP</strong>, 
        le previsioni statistiche basate su dati e modelli avanzati.
      </p>

      <h2>Cosa troverai in questa sezione</h2>
      <p>
        L’elenco completo delle partite della prossima giornata di LaLiga, con i risultati aggiornati quando disponibili.
      <br />
        I <strong>Whisp La Liga</strong>, he ti mostrano le probabilità calcolate per ogni esito: 1, X, 2, 
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

      <h2>Come leggere le percentuali</h2>
      <p>
       Ogni valore in tabella è frutto dei nostri algoritmi.
       <br />
       <strong>Oltre il 55%</strong> → la cella si illumina di verde chiaro: WHISP con buona affidabilità.
       <br />
       <strong>Oltre il 70%</strong> → verde scuro: WHISP con alta confidenza statistica.
       <br />
       Questa scala visiva ti permette di individuare subito le previsioni più forti e distinguere i semplici trend dalle 
       vere tendenze dominanti della giornata.
      </p>

      <h2>Utilità dei Whisp</h2>
      <p>
       I nostri WHISP nascono da un’analisi che combina rendimento recente, forza offensiva e difensiva, storici degli 
       scontri diretti e dati avanzati. Non sono certezze, ma strumenti per interpretare meglio LaLiga e anticiparne 
       le possibili evoluzioni.
       <br />
       Se desideri un controllo diretto e immediato, puoi sempre consultare la classifica aggiornata della Liga spagnola.
      </p>            

      <Link href="/spagna/classifica" legacyBehavior>
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
          Consulta la Classifica de La Liga
        </a>
      </Link>

            {/* Banner finale */}
            <Banner position="middle" />
                      
    </Layout>
  );
}