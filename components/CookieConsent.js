import { useEffect, useState } from "react";

const CONSENT_KEY = "cookieConsentInfo";
const EXPIRY_MS = 1000 * 60 * 60 * 24 * 180; // 6 mesi in millisecondi

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const item = localStorage.getItem(CONSENT_KEY);
      if (item) {
        const { date } = JSON.parse(item);
        const expired = Date.now() - date > EXPIRY_MS;
        if (expired) {
          setVisible(true);
        }
      } else {
        // Nessun consenso salvato → mostra banner
        setVisible(true);
      }
    } catch {
      // Qualsiasi errore nella lettura → mostra banner
      setVisible(true);
    }
  }, []);

  const handleConsent = (accepted) => {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({
        status: accepted ? "accepted" : "rejected",
        date: Date.now(),
      })
    );
    setVisible(false);
    // 👉 Qui puoi attivare gli script (Google Ads ecc.) se accepted === true
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        Questo sito utilizza cookie per personalizzare i contenuti e gli annunci. È
        necessario il tuo consenso per attivarli.{" "}
        <a href="/cookie-policy" target="_blank" rel="noopener noreferrer">
          Leggi la cookie policy
        </a>.
      </p>
      <div className="cookie-buttons">
        <button onClick={() => handleConsent(true)}>Accetta</button>
        <button onClick={() => handleConsent(false)}>Rifiuta</button>
      </div>
    </div>
  );
}