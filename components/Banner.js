import React, { useEffect, useState } from "react";

export default function Banner({ position }) {
  const bannerSet = ["Pubblicità A", "Pubblicità B", "Pubblicità C", "Pubblicità D", "Pubblicità E"];
  const [current, setCurrent] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // ✅ siamo lato client
    setIsClient(true);

    // ✅ inizializza con pubblicità casuale
    setCurrent(Math.floor(Math.random() * bannerSet.length));

    // ✅ ritardo casuale per sfalsare i cambi
    const delay = Math.floor(Math.random() * 5000);

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % bannerSet.length);
      }, 60000);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const bannerClass =
  position === "sticky"
    ? "banner banner-sticky"
    : position === "middle"
    ? "banner banner-middle"
    : "banner";

  if (!isClient) return null;

  return <div className={bannerClass}>{bannerSet[current]}</div>;
}