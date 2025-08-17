import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | SportWhisp</title>
        <meta
          name="description"
          content="Informativa sulla privacy di SportWhisp: trattamento dei dati personali, finalità, base giuridica, diritti degli utenti e contatti."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sportwhisp.it/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | SportWhisp" />
        <meta
          property="og:description"
          content="Scopri come SportWhisp gestisce i dati personali, i tuoi diritti e le modalità di contatto."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sportwhisp.it/privacy-policy" />
        <meta property="og:image" content="https://sportwhisp.it/Logo.png" />
      </Head>

    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Privacy Policy</h1>
      <p>Ultimo aggiornamento: agosto 2025</p>

      <h2>1. Titolare del trattamento</h2>
      <p>
        Il titolare del trattamento dei dati è il gestore del sito <strong>SportWhisp.it</strong>.
      </p>

      <h2>2. Tipologie di dati raccolti</h2>
      <p>Il sito non raccoglie dati personali identificabili degli utenti (come nome, email, ecc.).</p>
      <p>
        Possono essere raccolti automaticamente dati tecnici e di navigazione (IP, tipo di browser, dispositivo, ecc.)
        attraverso cookie tecnici e, previo consenso, cookie di terze parti per finalità pubblicitarie e di analisi.
      </p>

      <h2>3. Finalità del trattamento</h2>
      <ul>
        <li>Fornire contenuti informativi legati alle previsioni sportive</li>
        <li>Mostrare pubblicità tramite Google Ads e servizi simili</li>
        <li>Raccogliere dati aggregati anonimi a fini statistici (es. visite al sito)</li>
      </ul>

      <h2>4. Cookie e tecnologie simili</h2>
      <p>
        Il sito utilizza cookie tecnici necessari al funzionamento e, previo consenso, cookie di profilazione forniti da terze parti
        (come Google) per la personalizzazione degli annunci pubblicitari.
      </p>
      <p>
        Per maggiori informazioni, si rimanda alla <a href="/cookie-policy">Cookie Policy</a>.
      </p>

      <h2>5. Conservazione dei dati</h2>
      <p>
        I dati raccolti tramite cookie vengono conservati secondo le politiche dei rispettivi fornitori di servizi (es. Google).
        Il sito non conserva direttamente alcun dato personale identificabile.
      </p>

      <h2>6. Diritti dell’utente</h2>
      <p>
        Ai sensi del GDPR, l’utente ha diritto di accedere ai propri dati, rettificarli, cancellarli, limitarne il trattamento
        o opporsi, nei casi previsti. In assenza di raccolta diretta di dati personali, questi diritti si applicano solo ai
        trattamenti effettuati da terze parti.
      </p>

      <h2>7. Modifiche alla presente policy</h2>
      <p>
        La presente informativa può essere soggetta a modifiche. Si consiglia di consultarla periodicamente.
      </p>
    </div>
        </>
  );
}