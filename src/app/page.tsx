import Link from 'next/link';
import { FileText, Clock, BarChart3, FileSignature, Shield, Users } from 'lucide-react';

const features = [
  { icon: FileText, title: 'OCR-Dokumentenerfassung', description: 'Laden Sie Vertraege hoch oder fotografieren Sie sie. Kerndaten werden automatisch extrahiert.' },
  { icon: Clock, title: 'Proaktive Fristerinnerungen', description: 'Nie wieder eine Kuendigungsfrist verpassen. Erinnerungen per E-Mail und In-App.' },
  { icon: BarChart3, title: 'Kostenuebersicht', description: 'Alle Kosten auf einen Blick: monatlich, jaehrlich und nach Kategorie.' },
  { icon: FileSignature, title: 'Kuendigungsvorlagen', description: 'Erstellen Sie rechtskonforme Schreiben in Sekunden mit vorausgefuellten Daten.' },
  { icon: Shield, title: 'DSGVO-nativ', description: 'Datenhaltung in der EU (Frankfurt) fuer maximale rechtliche Sicherheit.' },
  { icon: Users, title: 'Multi-User & Rollen', description: 'Arbeiten Sie im Team mit klaren Rechten fuer Admin, Manager und Leser.' },
];

const pricing = [
  { name: 'Free', price: '0', contracts: '5', users: '1' },
  { name: 'Starter', price: '19', contracts: '30', users: '3' },
  { name: 'Pro', price: '49', contracts: 'Unbegrenzt', users: '10', popular: true },
  { name: 'Business', price: '99', contracts: 'Unbegrenzt', users: '25' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white dark:text-zinc-950">VM</div>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Vertragsmanager</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">
              Anmelden
            </Link>
            <Link href="/register" className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-strong dark:text-zinc-950">
              Kostenlos starten
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
        <div>
          <p className="mb-4 inline-flex rounded-full border border-brand/20 bg-brand-soft/60 px-3 py-1 text-xs font-semibold tracking-wide text-brand">
            Fuer KMU in DACH
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
            Vertraege steuern.
            <br />
            Kosten senken.
            <br />
            Fristen sichern.
          </h1>
          <p className="mt-5 max-w-xl text-base text-zinc-600 sm:text-lg dark:text-zinc-300">
            Vertragsmanager bringt Vertragsdaten, Fristen und Kosten in einen gefuehrten Workflow. Ihr Team entscheidet schneller und verpasst keine Kuendigungsfenster.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/register" className="rounded-xl bg-brand px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-strong dark:text-zinc-950">
              Kostenlos starten
            </Link>
            <Link href="/login" className="rounded-xl border border-zinc-300 px-6 py-3 text-base font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-900">
              Zum Login
            </Link>
          </div>
        </div>

        <div className="surface-card rounded-3xl p-5 sm:p-7">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">So fuehrt die App Ihren Workflow</h2>
          <ol className="mt-4 space-y-3">
            <li className="rounded-xl border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">1. Vertrag erfassen</p>
              <p className="mt-1 text-zinc-600 dark:text-zinc-300">Anbieter, Kosten, Laufzeit und Kuendigungsfrist in einem Formular.</p>
            </li>
            <li className="rounded-xl border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">2. Fristen ueberwachen</p>
              <p className="mt-1 text-zinc-600 dark:text-zinc-300">Priorisierte Deadlines mit Erinnerungen und Export in den Kalender.</p>
            </li>
            <li className="rounded-xl border border-zinc-200 bg-white p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">3. Massnahmen umsetzen</p>
              <p className="mt-1 text-zinc-600 dark:text-zinc-300">Direkt aus dem System Vorlagen erzeugen und Kosten optimieren.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-white">Alles, was Sie brauchen</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
          Von der Erfassung bis zur Kuendigung in einer Plattform.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="surface-card rounded-2xl p-5">
              <feature.icon className="h-8 w-8 text-brand" />
              <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-6" id="pricing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-zinc-900 dark:text-white">Preise</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 ${
                  plan.popular
                    ? 'border-brand ring-2 ring-brand/40 dark:ring-brand/30'
                    : 'border-zinc-200 dark:border-zinc-800'
                } bg-white dark:bg-zinc-950`}
              >
                {plan.popular && (
                  <span className="mb-4 inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand">
                    Beliebt
                  </span>
                )}
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-zinc-900 dark:text-white">EUR {plan.price}</span>
                  <span className="text-zinc-500">/Monat</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li>{plan.contracts} Vertraege</li>
                  <li>{plan.users} Nutzer</li>
                  <li>OCR-Upload</li>
                  <li>Fristerinnerungen</li>
                  <li>Kuendigungsvorlagen</li>
                </ul>
                <Link
                  href="/register"
                  className={`mt-8 block rounded-xl px-4 py-2 text-center text-sm font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-brand text-white hover:bg-brand-strong dark:text-zinc-950'
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

      <footer className="mt-12 border-t border-zinc-200 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-brand text-xs font-bold text-white dark:text-zinc-950">VM</div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">(c) 2026 WAMOCON GmbH</span>
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
