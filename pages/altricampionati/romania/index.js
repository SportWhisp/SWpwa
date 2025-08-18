import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Banner from "../../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../../data/romania/ShowRomania.json");
} catch {
  console.warn("⚠️ ShowRomania.json non trovato");
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

export default function Romania() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Romania Liga I: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici Liga I romena: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/altricampionati/romania" />
  <meta property="og:title" content="Romania Liga I: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni Liga I romena basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/altricampionati/romania" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>Liga I Romena - Statistiche e Whisp</h1>
      <p>
       La Liga I è il massimo campionato rumeno, una competizione che affonda le radici nella storia calcistica 
       dell’Europa orientale. Club come Steaua Bucarest (oggi FCSB), Dinamo Bucarest e CFR Cluj hanno contribuito 
       a rendere la Romania un paese dal forte legame con il calcio e dalle rivalità intense.
      </p>

      <h2>Tradizione e rinnovamento</h2>
      <p>
       Negli ultimi anni la Liga I è stata un terreno di confronto tra la tradizione delle squadre storiche e l’ascesa 
       di nuove realtà pronte a emergere. Accanto ai club più blasonati, infatti, sono emerse società con progetti solidi 
       che hanno reso il torneo più equilibrato e combattuto. Questa fusione tra passato glorioso e nuove ambizioni 
       mantiene alta l’incertezza e regala un campionato in continua evoluzione.
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
       I nostri <strong>Whisp</strong> interpretano le partite della Liga I basandosi su numeri e dati concreti: 
       rendimento recente, differenza reti, risultati casa/trasferta e scontri diretti. Non sono predizioni certe, 
       ma strumenti per orientarsi in un campionato che alterna tradizione e rinnovamento, con esiti spesso sorprendenti.
       <br />
       Se vuoi seguire da vicino la corsa al titolo o la lotta salvezza, consulta la classifica aggiornata della Liga I.
      </p>  

      <Link href="/altricampionati/romania/classifica" legacyBehavior>
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
          Consulta la Classifica Liga I
        </a>
      </Link>
      
    </Layout>
  );
}