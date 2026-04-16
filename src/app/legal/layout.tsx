import Link from 'next/link';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">VM</div>
            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Vertragsmanager</span>
          </Link>
          <Link href="/" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
            ← Zurück zur Startseite
          </Link>
        </div>
      </header>
      {children}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="text-sm text-zinc-500">© 2026 WAMOCON GmbH</span>
          <div className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/legal/imprint" className="hover:text-zinc-900 dark:hover:text-white">Impressum</Link>
            <Link href="/legal/privacy" className="hover:text-zinc-900 dark:hover:text-white">Datenschutz</Link>
            <Link href="/legal/terms" className="hover:text-zinc-900 dark:hover:text-white">AGB</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
