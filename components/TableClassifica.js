import React from "react";
import FormIndicator from "./FormIndicator";

// ✅ props: standings = array oggetti squadra
// Ogni elemento deve avere: { rank, name, logo, points, goalsFor, goalsAgainst, diff, played, win, draw, lose, form }
export default function TableClassifica({ standings = [], titolo = "Classifica" }) {
  return (
    <div style={{ background: "#f5f5f5", padding: "15px", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>{titolo}</h2>

      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr style={{ background: "#2f3336", color: "#fff" }}>
            <th style={th}>Pos</th>
            <th style={th}>Squadra</th>
            <th style={th}>G</th>
            <th style={th}>V</th>
            <th style={th}>N</th>
            <th style={th}>P</th>
            <th style={th}>GF</th>
            <th style={th}>GS</th>
            <th style={th}>Diff</th>
            <th style={th}>Punti</th>
            <th style={th}>Forma</th>
          </tr>
        </thead>
        <tbody>
          {standings.length === 0 ? (
            <tr>
              <td colSpan="11" style={{ textAlign: "center", padding: "10px", color: "#666" }}>
                Nessun dato disponibile
              </td>
            </tr>
          ) : (
            standings.map((team, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={td}>{team.rank}</td>
                <td style={{ ...td, display: "flex", alignItems: "center", gap: "8px" }}>
                  {team.logo && (
                   <img src={team.logo} alt={team.name} style={{ width: "22px", height: "22px" }} />
                  )}
                  {team.name}
               </td>
                <td style={td}>{team.played}</td>
                <td style={td}>{team.win}</td>
                <td style={td}>{team.draw}</td>
                <td style={td}>{team.lose}</td>
                <td style={td}>{team.goalsFor}</td>
                <td style={td}>{team.goalsAgainst}</td>
                <td style={td}>{team.diff}</td>
                <td style={{ ...td, fontWeight: "bold" }}>{team.points}</td>
                <td style={td}>
                  <FormIndicator form={team.form || []} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ✅ Stili di base
const th = {
  padding: "8px",
  border: "1px solid #444",
  fontSize: "0.9em"
};

const td = {
  padding: "6px",
  fontSize: "0.85em",
  textAlign: "center"
};