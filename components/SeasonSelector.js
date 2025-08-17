import { useEffect, useState } from "react";

export default function SeasonSelector({ country, season, setSeason }) {
  const [availableSeasons, setAvailableSeasons] = useState([]);

  useEffect(() => {
    fetch(`/api/listSeasons?country=${country}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.seasons)) {
          setAvailableSeasons(data.seasons);
          // ✅ Se la stagione passata non esiste, usa la più recente
          if (!data.seasons.includes(season)) {
            setSeason(data.seasons[0]);
          }
        }
      })
      .catch((err) => console.error("Errore caricamento stagioni:", err));
  }, [country]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ fontWeight: "bold", marginRight: "10px" }}>Seleziona stagione:</label>
      <select
        value={season}
        onChange={(e) => setSeason(e.target.value)}
        style={{ padding: "5px" }}
      >
        {availableSeasons.length > 0 ? (
          availableSeasons.map((s) => (
            <option key={s} value={s}>
              {s.replace("-", "/")}
            </option>
          ))
        ) : (
          <option>Caricamento stagioni...</option>
        )}
      </select>
    </div>
  );
}