import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Link from "next/link";
import Banner from "../../components/Banner";
import Head from "next/head";

let showData = [];
try {
  showData = require("../../data/germania/ShowGermania.json");
} catch {
  console.warn("⚠️ ShowGermania.json non trovato");
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

export default function Germania() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setMatches(showData);
  }, []);

  return (
    <Layout>
      <Head>
  <title>Bundesliga: Pronostici & Statistiche | SportWhisp</title>
  <meta
    name="description"
    content="Pronostici statistici Bundesliga: percentuali 1-X-2, Under/Over, Gol/NoGol e risultati previsti. Dati aggiornati e modelli originali."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/germania" />
  <meta property="og:title" content="Bundesliga: Pronostici & Statistiche | SportWhisp" />
  <meta
    property="og:description"
    content="Previsioni Bundesliga basate su modelli statistici: probabilità esito, Under/Over e Gol/NoGol per ogni partita."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/germania" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>
      <h1>Bundesliga - Statistiche e WHISP</h1>
      <p>La Bundesliga è il campionato tedesco per eccellenza, famoso per il calcio spettacolare, gli stadi gremiti 
        e le squadre che ogni anno propongono giovani talenti al panorama internazionale. Bayern Monaco, 
        Borussia Dortmund, Lipsia e tante altre società rendono questa lega una delle più seguite al mondo.
        <br />
        Con <strong>SportWhisp</strong> puoi scoprire la Bundesliga non solo attraverso i risultati, ma tramite un approccio 
        basato su numeri e dati oggettivi: i nostri <strong>WHISP</strong>.
      </p>

      <h2>Cosa include questa sezione</h2>
      <p>
        L’elenco aggiornato delle gare della prossima giornata, con l’indicazione dei risultati già disputati.
      <br />
        I <strong>Whisp Bundesliga</strong>, cioè le previsioni probabilistiche sui principali esiti di ciascun 
        incontro: 1, X, 2, Under 2.5 / Over 2.5, Gol / NoGol.
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
      
      <h2>Come leggere i WHISP</h2>
      <p>
       Ogni esito è accompagnato da una percentuale calcolata dai nostri modelli statistici:
       <br />
       <strong>sopra il 55%</strong> → la cella è evidenziata in verde chiaro: il WHISP è promettente.
       <br />
       <strong>sopra il 70%</strong> → verde scuro: il WHISP ha un alto livello di affidabilità.
       <br />
       Questa rappresentazione visiva ti consente di capire in un istante dove i nostri algoritmi individuano i 
       trend più forti.
      </p>

      <h2>Perché i WHISP non sono solo numeri</h2>
      <p>
       Il calcio tedesco è imprevedibile e ricco di sorprese: le nostre analisi non sono verità assolute, ma 
       strumenti per interpretare meglio il torneo. Considerano andamento recente, differenza reti, rendimento 
       casalingo/esterno e scontri diretti.
       <br />
       Se preferisci valutare in autonomia il percorso delle squadre, puoi sempre consultare la classifica 
       aggiornata della Bundesliga: uno strumento essenziale per contestualizzare i WHISP.
      </p>

      <Link href="/germania/classifica" legacyBehavior>
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
          Consulta la Classifica della Bundesliga
        </a>
      </Link>

            {/* Banner finale */}
            <Banner position="middle" />
                       
    </Layout>
  );
}