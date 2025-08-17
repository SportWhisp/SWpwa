import Head from "next/head";

export default function CookiePolicy() {
  return (
    <>
      <Head>
        <title>Cookie Policy | SportWhisp</title>
        <meta
          name="description"
          content="Cookie Policy di SportWhisp: informazioni sui cookie tecnici e di profilazione utilizzati dal sito, finalità e gestione delle preferenze."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sportwhisp.it/cookie-policy" />
        <meta property="og:title" content="Cookie Policy | SportWhisp" />
        <meta
          property="og:description"
          content="Scopri quali cookie utilizza SportWhisp e come puoi gestire le tue preferenze in qualsiasi momento."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sportwhisp.it/cookie-policy" />
        <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
      </Head>

      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1>Cookie Policy</h1>
        <p>Ultimo aggiornamento: agosto 2025</p>

        <h2>1. Cosa sono i cookie</h2>
        <p>
          I cookie sono piccoli file di testo che i siti web visitati inviano al
          dispositivo dell’utente, dove vengono memorizzati per essere poi
          ritrasmessi agli stessi siti alla visita successiva.
        </p>

        <h2>2. Tipologie di cookie utilizzati</h2>
        <ul>
          <li>
            <strong>Cookie tecnici:</strong> necessari al funzionamento del sito e
            alla corretta visualizzazione dei contenuti.
          </li>
          <li>
            <strong>Cookie di analisi:</strong> utilizzati in forma aggregata per
            raccogliere dati anonimi sulle visite e migliorare le performance del
            sito.
          </li>
          <li>
            <strong>Cookie di profilazione di terze parti:</strong> (es. Google Ads)
            usati per mostrare pubblicità personalizzate sulla base degli
            interessi dell’utente, previo consenso.
          </li>
        </ul>

        <h2>3. Gestione del consenso</h2>
        <p>
          Al primo accesso l’utente può scegliere se accettare o rifiutare i
          cookie non strettamente necessari tramite il banner informativo. È
          sempre possibile modificare le preferenze cancellando i cookie dal
          browser.
        </p>

        <h2>4. Maggiori informazioni</h2>
        <p>
          Per ulteriori dettagli sulla pubblicità personalizzata e sulla gestione
          dei cookie, consulta le{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            politiche di Google
          </a>.
        </p>
      </div>
    </>
  );
}