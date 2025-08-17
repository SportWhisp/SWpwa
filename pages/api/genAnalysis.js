import fs from "fs";
import path from "path";

// --- Funzioni di supporto ---
function initStats() {
  return { PG: 0, V: 0, P: 0, S: 0, GF: 0, GS: 0, OV: 0, UN: 0, GG: 0, NG: 0 };
}

function updateStats(stats, gf, gs) {
  stats.PG++;
  if (gf > gs) stats.V++;
  else if (gf === gs) stats.P++;
  else stats.S++;

  stats.GF += gf;
  stats.GS += gs;

  const sommaGol = gf + gs;
  if (sommaGol > 2) stats.OV++;
  else stats.UN++;

  if (gf > 0 && gs > 0) stats.GG++;
  else stats.NG++;
}

function getLastMatches(matches, team, venue, count = 5) {
  let filtered = matches.filter(m => m.home === team || m.away === team);
  if (venue === "home") filtered = filtered.filter(m => m.home === team);
  if (venue === "away") filtered = filtered.filter(m => m.away === team);

  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  return filtered.slice(0, count);
}

function calcLastStats(matches, team, venue) {
  const stats = initStats();
  const last = getLastMatches(matches, team, venue);
  last.forEach(m => {
    const isHome = m.home === team;
    const gf = isHome ? m.homeScore : m.awayScore;
    const gs = isHome ? m.awayScore : m.homeScore;
    updateStats(stats, gf, gs);
  });
  return stats;
}

// --- API ROUTE ---
export default function handler(req, res) {
  try {
    const { league } = req.query;
    if (!league) {
      return res.status(400).json({ error: "Parametro ?league= obbligatorio (es. italia, francia)" });
    }

    // Percorsi file
    const inputPath = path.join(process.cwd(), `data/${league}/results/results-${league}-2025-2026.json`);
    const outputPath = path.join(process.cwd(), `data/${league}/results/Ana${league.charAt(0).toUpperCase() + league.slice(1)}.json`);

    if (!fs.existsSync(inputPath)) {
      return res.status(404).json({ error: `File di input non trovato: ${inputPath}` });
    }

    // Legge dati raw
    const raw = fs.readFileSync(inputPath, "utf-8");
    const json = JSON.parse(raw);
    const matchesRaw = json.matches;

    // Semplifica le partite FINITE
    const matches = matchesRaw
      .filter(m => m.status === "FINISHED")
      .map(m => ({
        date: m.utcDate,
        home: m.homeTeam.name,
        away: m.awayTeam.name,
        homeScore: m.score.fullTime.home,
        awayScore: m.score.fullTime.away
      }));

    // Lista squadre
    const teams = Array.from(new Set(matchesRaw.flatMap(m => [m.homeTeam.name, m.awayTeam.name])));

    // Calcola stats per ogni squadra
    const output = teams.map(team => {
      const totale = initStats();
      const casa = initStats();
      const trasferta = initStats();

      matches.forEach(m => {
        if (m.home === team) {
          updateStats(totale, m.homeScore, m.awayScore);
          updateStats(casa, m.homeScore, m.awayScore);
        } else if (m.away === team) {
          updateStats(totale, m.awayScore, m.homeScore);
          updateStats(trasferta, m.awayScore, m.homeScore);
        }
      });

      const ultime5 = calcLastStats(matches, team);
      const ultime5_casa = calcLastStats(matches, team, "home");
      const ultime5_trasferta = calcLastStats(matches, team, "away");

      return { team, totale, casa, trasferta, ultime5, ultime5_casa, ultime5_trasferta };
    });

    // Salva JSON
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), "utf-8");

    return res.status(200).json({
      message: `✅ Ana${league.charAt(0).toUpperCase() + league.slice(1)}.json generato`,
      squadre: output.length,
      file: outputPath
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Errore durante la generazione del file di analisi" });
  }
}