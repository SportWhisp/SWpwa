import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const lega = req.query.league; // es: "turchia"
  const stagione = req.query.season || "2024-2025";

  const inputPath = path.join(
    process.cwd(),
    "data",
    lega,
    "results",
    `results-${lega}-${stagione}.json`
  );
  const outputPath = path.join(
    process.cwd(),
    "data",
    lega,
    `Sto${capitalize(lega)}.json`
  );

  try {
    const raw = fs.readFileSync(inputPath, "utf8");
    const data = JSON.parse(raw);

    const partite = data
  .flatMap(campionato => campionato.stage ?? [])
  .flatMap(stage => stage.matches ?? []);

    const teams = {};

    const aggiungi = (squadra, tipo, risultato) => {
      if (!teams[squadra]) {
        teams[squadra] = {
          team: squadra,
          totale: [],
          casa: [],
          trasferta: []
        };
      }
      teams[squadra][tipo].push(risultato);
    };

    for (const match of partite) {
      if (match.status?.toLowerCase() !== "finished") continue;

      const home = match.teams?.home?.name;
      const away = match.teams?.away?.name;
      if (!home || !away) continue;

      const gH = match.goals?.home_ft_goals ?? 0;
      const gA = match.goals?.away_ft_goals ?? 0;

      const risultatoHome = {
        gf: gH,
        gs: gA,
        v: gH > gA,
        n: gH === gA,
        s: gH < gA,
        ov: gH + gA >= 3,
        un: gH + gA <= 2,
        gg: gH > 0 && gA > 0,
        ng: gH === 0 || gA === 0,
        data: match.date
      };

      const risultatoAway = {
        gf: gA,
        gs: gH,
        v: gA > gH,
        n: gA === gH,
        s: gA < gH,
        ov: gH + gA >= 3,
        un: gH + gA <= 2,
        gg: gH > 0 && gA > 0,
        ng: gH === 0 || gA === 0,
        data: match.date
      };

      aggiungi(home, "totale", risultatoHome);
      aggiungi(home, "casa", risultatoHome);

      aggiungi(away, "totale", risultatoAway);
      aggiungi(away, "trasferta", risultatoAway);
    }

    const final = [];

    for (const team in teams) {
      const dati = {
        team,
        totale: calcolaStats(teams[team].totale),
        casa: calcolaStats(teams[team].casa),
        trasferta: calcolaStats(teams[team].trasferta),
        ultime5: calcolaStats(teams[team].totale.slice(-5)),
        ultime5_casa: calcolaStats(teams[team].casa.slice(-5)),
        ultime5_trasferta: calcolaStats(teams[team].trasferta.slice(-5))
      };
      final.push(dati);
    }

    fs.writeFileSync(outputPath, JSON.stringify(final, null, 2));
    res.status(200).json({ message: "File generato con successo", outputPath });
  } catch (error) {
    console.error("Errore:", error);
    res.status(500).json({ error: "Errore nella generazione del file storico" });
  }
}

function calcolaStats(array) {
  const stats = {
    PG: array.length,
    V: 0,
    P: 0,
    S: 0,
    GF: 0,
    GS: 0,
    OV: 0,
    UN: 0,
    GG: 0,
    NG: 0
  };

  for (const r of array) {
    stats.V += r.v ? 1 : 0;
    stats.P += r.n ? 1 : 0;
    stats.S += r.s ? 1 : 0;
    stats.GF += r.gf;
    stats.GS += r.gs;
    stats.OV += r.ov ? 1 : 0;
    stats.UN += r.un ? 1 : 0;
    stats.GG += r.gg ? 1 : 0;
    stats.NG += r.ng ? 1 : 0;
  }

  return stats;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}