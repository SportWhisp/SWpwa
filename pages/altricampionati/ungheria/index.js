import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Banner from "../../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../../data/ungheria/ShowUngheria.json");
} catch {
  console.warn("⚠️ ShowUngheria.json non trovato");
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

export default function Ungheria() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Ungheria NB I: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici NB I ungherese: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/altricampionati/ungheria" />
  <meta property="og:title" content="Ungheria NB I: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni NB I ungherese basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/altricampionati/ungheria" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>NB I Ungherese - Statistiche e Whisp</h1>
      <p>
      La Nemzeti Bajnokság I, meglio conosciuta come NB I, è il massimo campionato ungherese. Con una lunga tradizione 
      che affonda le radici nel primo Novecento, ha visto protagonisti club storici come Ferencváros, Honvéd e MTK Budapest, 
      che hanno contribuito a scrivere la storia del calcio magiaro.
      </p>

      <h2>Il peso della storia e delle rivalità</h2>
      <p>
       Il calcio ungherese conserva un fascino particolare: le rivalità cittadine di Budapest e le sfide tra i club 
       storici mantengono vivo l’interesse dei tifosi, creando un’atmosfera unica. Pur non avendo la stessa risonanza 
       internazionale delle grandi leghe europee, l’NB I resta un campionato fortemente identitario, legato alla 
       tradizione e al calore del suo pubblico.
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

      <h2>I WHISP come supporto all’analisi</h2>
      <p>
       I nostri <strong>Whisp</strong> ti offrono una chiave di lettura statistica delle partite della NB I: rendimento 
       in casa e in trasferta, solidità difensiva, gol realizzati e andamento degli scontri diretti. Non sono previsioni 
       certe, ma strumenti per interpretare meglio un torneo che vive di storia, rivalità e passione.
       <br />
       Se vuoi avere un quadro chiaro della stagione e seguire da vicino la corsa al titolo e alla salvezza, 
       consulta la classifica aggiornata della NB I.
      </p> 

      <Link href="/altricampionati/ungheria/classifica" legacyBehavior>
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
          Consulta la Classifica NB I
        </a>
      </Link>
      
    </Layout>
  );
}