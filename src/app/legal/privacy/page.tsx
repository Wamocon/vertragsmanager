export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">Datenschutzerklärung</h1>
      <div className="mt-8 prose prose-zinc dark:prose-invert max-w-none">
        <p>Stand: April 2026</p>
        <h2>1. Verantwortlicher</h2>
        <p>WAMOCON GmbH, Mergenthalerallee 79 - 81, 65760 Eschborn<br />Telefon: +49 6196 5838311<br />E-Mail: info@wamocon.com<br />Geschäftsführer: Dipl.-Ing. Waleri Moretz</p>
        <h2>2. Überblick</h2>
        <p>Diese Datenschutzerklärung gilt für die Webanwendung Vertragswächter. Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer funktionsfähigen Plattform erforderlich ist.</p>
        <h2>3. Rechtsgrundlagen</h2>
        <ul>
          <li>Einwilligung — Art. 6 Abs. 1 lit. a DSGVO</li>
          <li>Vertragserfüllung — Art. 6 Abs. 1 lit. b DSGVO</li>
          <li>Berechtigtes Interesse — Art. 6 Abs. 1 lit. f DSGVO</li>
        </ul>
        <h2>4. Hosting und Infrastruktur</h2>
        <p>Die Plattform wird über Vercel (Frankfurt) gehostet. Datenbank und Authentifizierung laufen über Supabase (EU-Region Frankfurt).</p>
        <h2>5. Erhebung personenbezogener Daten</h2>
        <p>Bei der Registrierung erheben wir: Name, E-Mail-Adresse und Passwort. Diese Daten sind zur Vertragserfüllung erforderlich.</p>
        <h2>6. Cookies</h2>
        <p>Die Plattform verwendet technisch notwendige Cookies für Session-Management und Authentifizierung.</p>
        <h2>7. Rechte der betroffenen Personen</h2>
        <p>Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21) und Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO).</p>
        <h2>8. Datensicherheit</h2>
        <p>Wir setzen technische und organisatorische Sicherheitsmaßnahmen ein, um Ihre Daten zu schützen.</p>
        <p className="text-sm text-zinc-500 mt-8">Hinweis: Dies ist ein Muster. Lassen Sie die Datenschutzerklärung vor Veröffentlichung von einem Juristen prüfen.</p>
      </div>
    </div>
  );
}
