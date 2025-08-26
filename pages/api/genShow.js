import fs from "fs";
import path from "path";

function arrotondaPersonalizzato(numero) {
  const int = Math.floor(numero);
  const decimale = numero - int;
  return decimale >= 0.66 ? int + 1 : int;
}

function mediaPrevisione(gfHome, gsAway) {
  const values = gfHome.concat(gsAway).filter(v => !isNaN(v));
  if (values.length === 0) return 0;
  const media = values.reduce((a, b) => a + b, 0) / values.length;
  return arrotondaPersonalizzato(media);
}

function sumKeys(obj, keys) {
  return keys.reduce((acc, k) => acc + (obj[k] || 0), 0);
}

function formatPercent(value, total) {
  if (total === 0) return "0%";
  return ((value / total) * 100).toFixed(2).replace(".", ",") + "%";
}

function adjustPercents(x, y, percents) {
  let { p1, pX, p2, pUnder, pOver, pGG, pNG } = percents;
  let n1 = parseFloat(p1.replace(",", "."));
  let nX = parseFloat(pX.replace(",", "."));
  let n2 = parseFloat(p2.replace(",", "."));
  let u = parseFloat(pUnder.replace(",", "."));
  let o = parseFloat(pOver.replace(",", "."));
  let g = parseFloat(pGG.replace(",", "."));
  let ng = parseFloat(pNG.replace(",", "."));

  if (x > y) {
    n1 += 5; n2 -= 5;
  } else if (x < y) {
    n2 += 5; n1 -= 5;
  } else {
    nX += 5; n1 -= 2.5; n2 -= 2.5;
  }

  if (x + y < 2.5) {
    u += 5; o -= 5;
  } else if (x + y > 2.5) {
    o += 5; u -= 5;
  }

  if (x > 0 && y > 0) {
    g += 5; ng -= 5;
  } else {
    ng += 5; g -= 5;
  }

  return {
    p1: n1.toFixed(2).replace(".", ",") + "%",
    pX: nX.toFixed(2).replace(".", ",") + "%",
    p2: n2.toFixed(2).replace(".", ",") + "%",
    pUnder: u.toFixed(2).replace(".", ",") + "%",
    pOver: o.toFixed(2).replace(".", ",") + "%",
    pGG: g.toFixed(2).replace(".", ",") + "%",
    pNG: ng.toFixed(2).replace(".", ",") + "%"
  };
}

