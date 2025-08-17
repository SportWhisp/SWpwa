import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const LEAGUE = "inghilterra";        // ✅ cartella della nazione
const SEASON = "2023-2024";
const FILE_NAME = `standings-${LEAGUE}-${SEASON}.json`;

export default function ClassificaInghilterraAdmin() {
  const [standings, setStandings] = useState([]);
  const [source, setSource] = useState("");

  useEffect(() => {
    fetch(`/api/readData?league=${LEAGUE}&file=${FILE_NAME}`)
      .then((res) => res.json())
      .then((data) => {
        let parsed = [];

        // ✅ Parsing SOLO per API-Football
        if (data?.response?.[0]?.league?.standings?.[0]) {
          parsed = data.response[0].league.standings[0].map((t) => ({
            rank: t.rank,
            name: t.team.name,
            points: t.points,
            diff: t.goalsDiff,
            played: t.all.played,
            win: t.all.win,
            draw: t.all.draw,
            lose: t.all.lose,
            gf: t.all.goals.for,
            gs: t.all.goals.against,
            form: t.form || ""
          }));
        }

        setStandings(parsed);
        setSource("API-FOOTBALL");
      })
      .catch((err) => console.error("Errore nel caricamento dati:", err));
  }, []);

  return (
    <Layout>
      <h1>Classifica Premier League {SEASON} (ADMIN)</h1>
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