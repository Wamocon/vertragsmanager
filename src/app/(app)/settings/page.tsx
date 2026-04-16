'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/layout/Sidebar';
import { useTheme } from '@/hooks/useTheme';
import { setLocale } from '@/lib/actions/setLocale';
import { useOrgDisplayName } from '@/lib/OrgContext';
import { cn } from '@/lib/utils';
import { Sun, Moon, Compass, Bell } from 'lucide-react';

function readNotifPrefs() {
  if (typeof window === 'undefined') return { deadlines: true, system: true, comments: true, edits: true };
  try {
    const stored = localStorage.getItem('notifPrefs');
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return { deadlines: true, system: true, comments: true, edits: true };
}

export default function SettingsPage() {
  const t = useTranslations('settings');
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const orgDisplayName = useOrgDisplayName();
  const [isPending, startTransition] = useTransition();
  const [guidanceEnabled, setGuidanceEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem('guidanceEnabled') !== 'false';
  });
  const [notifPrefs, setNotifPrefs] = useState<Record<string, boolean>>(readNotifPrefs);

  function toggleGuidance(val: boolean) {
    setGuidanceEnabled(val);
    localStorage.setItem('guidanceEnabled', String(val));
    window.dispatchEvent(new StorageEvent('storage', { key: 'guidanceEnabled', newValue: String(val) }));
  }

  function toggleNotifPref(key: string) {
    setNotifPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem('notifPrefs', JSON.stringify(next));
      return next;
    });
  }

  function handleLocaleChange(newLocale: 'de' | 'en') {
    startTransition(async () => {
      await setLocale(newLocale);
      router.refresh();
    });
  }

  const themeOptions = [
    { value: 'light' as const, icon: Sun, label: t('light') },
    { value: 'dark' as const, icon: Moon, label: t('dark') },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: orgDisplayName, href: '/dashboard' }, { label: t('title') }]} />
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>

      <Card>
        <CardHeader><CardTitle>{t('theme')}</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-3">
            {themeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                  theme === opt.value
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-400'
                    : 'border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800',
                )}
              >
                <opt.icon className="h-4 w-4" /> {opt.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>{t('language')}</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <button
              onClick={() => handleLocaleChange('de')}
              disabled={isPending}
              className={cn(
                'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                locale === 'de'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-400'
                  : 'border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800',
              )}
            >
              {t('german')}
            </button>
            <button
              onClick={() => handleLocaleChange('en')}
              disabled={isPending}
              className={cn(
                'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                locale === 'en'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-400'
                  : 'border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800',
              )}
            >
              {t('english')}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Guidance Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="h-4 w-4" /> {t('guidance')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">{t('guidanceDesc')}</p>
          <div className="flex gap-3">
            <button
              onClick={() => toggleGuidance(true)}
              className={cn(
                'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                guidanceEnabled
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-400'
                  : 'border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800',
              )}
            >
              {t('guidanceEnabled')}
            </button>
            <button
              onClick={() => toggleGuidance(false)}
              className={cn(
                'rounded-lg border px-4 py-2 text-sm font-medium transition-colors',
                !guidanceEnabled
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-400'
                  : 'border-zinc-300 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800',
              )}
            >
              {t('guidanceDisabled')}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-4 w-4" /> {t('notifications')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {([
              { key: 'deadlines' as const, label: t('notifDeadlines') },
              { key: 'system' as const, label: t('notifSystem') },
              { key: 'comments' as const, label: t('notifComments') },
              { key: 'edits' as const, label: t('notifEdits') },
            ]).map((item) => (
              <label key={item.key} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={notifPrefs[item.key]}
                  onChange={() => toggleNotifPref(item.key)}
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{item.label}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
