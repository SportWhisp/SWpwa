import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const LEAGUE = "olanda";
const SEASON = "2024-2025";
const FILE_NAME = `standings-${LEAGUE}-${SEASON}.json`;

export default function ClassificaOlanda2024_2025() {
  const [standings, setStandings] = useState([]);
  const [source, setSource] = useState("");

  useEffect(() => {
    fetch(`/api/readData?league=${LEAGUE}&file=${FILE_NAME}`)
      .then((res) => res.json())
      .then((data) => {
        let parsed = [];

        if (data?.standings?.[0]?.table) {
          parsed = data.standings[0].table.map((t) => ({
            rank: t.position,
            name: t.team.name,
            points: t.points,
            diff: t.goalDifference,
            played: t.playedGames,
            win: t.won,
            draw: t.draw,
            lose: t.lost,
            gf: t.goalsFor,
            gs: t.goalsAgainst,
            form: t.form ? t.form.replace(/,/g, "") : ""
          }));
        }

        setStandings(parsed);
        setSource("FOOTBALL-DATA.ORG");
      })
      .catch((err) => console.error("Errore nel caricamento dati:", err));
  }, []);

  return (
    <Layout>
      <h1>Classifica Eredivisie {SEASON} (ADMIN)</h1>
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