import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SeasonSelector from "@/components/SeasonSelector";
import TableClassifica from "@/components/TableClassifica";
import FormIndicator from "@/components/FormIndicator";

export default function ClassificaAustriaPubblica() {
  const [season, setSeason] = useState("2025-2026");
  const [rawGroups, setRawGroups] = useState({});
  const [tab, setTab] = useState("completa");
  const LEAGUE = "austria";

  const getFileName = (s) => `standings-${LEAGUE}-${s}.json`;

  useEffect(() => {
    if (!season) return;

    fetch(`/api/readData?league=${LEAGUE}&file=${getFileName(season)}`)
      .then((res) => res.json())
      .then((data) => {
        let groups = {};

        if (season === "2023-2024" && data?.response?.[0]?.league?.standings) {
          for (const group of data.response[0].league.standings) {
            if (group?.[0]?.group) {
              const groupName = group[0].group;
              groups[groupName] = group.map((t) => ({
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
                away: t.away
              }));
            }
          }
        } else {
          // Altre stagioni: struttura classica, tutta in un unico gruppo
          let parsed = [];

          // API-FOOTBALL
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
              away: t.away
            }));
          }

          // SoccerDataAPI
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
              away: null
            }));
          }

          groups["Classifica"] = parsed;
        }

        setRawGroups(groups);
      })
      .catch((err) => console.error("Errore caricamento classifica:", err));
  }, [season]);

  const getFilteredStandings = (rawStandings) => {
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
        form: t.home?.form ? t.home.form.split("").slice(0, 5) : []
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
        form: t.away?.form ? t.away.form.split("").slice(0, 5) : []
      }));
    }

    filtered.sort((a, b) => b.points - a.points || b.diff - a.diff);
    return filtered.map((t, i) => ({ ...t, rank: i + 1 }));
  };

  const stagioniSoloComplete = ["2024-2025", "2025-2026"];
  const tabsDisponibili = stagioniSoloComplete.includes(season)
    ? ["completa"]
    : ["completa", "casa", "trasferta"];

  return (
    <Layout>
      <h1>Classifica Bundesliga Austriaca {season}</h1>
      <p>
        La Bundesliga austriaca è il massimo torneo calcistico nazionale e negli ultimi anni è stata dominata dal 
        Red Bull Salisburgo, capace di imporre un modello di gioco moderno e vincente. Alle sue spalle, club storici 
        come il Rapid Vienna, l’Austria Vienna e lo Sturm Graz cercano di interrompere l’egemonia e di ritagliarsi 
        spazio in Europa.
        <br />
        La classifica della Bundesliga austriaca riflette un campionato che, pur meno mediatico rispetto ad altri, 
        è diventato una fucina di giovani talenti destinati a emergere nei principali palcoscenici internazionali. 
        La corsa al titolo, alle coppe europee e alla salvezza rende ogni stagione ricca di spunti e di sorprese.
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
              cursor: "pointer"
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

      {Object.entries(rawGroups).map(([titolo, standings]) => (
        <TableClassifica
          key={titolo}
          standings={getFilteredStandings(standings)}
          titolo={titolo.replace("Bundesliga: ", "")}
          renderForma={(form) => <FormIndicator form={form} />}
        />
      ))}
    </Layout>
  );
}