'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/layout/Sidebar';
import { useTheme } from '@/hooks/useTheme';
import { setLocale } from '@/lib/actions/setLocale';
import { useOrgDisplayName } from '@/lib/OrgContext';
import { cn } from '@/lib/utils';
import { Sun, Moon } from 'lucide-react';

export default function SettingsPage() {
  const t = useTranslations('settings');
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
  const orgDisplayName = useOrgDisplayName();
  const [isPending, startTransition] = useTransition();

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
    </div>
  );
}
