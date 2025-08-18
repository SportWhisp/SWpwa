import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banner from "../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../data/inghilterra/ShowInghilterra.json");
} catch {
  console.warn("⚠️ ShowInghilterra.json non trovato");
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

export default function Inghilterra() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Premier League: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici Premier League: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti. Dati aggiornati e modelli originali."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/inghilterra" />
  <meta property="og:title" content="Premier League: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni Premier League basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol per ogni partita."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/inghilterra" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>Premier League - Analisi e WHISP</h1>
      <p>
        La Premier League è il campionato più seguito al mondo: intensità, ritmo e spettacolo ne fanno una competizione 
        unica, capace di attirare tifosi da ogni continente. Squadre come Manchester City, Liverpool, Chelsea, 
        Arsenal e Manchester United scrivono ogni anno pagine indimenticabili di calcio inglese.
        <br />
        Con <strong>SportWhisp</strong> puoi scoprire la Premier non solo attraverso cronache e risultati, ma con i 
        nostri <strong>WHISP</strong>: previsioni numeriche basate su dati reali e algoritmi proprietari.
      </p>

      <h2>Cosa offre questa sezione</h2>
      <p>
        Tutte le partite della prossima giornata di Premier League, con eventuali risultati già disponibili.
      <br />
        I <strong>Whisp Premier League</strong>, che sintetizzano le probabilità di ciascun esito: 
         1, X, 2, Under 2.5 / Over 2.5, Gol / NoGol.
      <br />
        I risultati già disponibili, quando una partita è stata giocata.
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
       Ogni cella della tabella contiene una probabilità calcolata dai nostri modelli:
       <br />
       <strong>sopra il 55%</strong> → evidenziata in verde chiaro, WHISP con buona attendibilità.
       <br />
       <strong>sopra il 70%</strong> → evidenziata in verde scuro, WHISP con elevata confidenza.
       <br />
       Un colpo d’occhio rapido ti consente di capire quali sono le tendenze più forti della giornata inglese.
      </p>

      <h2>Perchè affidarsi ai Whisp</h2>
      <p>
       Il calcio inglese è spesso imprevedibile, ma i numeri raccontano molto: i <strong>WHISP</strong> combinano rendimento 
       recente, gol segnati e subiti, prestazioni casa/trasferta e andamento degli scontri diretti.
       <br />
       Se preferisci confrontare personalmente i progressi delle squadre, puoi sempre dare un’occhiata alla classifica 
       aggiornata della Premier League.
      </p>            

      <Link href="/inghilterra/classifica" legacyBehavior>
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#2f3336",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "20px",
            display: "inline-block",
            textDecoration: "none"
          }}
        >
          Consulta la Classifica della Premier League
        </a>
      </Link>
            
    </Layout>
  );
}