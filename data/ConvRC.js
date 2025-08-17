import fs from "fs";
import path from "path";

// ✅ Calcolo classifica
function generaClassifica(matches) {
  const stats = {};
  const tutteLeSquadre = new Set();

  for (const match of matches) {
    const home = match.teams.home;
    const away = match.teams.away;

    tutteLeSquadre.add(home.name);
    tutteLeSquadre.add(away.name);

    if (match.status !== "finished") continue;

    const golCasa = match.goals.home_ft_goals;
    const golTrasferta = match.goals.away_ft_goals;

    // Inizializza squadre
    if (!stats[home.name]) {
      stats[home.name] = {
        team_id: home.id || null,
        team_name: home.name,
        games_played: 0,
        points: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goals_for: 0,
        goals_against: 0
      };
    }
    if (!stats[away.name]) {
      stats[away.name] = {
        team_id: away.id || null,
        team_name: away.name,
        games_played: 0,
        points: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goals_for: 0,
        goals_against: 0
      };
    }

    // Aggiorna stats
    stats[home.name].games_played += 1;
    stats[away.name].games_played += 1;

    stats[home.name].goals_for += golCasa;
    stats[home.name].goals_against += golTrasferta;

    stats[away.name].goals_for += golTrasferta;
    stats[away.name].goals_against += golCasa;

    if (golCasa > golTrasferta) {
      stats[home.name].wins += 1;
      stats[home.name].points += 3;
      stats[away.name].losses += 1;
    } else if (golCasa < golTrasferta) {
      stats[away.name].wins += 1;
      stats[away.name].points += 3;
      stats[home.name].losses += 1;
    } else {
      stats[home.name].draws += 1;
      stats[away.name].draws += 1;
      stats[home.name].points += 1;
      stats[away.name].points += 1;
    }
  }

  // Aggiungi squadre con 0 partite
  for (const team of tutteLeSquadre) {
    if (!stats[team]) {
      stats[team] = {
        team_id: null,
        team_name: team,
        games_played: 0,
        points: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goals_for: 0,
        goals_against: 0
      };
    }
  }

  const standings = Object.values(stats);

  standings.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const diffA = a.goals_for - a.goals_against;
    const diffB = b.goals_for - b.goals_against;
    if (diffB !== diffA) return diffB - diffA;
    if (b.goals_for !== a.goals_for) return b.goals_for - a.goals_for;
    return a.team_name.localeCompare(b.team_name);
  });

  // Assegna posizione e campo vuoto per position_attribute
  standings.forEach((team, index) => {
    team.position = index + 1;
    team.position_attribute = "";
  });

  return standings;
}

// ✅ Esecuzione terminale
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("❌ Specificare il file di input JSON come argomento.");
  process.exit(1);
}

const inputPath = args[0];
if (!fs.existsSync(inputPath)) {
  console.error("❌ File non trovato:", inputPath);
  process.exit(1);
}

const rawData = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
const root = Array.isArray(rawData) ? rawData[0] : rawData;

const matches = root?.stage?.[0]?.matches;
if (!matches || !Array.isArray(matches)) {
  console.error("❌ Errore: Formato file non valido. 'matches' non trovati.");
  process.exit(1);
}

const standings = generaClassifica(matches);

// ✅ Costruisci struttura compatibile
const fullOutput = {
  country: root.country || { id: 0, name: "unknown" },
  league: root.league || { id: 0, name: "unknown" },
  season: root.season || { is_active: false, year: "stagione" },
  stage: [
    {
      stage_id: root.stage?.[0]?.stage_id || 0,
      stage_name: root.stage?.[0]?.stage_name || "Regular Season",
      has_groups: false,
      is_active: true,
      standings
    }
  ]
};

// ✅ Mappa nomi inglesi → cartelle italiane
const ITALIA_MAP = {
  turkey: "turchia",
  italy: "italia",
  england: "inghilterra",
  france: "francia",
  spain: "spagna",
  germany: "germania",
  portugal: "portogallo",
  netherlands: "olanda",
  romania: "romania",
  albania: "albania",
  austria: "austria",
  greece: "grecia",
  belgio: "belgio",
  armenia: "armenia",
  azerbaijan: "azerbaijan",
  bosnia: "bosnia",
  bulgaria: "bulgaria",
  croatia: "croazia",
  cyprus: "cipro",
  "czech republic": "repceca",
  denmark: "danimarca",
  egypt: "egitto",
  estonia: "estonia",
  hungary: "ungheria",
  malta: "malta",
  mexico: "messico",
  marocco: "marocco",
  "northern ireland": "nordirlanda",
  russia: "russia",
  "saudi arabia": "arabia",
  scotland: "scozia",
  serbia: "serbia",
  slovakia: "slovacchia",
  slovenia: "slovenia",
  "south africa": "sudafrica",
  switzerland: "svizzera",
  ukraine: "ucraina"
};

const countryName = root.country?.name?.toLowerCase() || "lega";
const season = root.season?.year || "stagione";
const folder = ITALIA_MAP[countryName] || countryName;

const outputFile = `standings-${folder}-${season}.json`;
const outputPath = path.join("data", folder, outputFile);

if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(fullOutput, null, 2), "utf-8");
console.log(`✅ Classifica salvata in ${outputPath}`);