import { useEffect, useState } from "react";

const CONSENT_KEY = "cookieConsentInfo";
const EXPIRY_MS = 1000 * 60 * 60 * 24 * 180; // 6 mesi in millisecondi

// ——— Consent Mode v2: helper minimal ———
function ensureGtag() {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
}

// Imposta i segnali di consenso (ad_storage, ad_user_data, ad_personalization)
function setConsent(status /* "granted" | "denied" */) {
  ensureGtag();
  const v = status === "granted" ? "granted" : "denied";
  window.gtag('consent', 'update', {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
  });
}

// Carica AdSense (una sola volta)
function loadAdSense(pubId) {
  if (document.getElementById('adsbygoogle-js')) return;
  const s = document.createElement('script');
  s.id = 'adsbygoogle-js';
  s.async = true;
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`;
  s.crossOrigin = 'anonymous';
  document.head.appendChild(s);
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
  try {
    const item = localStorage.getItem(CONSENT_KEY);
    if (item) {
      const { status, date } = JSON.parse(item);
      const expired = Date.now() - date > EXPIRY_MS;

      // 1) definiamo gtag e impostiamo il consenso in base allo stato salvato (o scaduto)
      ensureGtag();
      if (!expired && status === "accepted") {
        setConsent("granted");
      } else {
        setConsent("denied"); // default/expired → annunci NON personalizzati
      }

      // 2) carichiamo sempre AdSense: con "denied" servirà NPA/contestuali
      loadAdSense("pub-XXXXXXXXXXXXXXXX"); // <-- METTI IL TUO PUBLISHER ID

      // 3) mostra il banner solo se non c'è consenso valido
      setVisible(expired);
    } else {
      // Nessun consenso salvato → default "denied" + carico AdSense NPA + mostro banner
      ensureGtag();
      setConsent("denied");
      loadAdSense("pub-XXXXXXXXXXXXXXXX"); // <-- METTI IL TUO PUBLISHER ID
      setVisible(true);
    }
  } catch {
    // In caso di errore: fallback sicuro
    ensureGtag();
    setConsent("denied");
    loadAdSense("pub-XXXXXXXXXXXXXXXX"); // <-- METTI IL TUO PUBLISHER ID
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
  // aggiorna i segnali
  setConsent(accepted ? "granted" : "denied");
  setVisible(false);

  // (ri)inizializza eventuali slot già presenti
  window.adsbygoogle = window.adsbygoogle || [];
  try { window.adsbygoogle.push({}); } catch (e) {}
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