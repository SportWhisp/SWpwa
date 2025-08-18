import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Banner from "../../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../../data/polonia/ShowPolonia.json");
} catch {
  console.warn("⚠️ ShowPolonia.json non trovato");
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

export default function Polonia() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Polonia Ekstraklasa: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici Ekstraklasa polacca: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/altricampionati/polonia" />
  <meta property="og:title" content="Polonia Ekstraklasa: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni Ekstraklasa polacca basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/altricampionati/polonia" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>Ekstraklasa Polacca - Statistiche e Whisp</h1>
      <p>
       L’Ekstraklasa è il massimo campionato polacco, una lega che unisce passione e imprevedibilità. 
       Squadre come Legia Varsavia, Lech Poznań e Wisła Cracovia hanno scritto la storia del torneo, 
       che negli ultimi anni ha visto crescere competitività e seguito anche a livello internazionale.
      </p>

      <h2>L’imprevedibilità come cifra del torneo</h2>
      <p>
       Una delle caratteristiche più interessanti dell’Ekstraklasa è la capacità di offrire colpi di scena continui: 
       squadre di metà classifica capaci di sorprendere le big, corsa al titolo decisa spesso nelle ultime giornate, 
       equilibrio marcato tra molte rivali. Questo rende il campionato affascinante per chi ama il calcio incerto e 
       poco scontato, ma allo stesso tempo difficile da interpretare senza un supporto statistico.
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

      <h2>I WHISP come strumento per orientarsi</h2>
      <p>
       Ed è qui che entrano in gioco i nostri <strong>Whisp</strong>: elaborazioni statistiche che leggono il 
       campionato polacco attraverso i numeri, dal rendimento casalingo alla solidità difensiva, fino alle tendenze 
       realizzative. Non sono certezze assolute, ma indicatori utili per chi vuole dare un senso ai tanti imprevisti 
       che l’Ekstraklasa sa regalare.
       <br />
       Per avere un quadro ancora più chiaro sull’andamento delle squadre, puoi sempre consultare la classifica 
       aggiornata dell’Ekstraklasa.
      </p>        

      <Link href="/altricampionati/polonia/classifica" legacyBehavior>
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
          Consulta la Classifica Ekstraklasa
        </a>
      </Link>
  
    </Layout>
  );
}