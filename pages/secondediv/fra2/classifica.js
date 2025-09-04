import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SeasonSelector from "@/components/SeasonSelector";
import TableClassifica from "@/components/TableClassifica";
import FormIndicator from "@/components/FormIndicator";
import Head from "next/head";

export default function ClassificaFra2() {
  const [season, setSeason] = useState("2025-2026");
  const [rawStandings, setRawStandings] = useState([]);
  const [tab, setTab] = useState("completa");
  const LEAGUE = "fra2";

  const getFileName = (s) => `standings-${LEAGUE}-${s}.json`;

  useEffect(() => {
    if (!season) return;

    fetch(`/api/readData?league=${LEAGUE}&file=${getFileName(season)}`)
      .then((res) => res.json())
      .then((data) => {
        let parsed = [];

        // ✅ API-Football
        if (data?.response?.[0]?.league?.standings?.[0]) {
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
            home: t.home,
            away: t.away,
          }));
        }

        // ✅ SoccerDataAPI — logo omesso
        else if (data?.stage?.[0]?.standings) {
          parsed = data.stage[0].standings.map((t) => ({
            rank: t.position,
            name: t.team_name,
            logo: "",
            points: t.points,
            diff: (t.goals_for ?? 0) - (t.goals_against ?? 0),
            played: t.games_played ?? 0,
            win: t.wins ?? 0,
            draw: t.draws ?? 0,
            lose: t.losses ?? 0,
            goalsFor: t.goals_for ?? 0,
            goalsAgainst: t.goals_against ?? 0,
            form: [],
            home: null,
            away: null,
          }));
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
        played: t.home?.played ?? 0,
        win: t.home?.win ?? 0,
        draw: t.home?.draw ?? 0,
        lose: t.home?.lose ?? 0,
        goalsFor: t.home?.goals?.for ?? 0,
        goalsAgainst: t.home?.goals?.against ?? 0,
        points: (t.home?.win ?? 0) * 3 + (t.home?.draw ?? 0),
        diff: (t.home?.goals?.for ?? 0) - (t.home?.goals?.against ?? 0),
        form: t.home?.form ? t.home.form.split("").slice(0, 5) : [],
      }));
    } else if (tab === "trasferta" && rawStandings[0]?.away) {
      filtered = rawStandings.map((t) => ({
        ...t,
        played: t.away?.played ?? 0,
        win: t.away?.win ?? 0,
        draw: t.away?.draw ?? 0,
        lose: t.away?.lose ?? 0,
        goalsFor: t.away?.goals?.for ?? 0,
        goalsAgainst: t.away?.goals?.against ?? 0,
        points: (t.away?.win ?? 0) * 3 + (t.away?.draw ?? 0),
        diff: (t.away?.goals?.for ?? 0) - (t.away?.goals?.against ?? 0),
        form: t.away?.form ? t.away.form.split("").slice(0, 5) : [],
      }));
    }

    filtered.sort((a, b) => b.points - a.points || b.diff - a.diff);
    return filtered.map((t, i) => ({ ...t, rank: i + 1 }));
  };

  // Se alcune stagioni sono disponibili solo in "completa", gestiscile qui
  const stagioniSoloComplete = ["2024-2025", "2025-2026"];
  const tabsDisponibili = stagioniSoloComplete.includes(season)
    ? ["completa"]
    : ["completa", "casa", "trasferta"];

  return (
    <Layout>
      <Head>
        <title>Classifica Ligue 2 Francia | SportWhisp</title>
        <meta
          name="description"
          content="Classifica Ligue 2 francese aggiornata: punti, differenza reti, rendimento casa/trasferta e forma. Statistiche aggiornate su SportWhisp."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sportwhisp.it/secondediv/fra2/classifica" />
        <meta property="og:title" content="Classifica Ligue 2 Francia | SportWhisp" />
        <meta
          property="og:description"
          content="Tabella Ligue 2 aggiornata con punti, diff reti, casa/trasferta e forma. Statistiche complete su SportWhisp."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sportwhisp.it/secondediv/fra2/classifica" />
        <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
      </Head>

      <h1>Classifica Ligue 2 {season}</h1>
      <p>
        La <strong>Ligue 2</strong> è un campionato equilibrato e competitivo, dove club storici e realtà emergenti
        inseguono la promozione in Ligue 1. La corsa ai primi posti e la lotta salvezza rendono ogni giornata densa di
        significato, con continui cambi di gerarchie. Qui trovi la classifica aggiornata con punti, differenza reti,
        rendimento casa/trasferta e stato di forma recente.
      </p>

      <SeasonSelector country={LEAGUE} season={season} setSeason={setSeason} />

      <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
        {tabsDisponibili.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: tab === t ? "#64b5f6" : "#2f3336",
              color: "#fff",
              padding: "8px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {t === "completa"
              ? "Classifica Completa"
              : t === "casa"
              ? "Classifica Casa"
              : "Classifica Trasferta"}
          </button>
        ))}
      </div>

      <TableClassifica
        standings={getFilteredStandings()}
        titolo={`Classifica ${tab}`}
        renderForma={(form) => <FormIndicator form={form} />}
      />
    </Layout>
  );
}