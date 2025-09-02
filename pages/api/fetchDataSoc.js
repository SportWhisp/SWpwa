import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { league } = req.query;

  if (!league) {
    return res.status(400).json({ error: "Parametro 'league' obbligatorio." });
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
    india: 250, indonesia: 251, italia: 253, ita12: 254, coppa_italia: 255,
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

  const leagueId = LEAGUE_IDS[league];
  if (!leagueId) {
    return res.status(400).json({ error: `Lega '${league}' non supportata.` });
  }

  const API_KEY = process.env.API_SOCCERDATA_KEY;

  try {
    // 🔁 Recupera classifica stagione attiva
    const url = `https://api.soccerdataapi.com/standing/?league_id=${leagueId}&auth_token=${API_KEY}`;
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip"
      }
    });

    if (!resp.ok) {
      const errTxt = await resp.text();
      return res.status(resp.status).json({ error: "Errore API (stagione attiva)", details: errTxt });
    }

    const standingsData = await resp.json();

    // 🧠 Estrai stagione attiva dal JSON restituito
    const seasonYear = standingsData?.season?.year;

    if (!seasonYear) {
      return res.status(500).json({ error: "Impossibile determinare l'anno della stagione attiva." });
    }

    // 📁 Costruisci path del file da salvare
    const folderPath = path.join(process.cwd(), "data", league);
    const fileName = `standings-${league}-${seasonYear}.json`;
    const filePath = path.join(folderPath, fileName);

    // 📦 Crea la cartella se non esiste
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // 💾 Scrivi il file
    fs.writeFileSync(filePath, JSON.stringify(standingsData, null, 2), "utf-8");

    res.status(200).json({
      message: `Dati salvati in ${filePath}`,
      saved: true,
      file: fileName,
      data: standingsData
    });
  } catch (error) {
    console.error("Errore fetchDataSoc:", error);
    res.status(500).json({ error: "Errore interno", details: error.message });
  }
}