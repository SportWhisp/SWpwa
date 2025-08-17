import React, { useEffect, useRef, useState } from "react";

// ⚠️ Sostituisci col tuo Publisher ID AdSense (formato: pub-1234567890123456)
const AD_CLIENT = "ca-pub-2796727413305777";

// (facoltativo ma consigliato) ID slot diversi per posizione
const SLOT_BY_POSITION = {
  left:   "1796807484",   // metti l'ID dello slot creato su AdSense
  right:  "5090304793",
  middle: "1350084920",
  sticky: "2060531364",
  default:"8434368025",
};

export default function Banner({ position = "middle" }) {
  const [current, setCurrent] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const pushedRef = useRef(false);

  // Fallback testuale (come avevi tu)
  const bannerSet = ["Pubblicità A", "Pubblicità B", "Pubblicità C", "Pubblicità D", "Pubblicità E"];

  useEffect(() => {
    setIsClient(true);

    // inizializza con pubblicità casuale
    setCurrent(Math.floor(Math.random() * bannerSet.length));

    // rotazione ogni 60s con un piccolo delay casuale (come avevi tu)
    const delay = Math.floor(Math.random() * 5000);
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % bannerSet.length);
      }, 60000);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prova a "pushare" lo slot quando disponibile
  useEffect(() => {
    if (!isClient || pushedRef.current) return;

    const tryPush = () => {
      if (typeof window === "undefined") return;
      // se lo script AdSense è caricato, window.adsbygoogle esiste
      if (window.adsbygoogle) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushedRef.current = true;
        } catch (e) {
          // ignora errori ripetitivi tipo "already processed"
        }
      }
    };

    tryPush();
    // un secondo tentativo dopo 1.5s (se lo script arriva in ritardo)
    const t = setTimeout(tryPush, 1500);
    return () => clearTimeout(t);
  }, [isClient]);

  const bannerClass =
    position === "sticky"
      ? "banner-sticky"
      : position === "middle"
      ? "banner banner-middle"
      : "banner";

  if (!isClient) return null;

  // Scegli lo slot in base alla posizione (se non c'è, usa default)
  const adSlot = SLOT_BY_POSITION[position] || SLOT_BY_POSITION.default;

  // ✅ Render di uno slot AdSense:
  // - se AdSense non è ancora pronto, il testo fallbackdentro  <ins> rimane visibile
  // - quando l’annuncio si carica, sostituisce il contenuto dell’<ins>

// Sticky: per policy AdSense, non serviamo un annuncio qui.
// Mostriamo solo il fallback testuale (o un tuo house-ad) fino all'attivazione degli Anchor Ads.
if (position === "sticky") {
  return <div className="banner-sticky">{bannerSet[current]}</div>;
}

  return (
    <ins
      className={`adsbygoogle ${bannerClass}`}
      // Lasciamo le dimensioni ai tuoi CSS (.banner, .banner-middle, .banner-sticky)
      style={{ display: "block", width: 728, height: 90 }} // forza 728x90
      data-ad-client={AD_CLIENT}
      data-ad-slot={adSlot}
    >
      {bannerSet[current]}
    </ins>
  );
}