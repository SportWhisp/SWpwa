import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { league, file } = req.query;

  if (!league || !file) {
    return res.status(400).json({ error: "Parametri 'league' e 'file' sono obbligatori" });
  }

  // ✅ Percorso: /data/<league>/results/<file>
  const filePath = path.join(process.cwd(), "data", league, "results", file);

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: `File ${file} non trovato nella cartella results di ${league}` });
    }

    const fileData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(fileData);

    res.status(200).json(jsonData);
  } catch (error) {
    res.status(500).json({ error: "Errore di lettura file risultati", details: error.message });
  }
}