import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Banner from "../../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../../data/belgio/ShowBelgio.json");
} catch {
  console.warn("⚠️ ShowBelgio.json non trovato");
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

export default function Belgio() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Belgio Pro League: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici Pro League belga: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/altricampionati/belgio" />
  <meta property="og:title" content="Belgio Pro League: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni Pro League belga basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/altricampionati/belgio" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>Pro League - Statistiche e Whisp</h1>
      <p>
        Il massimo campionato belga è una competizione vibrante e imprevedibile, da sempre terreno fertile per la 
        crescita di giovani talenti. Club storici come Anderlecht, Club Brugge e Standard Liegi si contendono il 
        primato, mentre nuove realtà come Genk e Union Saint-Gilloise hanno dato ulteriore fascino al torneo.
        <br />
        Grazie a <strong>SportWhisp</strong> puoi osservare la Pro League da un punto di vista diverso: non solo 
        risultati e classifiche, ma anche <strong>Whisp</strong>, le nostre previsioni basate su dati statistici avanzati.
      </p>

      <h2>Una competizione dal format particolare</h2>
      <p>
        La Jupiler Pro League è caratterizzata da una stagione regolare seguita da playoff, sia per l’assegnazione 
        del titolo che per le qualificazioni alle coppe europee. Questa formula mantiene alta la competitività fino 
        all’ultimo, con classifiche spesso rivoluzionate nella fase finale.
      <br />
        In un contesto così dinamico, i numeri ed i <strong>Whisp</strong> aiutano a leggere meglio le probabilità e ad 
        individuare tendenze nascoste dietro la superficie dei risultati.
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

      <h2>I WHISP come chiave di lettura</h2>
      <p>
       I nostri <strong>Whisp</strong> ti offrono una panoramica immediata delle sfide più interessanti del 
       campionato belga. Basati su dati oggettivi – rendimento in casa e in trasferta, gol segnati e subiti, 
       andamento recente e scontri diretti – non sono predizioni certe, ma strumenti per orientarti in un torneo 
       che cambia rapidamente.
       <br />
       Se vuoi confrontare in prima persona i progressi delle squadre e seguire la corsa al titolo e ai playoff 
       europei, consulta la classifica aggiornata della Jupiler Pro League.
      </p>       

      <Link href="/altricampionati/belgio/classifica" legacyBehavior>
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
          Consulta la Classifica Jupiler Pro League
        </a>
      </Link>
            
    </Layout>
  );
}