import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { league, season } = req.query;

  if (!league || !season) {
    return res.status(400).json({ error: "Parametri 'league' e 'season' obbligatori" });
  }

  // ✅ Estrai solo il primo anno per API-Football
  const seasonForAPI = season.includes("-") ? season.split("-")[0] : season;

  // ✅ ID campionati API-Football
  const LEAGUE_IDS = {
    italia: 135,
    ita2: 136,
    francia: 61,
    fra2: 62,
    germania: 78,
    ger2:79,
    spagna: 140,
    spa2: 141,
    inghilterra: 39,
    ing2: 40,
    portogallo: 94,
    por2: 95,
    olanda: 88,
    ola2: 89,
    turchia: 203,
    belgio: 144,
    grecia: 197,
    austria: 218,
    danimarca: 120,   // Superliga
    polonia: 106,     // Ekstraklasa
    romania: 283,     // Liga I
    svizzera: 207,    // Super League
    ungheria: 2184,   // NB I (Nemzeti Bajnokság I)
    brasile: 71       // Serie A (Brasileirão)
  };

  const API_KEY = process.env.API_FOOTBALL_KEY;
  const leagueId = LEAGUE_IDS[league];

  if (!leagueId) {
    return res.status(400).json({ error: `Lega '${league}' non supportata` });
  }

  // ✅ URL corretto per API-Football
  const url = `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${seasonForAPI}`;

  // ✅ Percorso di salvataggio
  const folderPath = path.join(process.cwd(), "data", league);
  const fileName = `standings-${league}-${season}.json`;
  const filePath = path.join(folderPath, fileName);

  try {
    // ✅ crea la cartella se non esiste
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // ✅ Scarica dati dall'API
    console.log("📡 Fetching:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: { "x-apisports-key": API_KEY },
    });

    const data = await response.json();

    // ✅ Salva i dati in locale
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    res.status(200).json({
      message: `✅ Dati salvati correttamente in ${filePath}`,
      usedSeasonForAPI: seasonForAPI,
      savedAs: fileName,
      saved: true
    });
  } catch (error) {
    console.error("❌ Errore nel salvataggio dati:", error);
    res.status(500).json({ error: "Errore nel recupero/salvataggio dati", details: error.message });
  }
}