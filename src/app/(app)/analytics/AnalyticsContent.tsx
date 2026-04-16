'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/layout/Sidebar';
import type { Contract, Category } from '@/types/database';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AnalyticsContentProps {
  contracts: (Contract & { category: Category | null })[];
  categories: Category[];
}

function computeMonthlyAmount(contract: Contract): number {
  switch (contract.payment_interval) {
    case 'monthly': return Number(contract.amount);
    case 'quarterly': return Number(contract.amount) / 3;
    case 'yearly': return Number(contract.amount) / 12;
    case 'one_time': return 0;
    default: return 0;
  }
}

export function AnalyticsContent({ contracts, categories }: AnalyticsContentProps) {
  const t = useTranslations('analytics');

  const totalMonthly = contracts.reduce((sum, c) => sum + computeMonthlyAmount(c), 0);
  const totalYearly = totalMonthly * 12;

  const categoryData = useMemo(() => {
    return categories
      .map((cat) => {
        const catContracts = contracts.filter((c) => c.category_id === cat.id);
        const total = catContracts.reduce((sum, c) => sum + computeMonthlyAmount(c), 0);
        return { name: cat.name, value: Math.round(total * 100) / 100, color: cat.color, count: catContracts.length };
      })
      .filter((c) => c.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [contracts, categories]);

  const topProviders = useMemo(() => {
    const providerMap = new Map<string, number>();
    for (const c of contracts) {
      const monthly = computeMonthlyAmount(c);
      providerMap.set(c.provider, (providerMap.get(c.provider) ?? 0) + monthly);
    }
    return Array.from(providerMap.entries())
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [contracts]);

  // Payment calendar: next 12 months
  const paymentCalendar = useMemo(() => {
    const months: { month: string; total: number }[] = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const monthStr = date.toLocaleDateString('de-DE', { month: 'short', year: 'numeric' });
      months.push({ month: monthStr, total: totalMonthly });
    }
    return months;
  }, [totalMonthly]);

  function handleCsvExport() {
    const headers = ['Name', 'Anbieter', 'Kategorie', 'Betrag', 'Intervall', 'Monatlich', 'Status', 'Vertragsbeginn', 'Vertragsende', 'Kündigungsfrist'];
    const rows = contracts.map((c) => [
      c.name,
      c.provider,
      c.category?.name ?? '',
      c.amount,
      c.payment_interval,
      computeMonthlyAmount(c).toFixed(2),
      c.status,
      c.start_date,
      c.end_date ?? '',
      c.cancellation_deadline ?? '',
    ]);
    const csv = [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vertraege_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: t('title') }]} />
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent>
            <p className="text-sm text-zinc-500">{t('totalMonthly')}</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-white">€{totalMonthly.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-zinc-500">{t('totalYearly')}</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-white">€{totalYearly.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Donut Chart */}
        <Card>
          <CardHeader><CardTitle>{t('byCategory')}</CardTitle></CardHeader>
          <CardContent>
            {categoryData.length === 0 ? (
              <p className="text-sm text-zinc-500">Keine Daten</p>
            ) : (
              <div className="flex items-center gap-6">
                <div className="h-48 w-48 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={2}>
                        {categoryData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `€${Number(value).toFixed(2)}/Mo`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {categoryData.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2 text-sm">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-zinc-700 dark:text-zinc-300">{cat.name}</span>
                      <span className="ml-auto font-medium text-zinc-900 dark:text-white">€{cat.value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Providers */}
        <Card>
          <CardHeader><CardTitle>{t('topProviders')}</CardTitle></CardHeader>
          <CardContent>
            {topProviders.length === 0 ? (
              <p className="text-sm text-zinc-500">Keine Daten</p>
            ) : (
              <div className="space-y-3">
                {topProviders.map((p, i) => {
                  const pct = totalMonthly > 0 ? (p.total / totalMonthly) * 100 : 0;
                  return (
                    <div key={p.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-700 dark:text-zinc-300">{i + 1}. {p.name}</span>
                        <span className="font-medium text-zinc-900 dark:text-white">€{p.total.toFixed(2)}/Mo</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Payment Calendar */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('paymentCalendar')}</CardTitle>
          <button onClick={handleCsvExport} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
            {t('exportCsv')}
          </button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {paymentCalendar.map((m) => (
              <div key={m.month} className="rounded-lg border border-zinc-200 p-3 text-center dark:border-zinc-800">
                <p className="text-xs text-zinc-500">{m.month}</p>
                <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-white">€{m.total.toFixed(0)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
