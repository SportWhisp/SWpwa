import React, { useEffect, useRef, useState } from "react";

// ⚠️ Publisher ID AdSense
const AD_CLIENT = "ca-pub-2796727413305777";

// ID slot per posizione
// 728x90 (desktop)
const SLOT_DESKTOP = {
  left:   "1796807484",
  right:  "5090304793",
  middle: "1350084920",
  default:"8434368025",
};

// 320x100 (mobile) → INSERISCI qui i tuoi nuovi slot mobile
const SLOT_MOBILE = {
  left:   "1065485214",
  right:  "7886878580",
  middle: "2674930411",
  default:"6147239748",
};

export default function Banner({ position = "middle" }) {
  const [current, setCurrent] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pushedRef = useRef(false);

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

  return () => {
    window.removeEventListener("resize", onResize);
  };
}, []);

  // push dello slot AdSense
useEffect(() => {
  if (!isClient || pushedRef.current) return;
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    pushedRef.current = true;
  } catch {}
}, [isClient]);

  if (!isClient) return null;

  // dimensioni: desktop 728x90, mobile 320x100
  const adWidth  = isMobile ? 320 : 728;
  const adHeight = isMobile ? 100 : 90;

  // usa lo slot giusto per breakpoint
  const slots = isMobile ? SLOT_MOBILE : SLOT_DESKTOP;
  const adSlot = slots[position] || slots.default;

    // classi CSS (niente più banner-sticky)
  const bannerClass = position === "middle" ? "banner banner-middle" : "banner";

  return (
    <ins
      className={`adsbygoogle ${bannerClass}`}
      style={{ display: "block", width: `${adWidth}px`, height: `${adHeight}px`, overflow: "hidden" }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={adSlot}
      // niente data-ad-format / full-width → non si ridimensiona da solo
    >
    </ins>
  );
}