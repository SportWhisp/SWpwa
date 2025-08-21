import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SeasonSelector from "@/components/SeasonSelector";
import TableClassifica from "@/components/TableClassifica";
import Head from "next/head";

export default function ClassificaPortogalloPubblica() {
  const [season, setSeason] = useState("2025-2026");
  const [rawStandings, setRawStandings] = useState([]);
  const [tab, setTab] = useState("completa");
  const LEAGUE = "portogallo";

  const getFileName = (s) => `standings-${LEAGUE}-${s}.json`;

  useEffect(() => {
    if (!season) return;

    fetch(`/api/readData?league=${LEAGUE}&file=${getFileName(season)}`)
      .then((res) => res.json())
      .then((data) => {
        let parsed = [];

        // ✅ API-FOOTBALL (stagione 2023-2024)
        if (season === "2023-2024" && data?.response?.[0]?.league?.standings?.[0]) {
          parsed = data.response[0].league.standings[0].map((t) => ({
            rank: t.rank,
            name: t.team.name,
            logo: t.team.logo,
            points: t.points,
            diff: t.goalsDiff,
            played: t.all.played,
            win: t.all.win,
            draw: t.all.draw,
            lose: t.all.lose,
            goalsFor: t.all.goals.for,
            goalsAgainst: t.all.goals.against,
            form: t.form ? t.form.split("").slice(0, 5) : [],
            home: t.home || {},
            away: t.away || {}
          }));
        }

        // ✅ FOOTBALL-DATA.ORG (stagioni 2024-2025, 2025-2026)
        else if (data?.standings?.length > 0) {
          const mapTeams = {};

          const total = data.standings.find((s) => s.type === "TOTAL");
          if (total) {
            total.table.forEach((t) => {
              mapTeams[t.team.id] = {
                id: t.team.id,
                rank: t.position,
                name: t.team.name,
                logo: t.team.crest || "",
                points: t.points,
                diff: t.goalDifference,
                played: t.playedGames,
                win: t.won,
                draw: t.draw,
                lose: t.lost,
                goalsFor: t.goalsFor,
                goalsAgainst: t.goalsAgainst,
                form: t.form ? t.form.replace(/,/g, "").split("").slice(0, 5) : [],
                home: {},
                away: {}
              };
            });
          }

          const homeTable = data.standings.find((s) => s.type === "HOME");
          if (homeTable) {
            homeTable.table.forEach((t) => {
              if (mapTeams[t.team.id]) {
                mapTeams[t.team.id].home = {
                  played: t.playedGames,
                  win: t.won,
                  draw: t.draw,
                  lose: t.lost,
                  goals: { for: t.goalsFor, against: t.goalsAgainst },
                  form: t.form ? t.form.replace(/,/g, "").split("").slice(0, 5) : []
                };
              }
            });
          }

          const awayTable = data.standings.find((s) => s.type === "AWAY");
          if (awayTable) {
            awayTable.table.forEach((t) => {
              if (mapTeams[t.team.id]) {
                mapTeams[t.team.id].away = {
                  played: t.playedGames,
                  win: t.won,
                  draw: t.draw,
                  lose: t.lost,
                  goals: { for: t.goalsFor, against: t.goalsAgainst },
                  form: t.form ? t.form.replace(/,/g, "").split("").slice(0, 5) : []
                };
              }
            });
          }

          parsed = Object.values(mapTeams);
        }

        setRawStandings(parsed);
      })
      .catch((err) => console.error("Errore caricamento classifica:", err));
  }, [season]);

  const getFilteredStandings = () => {
    let filtered = rawStandings.map((team) => ({ ...team }));

    if (tab === "casa" && rawStandings[0]?.home) {
      filtered = rawStandings.map((t) => ({
        ...t,
        played: t.home?.played || 0,
        win: t.home?.win || 0,
        draw: t.home?.draw || 0,
        lose: t.home?.lose || 0,
        goalsFor: t.home?.goals?.for || 0,
        goalsAgainst: t.home?.goals?.against || 0,
        points: (t.home?.win || 0) * 3 + (t.home?.draw || 0),
        diff: (t.home?.goals?.for || 0) - (t.home?.goals?.against || 0),
        form: t.home?.form || []
      }));
    } else if (tab === "trasferta" && rawStandings[0]?.away) {
      filtered = rawStandings.map((t) => ({
        ...t,
        played: t.away?.played || 0,
        win: t.away?.win || 0,
        draw: t.away?.draw || 0,
        lose: t.away?.lose || 0,
        goalsFor: t.away?.goals?.for || 0,
        goalsAgainst: t.away?.goals?.against || 0,
        points: (t.away?.win || 0) * 3 + (t.away?.draw || 0),
        diff: (t.away?.goals?.for || 0) - (t.away?.goals?.against || 0),
        form: t.away?.form || []
      }));
    }

    filtered.sort((a, b) => b.points - a.points || b.diff - a.diff);

    return filtered.map((t, i) => ({ ...t, rank: i + 1 }));
  };

  return (
    <Layout>
    <Head>
  <title>Classifica Primeira Liga | SportWhisp</title>
  <meta
    name="description"
    content="Classifica Primeira Liga aggiornata: punti, differenza reti, rendimento casa/trasferta e forma. Dati aggiornati automaticamente su SportWhisp."
  />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://sportwhisp.it/portogallo/classifica" />
  <meta property="og:title" content="Classifica Primeira Liga | SportWhisp" />
  <meta
    property="og:description"
    content="Tabella Primeira Liga aggiornata con punti, diff reti, casa/trasferta e forma. Statistiche complete su SportWhisp."
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportwhisp.it/portogallo/classifica" />
  <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
</Head>

      <h1>Classifica Primeira Liga {season}</h1>
      <p>
        La Primeira Liga è il massimo campionato portoghese e da sempre è dominata dal trio storico formato da Benfica, 
        Porto e Sporting Lisbona, che si dividono quasi tutti i titoli nazionali. Nonostante questo equilibrio al vertice, 
        il torneo è spesso terreno fertile per sorprese e per l’ascesa di club emergenti capaci di mettere in difficoltà 
        le big.
        <br />
        La classifica della Primeira Liga non racconta solo la lotta scudetto, ma anche la corsa verso le coppe europee 
        e le sfide salvezza: un percorso che ogni anno vede protagonisti giovani talenti destinati a lasciare il segno 
        anche nei grandi campionati europei.
      </p>

      <SeasonSelector country={LEAGUE} season={season} setSeason={setSeason} />

      <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
        {["completa", "casa", "trasferta"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: tab === t ? "#64b5f6" : "#2f3336",
              color: "#fff",
              padding: "8px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            {t === "completa" ? "Classifica Completa" : t === "casa" ? "Classifica Casa" : "Classifica Trasferta"}
          </button>
        ))}
      </div>

      <TableClassifica standings={getFilteredStandings()} titolo={`Classifica ${tab}`} />
    </Layout>
  );
}