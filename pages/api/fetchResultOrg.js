import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { league, season } = req.query;

  if (!league || !season) {
    return res.status(400).json({ error: "Parametri 'league' e 'season' obbligatori" });
  }

  // ✅ Usa solo il primo anno per l'API
  const seasonForAPI = season.includes("-") ? season.split("-")[0] : season;

  // ✅ Codici campionati football-data.org
  const LEAGUE_CODES = {
    italia: "SA",
    francia: "FL1",
    germania: "BL1",
    spagna: "PD",
    inghilterra: "PL",
    portogallo: "PPL",
    olanda: "DED"
  };

  const API_KEY = process.env.API_FOOTBALLDATA_KEY;
  const leagueCode = LEAGUE_CODES[league];

  if (!API_KEY) {
    return res.status(500).json({ error: "API_FOOTBALLDATA_KEY non definita nel .env.local" });
  }

  if (!leagueCode) {
    return res.status(400).json({ error: `Lega '${league}' non supportata per football-data.org` });
  }

  // ✅ URL football-data.org per fixtures (risultati)
  const url = `https://api.football-data.org/v4/competitions/${leagueCode}/matches?season=${seasonForAPI}`;

  // ✅ Salva con nome chiaro
  const folderPath = path.join(process.cwd(), "data", league, "results");
  const fileName = `results-${league}-${season}.json`;
  const filePath = path.join(folderPath, fileName);

  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    console.log("📡 Fetching risultati:", url);
    const response = await fetch(url, {
      headers: { "X-Auth-Token": API_KEY },
    });

    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status}`);
    }

    const data = await response.json();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    res.status(200).json({
      message: `✅ Risultati salvati in ${filePath}`,
      api: "football-data.org",
      usedSeasonForAPI: seasonForAPI,
      savedAs: fileName,
      saved: true
    });
  } catch (error) {
    console.error("❌ Errore nel salvataggio risultati (football-data.org):", error);
    res.status(500).json({ error: "Errore nel recupero/salvataggio risultati", details: error.message });
  }
}