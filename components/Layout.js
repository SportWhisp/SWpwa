import React from "react";
import Link from "next/link";
import Banner from "./Banner";

export default function Layout({ children }) {
  return (
    <div className="app-container">
      <header className="header">
        <Banner position="left" />
        <img src="/Logo.png" alt="SportWhisp Logo" className="logo" />
        <Banner position="right" />
      </header>

      {/* ✅ NAVBAR aggiornata con menu a tendina */}
      <nav className="navbar">
        <Link href="/">Home</Link>
        <Link href="/italia">Italia</Link>
        <Link href="/francia">Francia</Link>
        <Link href="/germania">Germania</Link>
        <Link href="/spagna">Spagna</Link>
        <Link href="/inghilterra">Inghilterra</Link>
        <Link href="/portogallo">Portogallo</Link>
        <Link href="/olanda">Olanda</Link>
        <Link href="/turchia">Turchia</Link>

        {/* 🔽 Dropdown "Altri Campionati" */}
        <div className="dropdown">
          <span className="dropbtn">Altri Campionati ▾</span>
          <div className="dropdown-content">
            <Link href="/altricampionati/austria">Austria</Link>
            <Link href="/altricampionati/belgio">Belgio</Link>
            <Link href="/altricampionati/danimarca">Danimarca</Link>
            <Link href="/altricampionati/grecia">Grecia</Link>
            <Link href="/altricampionati/polonia">Polonia</Link>
            <Link href="/altricampionati/romania">Romania</Link>
            <Link href="/altricampionati/svizzera">Svizzera</Link>
            <Link href="/altricampionati/ungheria">Ungheria</Link>
          </div>
        </div>

        {/* 🔽 Dropdown "Seconde Divisioni" */}
        <div className="dropdown">
          <span className="dropbtn">Seconde Divisioni ▾</span>
          <div className="dropdown-content">
            <Link href="/secondediv/ita2">Serie B - ITA</Link>
            <Link href="/secondediv/fra2">Ligue 2 - FRA</Link>
            <Link href="/secondediv/ger2">2. Bundesliga - GER</Link>
            <Link href="/secondediv/spa2">Segunda Divisiòn - SPA</Link>
            <Link href="/secondediv/ing2">Championship - ING</Link>
            <Link href="/secondediv/por2">Segunda Liga - POR</Link>
            <Link href="/secondediv/ola2">Eerste Divisie - OLA</Link>
          </div>
        </div>

        <Link href="/commenti">Whisp Precedenti</Link>

      </nav>

      <main className="content">{children}</main>

      <footer className="footer">
        <p className="disclaimer" style={{ textAlign: 'center' }}>
          Le previsioni pubblicate su questo sito sono frutto di elaborazioni personali
          basate su modelli statistici non ufficiali. I dati e i contenuti hanno scopo
          esclusivamente informativo e di intrattenimento. L’autore non garantisce
          l’esattezza delle previsioni e declina ogni responsabilità per decisioni prese
          dagli utenti sulla base delle informazioni fornite.
        </p>
        <p className="footer-links" style={{ textAlign: 'center' }}>
          <a href="/privacy-policy">Privacy Policy</a> | <a href="/cookie-policy">Cookie Policy</a> | © {new Date().getFullYear()} SportWhisp.it
        </p>

      </footer>
    </div>
  );
}