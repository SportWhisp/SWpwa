import React, { useEffect, useRef, useState } from "react";

// ⚠️ Sostituisci col tuo Publisher ID AdSense
const AD_CLIENT = "ca-pub-2796727413305777";

// ID slot diversi per posizione
const SLOT_BY_POSITION = {
  left:   "1796807484",
  right:  "5090304793",
  middle: "1350084920",
  sticky: "2060531364",
  default:"8434368025",
};

export default function Banner({ position = "middle" }) {
  const [current, setCurrent] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const pushedRef = useRef(false);

  // fallback testuale
  const bannerSet = [
    "Pubblicità A",
    "Pubblicità B",
    "Pubblicità C",
    "Pubblicità D",
    "Pubblicità E"
  ];

  useEffect(() => {
    setIsClient(true);

    setCurrent(Math.floor(Math.random() * bannerSet.length));

    const delay = Math.floor(Math.random() * 5000);
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % bannerSet.length);
      }, 60000);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  // push dello slot AdSense
  useEffect(() => {
    if (!isClient || pushedRef.current) return;

    const tryPush = () => {
      if (typeof window === "undefined") return;
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

  const adSlot = SLOT_BY_POSITION[position] || SLOT_BY_POSITION.default;

  // Sticky: per ora mostriamo solo fallback
  if (position === "sticky") {
    return <div className="banner-sticky">{bannerSet[current]}</div>;
  }

  // ✅ Render slot AdSense con dimensioni fisse 728x90
  return (
    <ins
      className={`adsbygoogle ${bannerClass}`}
      style={{ display: "block", width: "728px", height: "90px" }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={adSlot}
    >
      {bannerSet[current]}
    </ins>
  );
}