import React, { useEffect, useRef, useState } from "react";

// ⚠️ Publisher ID AdSense
const AD_CLIENT = "ca-pub-2796727413305777";

// ID slot per posizione
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
  const [isMobile, setIsMobile] = useState(false);
  const pushedRef = useRef(false);

  // fallback testuale
  const bannerSet = ["Pubblicità A", "Pubblicità B", "Pubblicità C", "Pubblicità D", "Pubblicità E"];

  useEffect(() => {
    setIsClient(true);
    setCurrent(Math.floor(Math.random() * bannerSet.length));

    // rileva mobile/desktop
    const checkMobile = () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(max-width: 768px)").matches;

    setIsMobile(checkMobile());
    const onResize = () => setIsMobile(checkMobile());
    window.addEventListener("resize", onResize);

    // rotazione ogni 60s (con ritardo casuale)
    const delay = Math.floor(Math.random() * 5000);
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % bannerSet.length);
      }, 60000);
      return () => clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
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
        } catch {}
      }
    };

    tryPush();
    const t = setTimeout(tryPush, 1500);
    return () => clearTimeout(t);
  }, [isClient]);

  // classi CSS
  const bannerClass =
    position === "sticky"
      ? "banner-sticky"
      : position === "middle"
      ? "banner banner-middle"
      : "banner";

  if (!isClient) return null;

  // Sticky: niente AdSense (solo placeholder, conforme)
  if (position === "sticky") {
    return <div className="banner-sticky">{bannerSet[current]}</div>;
  }

  // dimensioni: desktop 728x90, mobile 320x100
  const adWidth  = isMobile ? 320 : 728;
  const adHeight = isMobile ? 100 : 90;

  const adSlot = SLOT_BY_POSITION[position] || SLOT_BY_POSITION.default;

  return (
    <ins
      className={`adsbygoogle ${bannerClass}`}
      style={{ display: "block", width: `${adWidth}px`, height: `${adHeight}px`, overflow: "hidden" }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={adSlot}
      // niente data-ad-format / full-width → non si ridimensiona da solo
    >
      {bannerSet[current]}
    </ins>
  );
}