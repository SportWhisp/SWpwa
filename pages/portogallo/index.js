import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banner from "../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../data/portogallo/ShowPortogallo.json");
} catch {
  console.warn("⚠️ ShowPortogallo.json non trovato");
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

export default function Portogallo() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Primeira Liga: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici Primeira Liga: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti. Dati aggiornati e modelli originali."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/portogallo" />
  <meta property="og:title" content="Primeira Liga: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni Primeira Liga basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol per ogni partita."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/portogallo" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>Primeira Liga - Statistiche e WHISP</h1>
      <p>
        La Primeira Liga è il massimo campionato del Portogallo, una lega che ha lanciato alcuni dei talenti 
        più importanti della storia del calcio mondiale. Porto, Benfica e Sporting Lisbona dominano da anni la scena, 
        ma ogni stagione riserva sorprese grazie a squadre emergenti pronte a sfidare le “tre grandi”.
        <br />
        Con <strong>SportWhisp</strong> puoi osservare la Primeira Liga attraverso la lente dei nostri <strong>WHISP</strong>, previsioni 
        basate su analisi statistiche approfondite.
      </p>

      <h2>Cosa trovi in questa sezione</h2>
      <p>
        Il calendario delle partite della prossima giornata di Primeira Liga, con eventuali risultati aggiornati.
      <br />
        I <strong>Whisp Primeira Liga</strong>, cioè le percentuali calcolate dai nostri modelli per ciascun esito: 
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
      
            <h2>Come leggere le percentuali</h2>
            <p>
             Per aiutarti a interpretare rapidamente le tendenze:
             <br />
             Valori <strong>sopra il 55%</strong> sono segnalati in verde chiaro: un WHISP interessante.
             <br />
             Valori <strong>sopra il 70%</strong> appaiono in verde scuro: WHISP con alta confidenza statistica.
             <br />
             Questo sistema ti permette di distinguere subito i pronostici più rilevanti senza perdere tempo tra i numeri.
            </p>
      
            <h2>Perchè consultare i Whisp</h2>
            <p>
             I nostri modelli considerano forma delle squadre, differenza reti, rendimento in casa e in trasferta, oltre agli 
             scontri diretti. Non sono certezze, ma uno strumento utile per capire meglio le dinamiche del campionato portoghese.
             <br />
             Se preferisci confrontare i dati con la realtà della classifica, ti basta cliccare qui sotto per vedere la 
             classifica aggiornata della Primeira Liga.
            </p>

      <Link href="/portogallo/classifica" legacyBehavior>
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
          Consulta la Classifica della Primeira Liga
        </a>
      </Link>

            {/* Banner finale */}
            <Banner position="middle" />      
      
    </Layout>
  );
}