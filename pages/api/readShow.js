import fs from "fs/promises";
import path from "path";

/**
 * /api/readShow
 * Modalità supportate:
 *  - /api/readShow?nazione=italia         → legge data/italia/ShowItalia.json
 *  - /api/readShow?path=data/italia/ShowItalia.json  → percorso esplicito (opzionale)
 *
 * Sicuro per Vercel (server-side), compatibile con genShow.js e genShowSoc.js
 */
export default async function handler(req, res) {
  try {
    const { nazione, path: p } = req.query;

    let relPath = null;

    if (typeof p === "string" && p.length > 0) {
      // Uso del path esplicito (solo sotto /data e .json)
      if (!p.startsWith("data/") || !p.endsWith(".json") || p.includes("..")) {
        return res.status(400).json({ error: "Invalid path" });
      }
      relPath = p;
    } else if (typeof nazione === "string" && nazione.length > 0) {
      // Calcolo del path a partire dalla nazione (compatibile con entrambe le genShow)
      const cap = nazione.charAt(0).toUpperCase() + nazione.slice(1);
      relPath = `data/${nazione}/Show${cap}.json`;
    } else {
      return res.status(400).json({ error: "Provide ?nazione=... or ?path=..." });
    }

    const fullPath = path.join(process.cwd(), relPath);
    const raw = await fs.readFile(fullPath, "utf8");

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    // caching CDN 5 minuti + stale-while-revalidate 10 minuti (modifica pure a piacere)
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).send(raw);
  } catch (err) {
    return res.status(404).json({ error: "File not found" });
  }
}