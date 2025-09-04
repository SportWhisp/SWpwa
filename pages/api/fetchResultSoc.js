import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { league, season } = req.query;

  if (!league || !season) {
    return res.status(400).json({ error: "Parametri 'league' e 'season' obbligatori" });
  }

  const seasonForAPI = season;
  const SOCCERDATA_TOKEN = process.env.API_SOCCERDATA_KEY;

  if (!SOCCERDATA_TOKEN) {
    return res.status(500).json({ error: "API_SOCCERDATA_KEY non definito nel .env.local" });
  }


  // ✅ Mappa ID campionati SoccerDataAPI
  const LEAGUE_IDS = {
    albania: 203, algeria: 204, andorra: 205, argentina: 206, armenia: 207,
    australia: 208, austria: 209, azerbaijan: 210, belarus: 211, belgio: 212,
    bolivia: 213, bosnia: 214, brasile_a: 215, brasile_b: 216, copa_brasile: 217,
    bulgaria: 199, canada: 197, cile: 219, cina: 181, colombia: 220,
    costarica: 221, croazia: 222, cipro: 223, repceca: 224, danimarca: 225,
    ecuador: 226, egitto: 227, inghilterra: 228, ing2: 229,
    fa_cup_inghilterra: 230, league_one_inghilterra: 231, league_two_inghilterra: 232,
    league_cup_inghilterra: 237, estonia: 200, champions_league: 310, europa_league: 326,
    conference_league: 198, euro_qualificazioni: 322, euro: 323, finlandia: 233,
    finlandia_ykkonen: 234, francia: 235, fra2: 236, coupe_francia: 238,
    georgia: 240, germania: 241, ger2: 242, dfb_pokal: 243, germania_3: 244,
    grecia: 245, guatemala: 246, honduras: 247, ungheria: 248, islanda: 249,
    india: 250, indonesia: 251, italia: 253, ita2: 254, coppa_italia: 255,
    giappone: 256, giappone_j2: 257, kazakistan: 258, corea: 259, lettonia: 260,
    lituania: 261, lussemburgo: 262, malesia: 263, malta: 264, messico: 265,
    moldavia: 266, marocco: 267, olanda: 268, ola2: 269, coppa_olanda: 270,
    macedonia: 271, nordirlanda: 272, norvegia: 273, norvegia_1: 274, coppa_norvegia: 275,
    panama: 276, paraguay: 277, peru: 278, polonia: 279, portogallo: 280,
    por2: 281, coppa_portogallo: 282, qatar: 283, romania: 286, russia: 287,
    arabia: 288, scozia: 289, scozia_2: 290, fa_cup_scozia: 291, serbia: 292,
    singapore: 293, slovacchia: 294, slovenia: 295, sudafrica: 296, spagna: 297,
    spa2: 298, coppa_spagna: 299, svezia: 300, svezia_2: 301, svizzera: 302,
    svizzera_2: 303, thailandia: 304, turchia: 305, ucraina: 306, uruguay: 307,
    venezuela: 308, galles: 309, usa_usl: 166, usa_mls: 168
  };

  const leagueKey = league.toLowerCase();
  const countryName = leagueKey; // stesso nome usato come chiave nel soccerdata_stages.json
  const leagueId = LEAGUE_IDS[leagueKey];

  // ✅ Leggi file stagioni salvate localmente
  const stagesPath = path.join(process.cwd(), "pages", "api", "data", "soccerdata_stages.json");
  let stagesData;
  try {
    stagesData = JSON.parse(fs.readFileSync(stagesPath, "utf-8"));
  } catch (err) {
    return res.status(500).json({ error: "Impossibile leggere soccerdata_stages.json", details: err.message });
  }

const stageId = stagesData[countryName]?.[season];

if (!stageId) {
  return res.status(400).json({
    error: "ID stage non trovato per la nazione e stagione specificata.",
    details: `(${countryName} - ${season})`
  });
}

  const url = `https://api.soccerdataapi.com/matches/?league_id=${leagueId}&season=${season}&auth_token=${SOCCERDATA_TOKEN}`;

  const folderPath = path.join(process.cwd(), "data", league, "results");
  const fileName = `results-${league}-${season}.json`;
  const filePath = path.join(folderPath, fileName);

  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    console.log("📡 Fetching risultati SoccerData:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip"
      }
    });

    if (!response.ok) {
      throw new Error(`Errore HTTP ${response.status}`);
    }

    const data = await response.json();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

    res.status(200).json({
      message: `✅ Risultati salvati in ${filePath}`,
      api: "soccerdataapi.com",
      stage_id: stageId,
      league_id: leagueId,
      savedAs: fileName,
      saved: true
    });
  } catch (error) {
    console.error("❌ Errore nel salvataggio risultati (SoccerData):", error);
    res.status(500).json({ error: "Errore nel recupero/salvataggio risultati", details: error.message });
  }
}