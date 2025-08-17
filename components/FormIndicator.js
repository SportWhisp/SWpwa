import React from "react";

// ✅ Colori per i vari risultati
const colors = {
  W: { bg: "#4CAF50", text: "V" }, // Vittoria → verde chiaro con V
  D: { bg: "#FFC107", text: "P" }, // Pareggio → giallo con P
  L: { bg: "#F44336", text: "S" }  // Sconfitta → rosso con S
};

export default function FormIndicator({ form = [] }) {
  // Prende solo gli ultimi 5 eventi (o meno se non disponibili)
  const recent = form.slice(0, 5);

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {recent.length === 0 ? (
        <span style={{ fontSize: "0.8em", color: "#777" }}>-</span> // Nessun evento
      ) : (
        recent.map((result, index) => {
          const info = colors[result] || null;
          if (!info) return null; // ignora valori non validi

          return (
            <div
              key={index}
              style={{
                width: "18px",
                height: "18px",
                backgroundColor: info.bg,
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.75em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "3px"
              }}
            >
              {info.text}
            </div>
          );
        })
      )}
    </div>
  );
}