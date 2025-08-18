import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banner from "../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../data/turchia/ShowTurchia.json");
} catch {
  console.warn("⚠️ ShowTurchia.json non trovato");
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

export default function Turchia() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Super Lig: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici Super Lig turca: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti. Dati aggiornati e modelli originali."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/turchia" />
  <meta property="og:title" content="Super Lig: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni Super Lig basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol per ogni partita."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/turchia" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>Süper Lig - Statistiche e WHISP</h1>
      <p>
        La Süper Lig è il massimo campionato turco, conosciuto per l’atmosfera infuocata degli stadi e le 
        rivalità storiche che infiammano Istanbul: Galatasaray, Fenerbahçe e Beşiktaş sono le protagoniste 
        tradizionali, ma sempre più spesso club emergenti come Trabzonspor o Başakşehir riescono a dire la loro.
        <br />
        Con <strong>SportWhisp</strong> puoi vivere il calcio turco da una prospettiva diversa, grazie ai nostri <strong>Whisp</strong>, 
        previsioni basate su dati oggettivi e modelli predittivi proprietari.
      </p>

      <h2>Cosa troverai in questa sezione</h2>
      <p>
        L’elenco completo delle partite della prossima giornata di Super Lig, 
        con aggiornamento dei risultati non appena disponibili.
      <br />
        I <strong>Whisp Süper Lig</strong>, cioè le probabilità statistiche calcolate per i principali esiti:
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
       Le nostre tabelle usano un sistema visivo per aiutarti a leggere i WHISP:
       <br />
       valori <strong>oltre il 55%</strong> → cella verde chiaro: segnale di previsione interessante.
       <br />
       valori <strong>oltre il 70%</strong> → cella verde scuro: WHISP con elevata attendibilità.
       <br />
       Così puoi individuare subito i trend più significativi della giornata turca..
      </p>

      <h2>Perchè i Whisp fanno la differenza</h2>
      <p>
       Il campionato turco è spesso imprevedibile: squadre forti in casa, trasferte difficili e partite 
       dall’alto numero di gol. I nostri WHISP tengono conto di rendimento recente, solidità difensiva, 
       prolificità offensiva e storici degli scontri diretti.
       <br />
       Se vuoi verificare tu stesso il percorso delle squadre, puoi sempre consultare la classifica 
       aggiornata della Süper Lig.
      </p>

      <Link href="/turchia/classifica" legacyBehavior>
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
          Consulta la Classifica della Süper Lig
        </a>
      </Link>
      
    </Layout>
  );
}