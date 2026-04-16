'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/layout/Sidebar';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function SettingsPage() {
  const t = useTranslations('settings');

  function setTheme(theme: 'light' | 'dark' | 'system') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.removeItem('theme');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: t('title') }]} />
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>

      <Card>
        <CardHeader><CardTitle>{t('theme')}</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <button
              onClick={() => setTheme('light')}
              className="flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <Sun className="h-4 w-4" /> {t('light')}
            </button>
            <button
              onClick={() => setTheme('dark')}
              className="flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <Moon className="h-4 w-4" /> {t('dark')}
            </button>
            <button
              onClick={() => setTheme('system')}
              className="flex items-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <Monitor className="h-4 w-4" /> {t('system')}
            </button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{t('language')}</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-500 mb-3">Sprachumschaltung wird über die Profil-Einstellungen konfiguriert.</p>
          <div className="flex gap-3">
            <span className="rounded-lg border border-indigo-600 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-400">
              🇩🇪 {t('german')}
            </span>
            <span className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
              🇬🇧 {t('english')}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
