import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { country } = req.query; // es. "italia"
  if (!country) {
    return res.status(400).json({ error: "Parametro 'country' mancante" });
  }

  // ✅ cerca dentro la sottocartella del country
  const dirPath = path.join(process.cwd(), "data", country);

  try {
    if (!fs.existsSync(dirPath)) {
      return res.status(200).json({ seasons: [] });
    }

    const files = fs.readdirSync(dirPath);

    const seasons = files
      .filter((f) => f.startsWith(`standings-${country}-`) && f.endsWith(".json"))
      .map((f) => f.replace(`standings-${country}-`, "").replace(".json", ""))
      .sort((a, b) => b.localeCompare(a)); // più recente per prima

    res.status(200).json({ seasons });
  } catch (error) {
    res.status(500).json({ error: "Errore lettura cartella", details: error.message });
  }
}