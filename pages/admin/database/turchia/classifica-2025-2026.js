import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const LEAGUE = "turchia";
const SEASON = "2025-2026";
const FILE_NAME = `standings-${LEAGUE}-${SEASON}.json`;

export default function ClassificaTurchia2025_2026() {
  const [standings, setStandings] = useState([]);
  const [source, setSource] = useState("");

  useEffect(() => {
    fetch(`/api/readData?league=${LEAGUE}&file=${FILE_NAME}`)
      .then((res) => res.json())
      .then((data) => {
        let parsed = [];

        // ✅ Parsing corretto per SoccerDataAPI
        const stageStandings = data?.stage?.[0]?.standings || [];
        if (stageStandings.length > 0) {
          parsed = stageStandings.map((t) => ({
            rank: t.position,
            name: t.team_name,
            points: t.points,
            diff: (t.goals_for - t.goals_against),
            played: t.games_played,
            win: t.wins,
            draw: t.draws,
            lose: t.losses,
            gf: t.goals_for,
            gs: t.goals_against,
            form: t.form || ""
          }));
        }

        setStandings(parsed);
        setSource("SOCCERDATAAPI");
      })
      .catch((err) => console.error("Errore nel caricamento dati:", err));
  }, []);

  return (
    <Layout>
      <h1>Classifica Süper Lig {SEASON} (ADMIN)</h1>
      {source && <p><i>Dati forniti da {source}</i></p>}

      {standings.length === 0 ? (
        <p>Nessun dato disponibile.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Squadra</th>
              <th>G</th>
              <th>V</th>
              <th>N</th>
              <th>P</th>
              <th>GF</th>
              <th>GS</th>
              <th>Diff</th>
              <th>Punti</th>
              <th>Forma</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr key={team.rank}>
                <td>{team.rank}</td>
                <td>{team.name}</td>
                <td>{team.played}</td>
                <td>{team.win}</td>
                <td>{team.draw}</td>
                <td>{team.lose}</td>
                <td>{team.gf}</td>
                <td>{team.gs}</td>
                <td>{team.diff}</td>
                <td>{team.points}</td>
                <td>{team.form}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}