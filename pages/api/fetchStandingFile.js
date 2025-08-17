import fs from "fs";
import path from "path";

const leagueMap = {
  "135": "SA",     // Serie A
  "39": "PL",      // Premier League
  "140": "PD",     // La Liga
  "61": "FL1",     // Ligue 1
  "78": "BL1",     // Bundesliga
  "94": "PPL",     // Primeira Liga
  // 👉 Aggiungeremo altri campionati quando servirà
};

export default async function handler(req, res) {
  const { league, season, file } = req.query;

  if (!league || !season || !file) {
    return res.status(400).json({ error: "Parametri mancanti. Usa ?league=135&season=2024&file=standings-italia-2024-2025.json" });
  }

  const filePath = path.join(process.cwd(), "data", file);
  let data;

  try {
    // ✅ 1) Tenta API-Football
    try {
      const API_KEY = process.env.API_FOOTBALL_KEY;
      const url = `https://v3.football.api-sports.io/standings?league=${league}&season=${season}`;
      const response = await fetch(url, { headers: { "x-apisports-key": API_KEY } });
      data = await response.json();

      if (!data || data.results === 0 || data.errors?.plan) {
        throw new Error("API-FOOTBALL non ha fornito dati validi");
      }

      console.log(`✅ Dati ottenuti da API-FOOTBALL per ${file}`);
    } 
    catch (err) {
      // ✅ 2) Fallback: football-data.org
      console.warn(`⚠️ API-FOOTBALL fallita → uso fallback football-data.org`);

      const FOOTBALLDATA_KEY = process.env.API_FOOTBALLDATA_KEY;
      const compCode = leagueMap[league] || league; // 🔥 Conversione dinamica

      const url2 = `https://api.football-data.org/v4/competitions/${compCode}/standings?season=${season}`;
      const response2 = await fetch(url2, { headers: { "X-Auth-Token": FOOTBALLDATA_KEY } });
      data = await response2.json();

      if (!data || !data.standings) {
        throw new Error("Neanche football-data.org ha fornito dati validi");
      }

      console.log(`✅ Dati ottenuti da football-data.org per ${file}`);
    }

    // ✅ 3) Salvataggio su file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    res.status(200).json({ message: `Classifica salvata in ${file}`, source: data.standings ? "football-data.org" : "api-football" });

  } catch (error) {
    console.error("❌ Errore nel recupero/salvataggio:", error.message);
    res.status(500).json({ error: "Errore", details: error.message });
  }
}