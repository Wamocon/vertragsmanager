import Link from 'next/link';
import { FileText, Clock, BarChart3, FileSignature, Shield, Users } from 'lucide-react';

const features = [
  { icon: FileText, titleKey: 'OCR-Dokumentenerfassung', descKey: 'Laden Sie Verträge hoch oder fotografieren Sie sie — die Kerndaten werden automatisch extrahiert.' },
  { icon: Clock, titleKey: 'Proaktive Fristerinnerungen', descKey: 'Nie wieder eine Kündigungsfrist verpassen. Konfigurierbare Erinnerungen per E-Mail und In-App.' },
  { icon: BarChart3, titleKey: 'Kostenübersicht', descKey: 'Sehen Sie auf einen Blick, was Ihre Abonnements kosten — monatlich, jährlich, nach Kategorie.' },
  { icon: FileSignature, titleKey: 'Kündigungsvorlagen', descKey: 'Erstellen Sie rechtskonforme Kündigungsschreiben in Sekunden — automatisch befüllt.' },
  { icon: Shield, titleKey: 'DSGVO-nativ', descKey: 'Daten ausschließlich in der EU (Frankfurt). Volle Kontrolle über Ihre Daten.' },
  { icon: Users, titleKey: 'Multi-User & Rollen', descKey: 'Verwalten Sie Verträge im Team mit Admin-, Editor- und Viewer-Rollen.' },
];

const pricing = [
  { name: 'Free', price: '0', contracts: '5', users: '1' },
  { name: 'Starter', price: '19', contracts: '30', users: '3' },
  { name: 'Pro', price: '49', contracts: 'Unbegrenzt', users: '10', popular: true },
  { name: 'Business', price: '99', contracts: 'Unbegrenzt', users: '25' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">VM</div>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Vertragsmanager</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">
              Anmelden
            </Link>
            <Link href="/register" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
              Kostenlos starten
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
          Alle Verträge. <span className="text-indigo-600">Ein Überblick.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Erfassen, verwalten und kündigen Sie Ihre Unternehmensverträge — automatisch, übersichtlich und DSGVO-konform.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/register" className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700">
            Kostenlos starten
          </Link>
          <Link href="/login" className="rounded-lg border border-zinc-300 px-6 py-3 text-base font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900">
            Anmelden
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-zinc-200 bg-zinc-50 py-24 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-white">Alles, was Sie brauchen</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
            Von der Erfassung bis zur Kündigung — in einer Plattform.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.titleKey} className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                <f.icon className="h-8 w-8 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">{f.titleKey}</h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{f.descKey}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-white">Preise</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
            Starten Sie kostenlos. Upgraden Sie, wenn Ihr Unternehmen wächst.
          </p>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border p-6 ${
                  p.popular
                    ? 'border-indigo-600 ring-2 ring-indigo-600 dark:border-indigo-500 dark:ring-indigo-500'
                    : 'border-zinc-200 dark:border-zinc-800'
                } bg-white dark:bg-zinc-950`}
              >
                {p.popular && (
                  <span className="mb-4 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                    Beliebt
                  </span>
                )}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{p.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-zinc-900 dark:text-white">€{p.price}</span>
                  <span className="text-zinc-500">/Monat</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>{p.contracts} Verträge</li>
                  <li>{p.users} Nutzer</li>
                  <li>OCR-Upload</li>
                  <li>Fristerinnerungen</li>
                  <li>Kündigungsvorlagen</li>
                </ul>
                <Link
                  href="/register"
                  className={`mt-8 block rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors ${
                    p.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'border border-zinc-300 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  Jetzt starten
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-xs font-bold text-white">VM</div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">© 2026 WAMOCON GmbH</span>
            </div>
            <div className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/legal/imprint" className="hover:text-zinc-900 dark:hover:text-white">Impressum</Link>
              <Link href="/legal/privacy" className="hover:text-zinc-900 dark:hover:text-white">Datenschutz</Link>
              <Link href="/legal/terms" className="hover:text-zinc-900 dark:hover:text-white">AGB</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
