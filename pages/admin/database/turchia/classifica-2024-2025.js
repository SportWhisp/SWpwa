import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const COUNTRY = "turchia";
const SEASON = "2024-2025";
const FILE_NAME = `standings-${COUNTRY}-${SEASON}.json`;

export default function ClassificaTurchia2024() {
  const [standings, setStandings] = useState([]);
  const [source, setSource] = useState("");

  useEffect(() => {
    fetch(`/api/readData?file=${COUNTRY}/${FILE_NAME}`)
      .then((res) => res.json())
      .then((data) => {
        let parsed = [];
        let origin = "";

        // ✅ Parsing SoccerDataAPI
        if (data?.stage?.[0]?.standings) {
          parsed = data.stage[0].standings.map((t) => ({
            rank: t.position,
            name: t.team_name,
            points: t.points,
            diff: (t.goals_for ?? 0) - (t.goals_against ?? 0),
            played: t.games_played ?? 0,
            win: t.wins ?? 0,
            draw: t.draws ?? 0,
            lose: t.losses ?? 0,
            gf: t.goals_for ?? 0,
            gs: t.goals_against ?? 0,
            form: [] // ✅ SoccerDataAPI non fornisce la "forma" recente
          }));
          origin = "SoccerDataAPI";
        }

        setStandings(parsed);
        setSource(origin);
      })
      .catch((err) => console.error("Errore nel caricamento dati:", err));
  }, []);

  return (
    <Layout>
      <h1>Classifica Süper Lig {SEASON}</h1>
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
                <td>-</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}