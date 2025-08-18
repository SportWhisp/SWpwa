import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Banner from "../../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../../data/austria/ShowAustria.json");
} catch {
  console.warn("⚠️ ShowAustria.json non trovato");
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

export default function Austria() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Austria Bundesliga: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici Austria Bundesliga: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/altricampionati/austria" />
  <meta property="og:title" content="Austria Bundesliga: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni Austria Bundesliga basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/altricampionati/austria" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>Bundesliga Austriaca - Statistiche e Whisp</h1>
      <p>
        Il campionato austriaco è una lega in costante crescita, resa popolare dal dominio recente del 
        Red Bull Salisburgo ma anche dalla competitività di club come Rapid Vienna, Sturm Graz e LASK Linz. 
        L’atmosfera negli stadi e la valorizzazione dei giovani talenti hanno reso la Bundesliga austriaca un 
        laboratorio calcistico sempre più seguito in Europa.
      </p>

      <h2>Un torneo con una formula unica</h2>
      <p>
        La stagione è divisa in due fasi: una regular season e, successivamente, due gironi distinti per il titolo 
        e per la salvezza. Questa struttura rende ogni punto importante e mantiene alta la tensione fino 
        all’ultima giornata.
      <br />
        In un contesto così equilibrato, i dati statistici ed i <strong>Whisp</strong> diventano fondamentali per 
        interpretare le partite e anticipare i possibili sviluppi.
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

      <h2>I WHISP come bussola del campionato</h2>
      <p>
       I nostri <strong>Whisp</strong> offrono una lettura immediata dei match, andando oltre le sensazioni e le ipotesi. 
       L’analisi dei numeri di rendimento, dei gol segnati e subiti e degli scontri diretti ti permette di cogliere 
       dettagli che spesso sfuggono a un occhio non allenato.
       <br />
       Non si tratta di certezze, ma di indicatori preziosi per capire in quale direzione si muove il torneo.
       <br />
       Se vuoi confrontare direttamente le performance delle squadre e valutare in autonomia la corsa al titolo o alla 
       salvezza, puoi consultare la classifica aggiornata della Bundesliga austriaca.
      </p>      

      <Link href="/altricampionati/austria/classifica" legacyBehavior>
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
          Consulta la Classifica Bundesliga Austria
        </a>
      </Link>
      
    </Layout>
  );
}