import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const LEAGUE = "francia";            // ✅ cartella dei dati
const SEASON = "2025-2026";          // ✅ stagione Ligue 1
const FILE_NAME = `results-${LEAGUE}-${SEASON}.json`;

export default function RisultatiLigue1_2025_2026() {
  const [matches, setMatches] = useState([]);
  const [source, setSource] = useState("");

  useEffect(() => {
    fetch(`/api/readResult?league=${LEAGUE}&file=${FILE_NAME}`)
      .then((res) => res.json())
      .then((data) => {
        let parsed = [];

        // ✅ Parsing per dati football-data.org
        if (data?.matches) {
          parsed = data.matches.map((m) => ({
            id: m.id,
            date: m.utcDate,
            round: m.matchday,
            home: m.homeTeam.name,
            away: m.awayTeam.name,
            homeGoals: m.score.fullTime.home ?? "-",
            awayGoals: m.score.fullTime.away ?? "-",
            status: m.status
          }));
        }

        setMatches(parsed);
        setSource("FOOTBALL-DATA.ORG");
      })
      .catch((err) => console.error("Errore nel caricamento risultati Ligue 1:", err));
  }, []);

  return (
    <Layout>
      <h1>Risultati Ligue 1 {SEASON} (Admin)</h1>
      {source && <p><i>Dati forniti da {source}</i></p>}

      {matches.length === 0 ? (
        <p>Nessun dato disponibile.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Data</th>
              <th>Giornata</th>
              <th>Casa</th>
              <th>Trasferta</th>
              <th>Risultato</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id}>
                <td>{new Date(match.date).toLocaleDateString()}</td>
                <td>{match.round}</td>
                <td>{match.home}</td>
                <td>{match.away}</td>
                <td>{match.homeGoals} - {match.awayGoals}</td>
                <td>{match.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}