import React, { useEffect, useState } from "react";

export default function Database() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/readData")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Errore:", err));
  }, []);

  return (
    <div style={{ padding: "20px", background: "#f5f5f5" }}>
      <h1>Database (Dati Locali)</h1>
      {!data ? <p>Caricamento dati dal file...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}