export default function handler(req, res) {
  const nazione = req.query.nazione;
  if (!nazione) return res.status(400).json({ error: "Parametro 'nazione' mancante." });

  const base = path.join(process.cwd(), "data", nazione);
  const pathResults = path.join(base, "results", `results-${nazione}-2025-2026.json`);
  const pathAna = path.join(base, "results", `Ana${capitalize(nazione)}.json`);
  const pathSto = path.join(base, `Sto${capitalize(nazione)}.json`);

  let results, anaData, stoData;
  try {
    results = JSON.parse(fs.readFileSync(pathResults, "utf-8"));
    anaData = JSON.parse(fs.readFileSync(pathAna, "utf-8"));
    stoData = JSON.parse(fs.readFileSync(pathSto, "utf-8"));
  } catch (err) {
    return res.status(500).json({ error: "Errore nella lettura dei file." });
  }

  const allMatches = results.matches || [];
  const notFinished = allMatches.filter(m => m.status !== "FINISHED");
  const nextDate = new Date(Math.min(...notFinished.map(m => new Date(m.utcDate))));
  const matchday = notFinished.find(m => new Date(m.utcDate).getTime() === nextDate.getTime())?.matchday;
  const matches = allMatches.filter(m => m.matchday === matchday);

  const getTeamStats = (name, dataset) => dataset.find(t => t.team === name) || {
    totale: {}, casa: {}, trasferta: {}, ultime5: {}, ultime5_casa: {}, ultime5_trasferta: {}
  };

  const mergeStats = (a, b) => {
    const out = {};
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (let key of keys) {
      out[key] = (a[key] || 0) + (b[key] || 0);
    }
    return out;
  };

  const dataOut = matches.map(match => {
    const home = match.homeTeam.name;
    const away = match.awayTeam.name;
    let statsHome = getTeamStats(home, anaData);
    let statsAway = getTeamStats(away, anaData);

    if (matchday <= 6) {
      const sHomeSto = getTeamStats(home, stoData);
      const sAwaySto = getTeamStats(away, stoData);
      statsHome = {
        totale: mergeStats(statsHome.totale, sHomeSto.totale),
        casa: mergeStats(statsHome.casa, sHomeSto.casa),
        trasferta: mergeStats(statsHome.trasferta, sHomeSto.trasferta),
        ultime5: mergeStats(statsHome.ultime5, sHomeSto.ultime5),
        ultime5_casa: mergeStats(statsHome.ultime5_casa, sHomeSto.ultime5_casa),
        ultime5_trasferta: mergeStats(statsHome.ultime5_trasferta, sHomeSto.ultime5_trasferta)
      };
      statsAway = {
        totale: mergeStats(statsAway.totale, sAwaySto.totale),
        casa: mergeStats(statsAway.casa, sAwaySto.casa),
        trasferta: mergeStats(statsAway.trasferta, sAwaySto.trasferta),
        ultime5: mergeStats(statsAway.ultime5, sAwaySto.ultime5),
        ultime5_casa: mergeStats(statsAway.ultime5_casa, sAwaySto.ultime5_casa),
        ultime5_trasferta: mergeStats(statsAway.ultime5_trasferta, sAwaySto.ultime5_trasferta)
      };
    }

    const col1 = sumKeys(statsHome.totale, ["V"]) + sumKeys(statsHome.casa, ["V"]) + sumKeys(statsHome.ultime5, ["V"]) + sumKeys(statsHome.ultime5_casa, ["V"]) + sumKeys(statsAway.totale, ["S"]) + sumKeys(statsAway.trasferta, ["S"]) + sumKeys(statsAway.ultime5, ["S"]) + sumKeys(statsAway.ultime5_trasferta, ["S"]);
    const colX = sumKeys(statsHome.totale, ["P"]) + sumKeys(statsHome.casa, ["P"]) + sumKeys(statsHome.ultime5, ["P"]) + sumKeys(statsHome.ultime5_casa, ["P"]) + sumKeys(statsAway.totale, ["P"]) + sumKeys(statsAway.trasferta, ["P"]) + sumKeys(statsAway.ultime5, ["P"]) + sumKeys(statsAway.ultime5_trasferta, ["P"]);
    const col2 = sumKeys(statsHome.totale, ["S"]) + sumKeys(statsHome.casa, ["S"]) + sumKeys(statsHome.ultime5, ["S"]) + sumKeys(statsHome.ultime5_casa, ["S"]) + sumKeys(statsAway.totale, ["V"]) + sumKeys(statsAway.trasferta, ["V"]) + sumKeys(statsAway.ultime5, ["V"]) + sumKeys(statsAway.ultime5_trasferta, ["V"]);
    const colUnder = sumKeys(statsHome.totale, ["UN"]) + sumKeys(statsHome.casa, ["UN"]) + sumKeys(statsHome.ultime5, ["UN"]) + sumKeys(statsHome.ultime5_casa, ["UN"]) + sumKeys(statsAway.totale, ["UN"]) + sumKeys(statsAway.trasferta, ["UN"]) + sumKeys(statsAway.ultime5, ["UN"]) + sumKeys(statsAway.ultime5_trasferta, ["UN"]);
    const colOver = sumKeys(statsHome.totale, ["OV"]) + sumKeys(statsHome.casa, ["OV"]) + sumKeys(statsHome.ultime5, ["OV"]) + sumKeys(statsHome.ultime5_casa, ["OV"]) + sumKeys(statsAway.totale, ["OV"]) + sumKeys(statsAway.trasferta, ["OV"]) + sumKeys(statsAway.ultime5, ["OV"]) + sumKeys(statsAway.ultime5_trasferta, ["OV"]);
    const colGG = sumKeys(statsHome.totale, ["GG"]) + sumKeys(statsHome.casa, ["GG"]) + sumKeys(statsHome.ultime5, ["GG"]) + sumKeys(statsHome.ultime5_casa, ["GG"]) + sumKeys(statsAway.totale, ["GG"]) + sumKeys(statsAway.trasferta, ["GG"]) + sumKeys(statsAway.ultime5, ["GG"]) + sumKeys(statsAway.ultime5_trasferta, ["GG"]);
    const colNG = sumKeys(statsHome.totale, ["NG"]) + sumKeys(statsHome.casa, ["NG"]) + sumKeys(statsHome.ultime5, ["NG"]) + sumKeys(statsHome.ultime5_casa, ["NG"]) + sumKeys(statsAway.totale, ["NG"]) + sumKeys(statsAway.trasferta, ["NG"]) + sumKeys(statsAway.ultime5, ["NG"]) + sumKeys(statsAway.ultime5_trasferta, ["NG"]);

    const total = col1 + colX + col2;
    const p1 = formatPercent(col1, total);
    const pX = formatPercent(colX, total);
    const p2 = formatPercent(col2, total);
    const pUnder = formatPercent(colUnder, total);
    const pOver = formatPercent(colOver, total);
    const pGG = formatPercent(colGG, total);
    const pNG = formatPercent(colNG, total);

    const pg5h = statsHome.ultime5_casa.PG || 1;
    const pg5a = statsAway.ultime5_trasferta.PG || 1;

    const x = mediaPrevisione([
      statsHome.totale.GF / (statsHome.totale.PG || 1),
      statsHome.casa.GF / (statsHome.casa.PG || 1),
      statsHome.ultime5.GF / 5,
      statsHome.ultime5_casa.GF / pg5h
    ], [
      statsAway.totale.GS / (statsAway.totale.PG || 1),
      statsAway.trasferta.GS / (statsAway.trasferta.PG || 1),
      statsAway.ultime5.GS / 5,
      statsAway.ultime5_trasferta.GS / pg5a
    ]);

    const y = mediaPrevisione([
      statsAway.totale.GF / (statsAway.totale.PG || 1),
      statsAway.trasferta.GF / (statsAway.trasferta.PG || 1),
      statsAway.ultime5.GF / 5,
      statsAway.ultime5_trasferta.GF / pg5a
    ], [
      statsHome.totale.GS / (statsHome.totale.PG || 1),
      statsHome.casa.GS / (statsHome.casa.PG || 1),
      statsHome.ultime5.GS / 5,
      statsHome.ultime5_casa.GS / pg5h
    ]);

    const adjusted = adjustPercents(x, y, { p1, pX, p2, pUnder, pOver, pGG, pNG });

    const result = match.score?.fullTime?.home !== null && match.score?.fullTime?.home !== undefined ? `${match.score.fullTime.home}-${match.score.fullTime.away}` : "";

    return {
      data: match.utcDate,
      partita: `${home} vs ${away}`,
      risultato: result,
      previsione: `${x} - ${y}`,
      ...adjusted
    };
  });

  const outPath = path.join(base, `Show${capitalize(nazione)}.json`);
  fs.writeFileSync(outPath, JSON.stringify(dataOut, null, 2));

  return res.status(200).json({ message: `File Show${capitalize(nazione)}.json generato.` });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}