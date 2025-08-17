import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const LEAGUE = "olanda";
const SEASON = "2023-2024";
const FILE_NAME = `results-${LEAGUE}-${SEASON}.json`;

export default function RisultatiEredivisieAdmin() {
  const [matches, setMatches] = useState([]);
  const [source, setSource] = useState("");

  useEffect(() => {
    fetch(`/api/readResult?league=${LEAGUE}&file=${FILE_NAME}`)
      .then((res) => res.json())
      .then((data) => {
        let parsed = [];

        // ✅ Parsing dei risultati API-Football per Eredivisie
        if (data?.response) {
          parsed = data.response.map((m) => ({
            id: m.fixture.id,
            date: m.fixture.date,
            round: m.league.round,
            home: m.teams.home.name,
            away: m.teams.away.name,
            homeGoals: m.goals.home,
            awayGoals: m.goals.away,
            status: m.fixture.status.long
          }));
        }

        setMatches(parsed);
        setSource("API-FOOTBALL");
      })
      .catch((err) => console.error("❌ Errore nel caricamento risultati Eredivisie:", err));
  }, []);

  return (
    <Layout>
      <h1>Risultati Eredivisie {SEASON} (ADMIN)</h1>
      {source && <p><i>Dati forniti da {source}</i></p>}
      {matches.length === 0 ? (
        <p>Nessun risultato disponibile.</p>
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