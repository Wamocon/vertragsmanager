'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Breadcrumb } from '@/components/layout/Sidebar';
import { useOrgDisplayName } from '@/lib/OrgContext';
import { cn } from '@/lib/utils';
import type { Contract, Category } from '@/types/database';
import { Clock, AlertTriangle, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DeadlinesContentProps {
  contracts: (Contract & { category: Category | null })[];
}

export function DeadlinesContent({ contracts }: DeadlinesContentProps) {
  const t = useTranslations('deadlines');
  const orgDisplayName = useOrgDisplayName();
  const today = useMemo(() => new Date(), []);
  const [filter, setFilter] = useState<'all' | 'open' | 'past'>('all');

  const grouped = useMemo(() => {
    const now = today;
    const overdue: typeof contracts = [];
    const thisWeek: typeof contracts = [];
    const thisMonth: typeof contracts = [];
    const later: typeof contracts = [];

    const in7Days = new Date(now);
    in7Days.setDate(in7Days.getDate() + 7);
    const in30Days = new Date(now);
    in30Days.setDate(in30Days.getDate() + 30);

    for (const c of contracts) {
      if (!c.cancellation_deadline) continue;
      const d = new Date(c.cancellation_deadline);

      // Apply filter
      if (filter === 'open' && d < now) continue;
      if (filter === 'past' && d >= now) continue;

      if (d < now) overdue.push(c);
      else if (d <= in7Days) thisWeek.push(c);
      else if (d <= in30Days) thisMonth.push(c);
      else later.push(c);
    }

    return { overdue, thisWeek, thisMonth, later };
  }, [contracts, today, filter]);

  function handleIcsExport() {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Vertragsmanager//DE',
    ];

    for (const c of contracts) {
      if (!c.cancellation_deadline) continue;
      const d = new Date(c.cancellation_deadline);
      const dateStr = d.toISOString().replace(/[-:]/g, '').split('T')[0];
      lines.push(
        'BEGIN:VEVENT',
        `DTSTART;VALUE=DATE:${dateStr}`,
        `DTEND;VALUE=DATE:${dateStr}`,
        `SUMMARY:Kündigungsfrist: ${c.name} (${c.provider})`,
        `DESCRIPTION:Vertrag "${c.name}" bei ${c.provider} - Kündigungsfrist endet am ${d.toLocaleDateString('de-DE')}`,
        'END:VEVENT',
      );
    }

    lines.push('END:VCALENDAR');
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vertragsmanager_fristen.ics';
    a.click();
    URL.revokeObjectURL(url);
  }

  function renderGroup(title: string, items: typeof contracts, variant: 'danger' | 'warning' | 'default') {
    if (items.length === 0) return null;
    return (
      <div>
        <h2 className={`mb-3 text-sm font-semibold uppercase tracking-wide ${
          variant === 'danger' ? 'text-red-600' : variant === 'warning' ? 'text-amber-600' : 'text-zinc-500'
        }`}>
          {title} ({items.length})
        </h2>
        <div className="space-y-2">
          {items.map((contract) => {
            const deadline = new Date(contract.cancellation_deadline!);
            const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            return (
              <Link
                key={contract.id}
                href={`/contracts/${contract.id}`}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/50"
              >
                <div className="flex items-center gap-3">
                  {daysLeft <= 0 && <AlertTriangle className="h-5 w-5 text-red-500" />}
                  {daysLeft > 0 && daysLeft <= 14 && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                  {daysLeft > 14 && <Clock className="h-5 w-5 text-zinc-400" />}
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">{contract.name}</p>
                    <p className="text-sm text-zinc-500">{contract.provider}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={contract.status} />
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {deadline.toLocaleDateString('de-DE')}
                    </p>
                    <p className={`text-xs ${daysLeft <= 0 ? 'text-red-600 font-medium' : daysLeft <= 14 ? 'text-amber-600' : 'text-zinc-500'}`}>
                      {daysLeft <= 0 ? t('overdue') : `${daysLeft} ${t('daysLeft')}`}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: orgDisplayName, href: '/dashboard' }, { label: t('title') }]} />

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>
        <Button variant="secondary" size="sm" onClick={handleIcsExport}>
          <Download className="mr-1.5 h-4 w-4" /> {t('exportIcs')}
        </Button>
      </div>

      {/* Filter */}
      <div className="flex gap-1 rounded-lg border border-zinc-300 p-0.5 dark:border-zinc-700 w-fit">
        {(['all', 'open', 'past'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              filter === f
                ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300',
            )}
          >
            {t(`filter${f.charAt(0).toUpperCase() + f.slice(1)}` as Parameters<typeof t>[0])}
          </button>
        ))}
      </div>

      {contracts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-zinc-500">{t('noneUpcoming')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {renderGroup(t('overdue'), grouped.overdue, 'danger')}
          {renderGroup(t('thisWeek'), grouped.thisWeek, 'warning')}
          {renderGroup(t('thisMonth'), grouped.thisMonth, 'default')}
          {renderGroup(t('later'), grouped.later, 'default')}
        </div>
      )}
    </div>
  );
}
