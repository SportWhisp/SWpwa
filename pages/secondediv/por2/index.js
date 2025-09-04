import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Banner from "../../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../../data/por2/ShowPor2.json");
} catch {
  console.warn("⚠️ ShowPor2.json non trovato");
}

function formatDate(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("it-IT", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function getCellStyle(percentValue) {
  const val = parseFloat(percentValue.replace(",", "."));
  if (val > 70) return { backgroundColor: "#6ab04c", color: "#fff" };
  if (val >= 55) return { backgroundColor: "#c8f7c5" };
  return {};
}

export default function Por2() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
        <title>Liga Portugal 2 (Segunda Liga): Pronostici & Statistiche | SportWhisp</title>
        <meta
          name="description"
          content="Pronostici statistici Liga Portugal 2 (Segunda Liga): percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sportwhisp.it/secondediv/por2" />
        <meta
          property="og:title"
          content="Liga Portugal 2 (Segunda Liga): Pronostici & Statistiche | SportWhisp"
        />
        <meta
          property="og:description"
          content="Previsioni sulla seconda divisione portoghese basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sportwhisp.it/secondediv/por2" />
        <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
      </Head>

      <h1>Liga Portugal 2 (Segunda Liga) - Statistiche e Whisp</h1>
      <p>
        La seconda divisione portoghese è un campionato tecnico e competitivo, in cui club storici e
        progetti emergenti si contendono la promozione nella massima serie. L’equilibrio e la cura
        nel settore giovanile rendono ogni giornata ricca di spunti e sorprese.
      </p>

      <h2>Promozione, playoff e lotta salvezza</h2>
      <p>
        Con la corsa ai posti utili per salire in Liga Portugal e la battaglia per evitare la
        retrocessione, l’intensità resta alta per tutta la stagione. In questo contesto i dati
        statistici e i <strong>Whisp</strong> aiutano a interpretare i match oltre le sensazioni,
        evidenziando tendenze e possibili sviluppi.
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
                <tr
                  key={i}
                  style={{ backgroundColor: i % 2 === 0 ? "#ffffff" : "#f2f2f2", height: "30px" }}
                >
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
        I <strong>Whisp</strong> combinano rendimento, gol fatti/subiti, forma recente e scontri
        diretti per offrirti indicatori chiari. Non sono verità assolute, ma strumenti utili per
        orientarti tra promozione e salvezza nella Liga Portugal 2.
        <br />
        Per una visione completa dell’andamento della stagione, consulta la classifica aggiornata.
      </p>

      <Link href="/secondediv/por2/classifica" legacyBehavior>
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
            textDecoration: "none",
          }}
        >
          Consulta la Classifica Liga Portugal 2
        </a>
      </Link>
    </Layout>
  );
}