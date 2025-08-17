import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { league, season, date } = req.query;

  if (!league || !season) {
    return res.status(400).json({ error: "Parametri 'league' e 'season' obbligatori" });
  }

  // ✅ Estrai solo il primo anno per API-Football
  const seasonForAPI = season.includes("-") ? season.split("-")[0] : season;

  // ✅ ID campionati API-Football
  const LEAGUE_IDS = {
    italia: 135,
    francia: 61,
    germania: 78,
    spagna: 140,
    inghilterra: 39,
    portogallo: 94,
    olanda: 88,
    turchia: 203,
    belgio: 144,
    grecia: 197,
    austria: 218,
    danimarca: 120,   // Superliga
    polonia: 106,     // Ekstraklasa
    romania: 283,     // Liga I
    svizzera: 207,    // Super League
    ungheria: 2184    // NB I (Nemzeti Bajnokság I)
  };

  const API_KEY = process.env.API_FOOTBALL_KEY;
  const leagueId = LEAGUE_IDS[league];

  if (!leagueId) {
    return res.status(400).json({ error: `Lega '${league}' non supportata` });
  }

  // ✅ Costruisci URL API per i risultati
  let url = `https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${seasonForAPI}`;
  if (date) {
    url += `&date=${date}`; // es. "2024-08-20" se si vogliono solo i risultati di un giorno
  }

  // ✅ Percorso di salvataggio
  const folderPath = path.join(process.cwd(), "data", league, "results");
  const fileName = `results-${league}-${season}${date ? `-${date}` : ""}.json`;
  const filePath = path.join(folderPath, fileName);

  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    console.log("📡 Fetching results:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: { "x-apisports-key": API_KEY },
    });

    const data = await response.json();

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    res.status(200).json({
      message: `✅ Risultati salvati correttamente in ${filePath}`,
      usedSeasonForAPI: seasonForAPI,
      savedAs: fileName,
      saved: true,
    });
  } catch (error) {
    console.error("❌ Errore nel salvataggio risultati:", error);
    res.status(500).json({ error: "Errore nel recupero/salvataggio risultati", details: error.message });
  }
}