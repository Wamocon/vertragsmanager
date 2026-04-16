'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/layout/Sidebar';
import { formatCurrency, computeMonthlyAmount, netToGross, grossToNet } from '@/lib/format';
import { useOrgDisplayName } from '@/lib/OrgContext';
import { cn } from '@/lib/utils';
import type { Contract, Category, ContractStatus } from '@/types/database';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { BarChart3, Table2, X, Maximize2 } from 'lucide-react';

interface AnalyticsContentProps {
  contracts: (Contract & { category: Category | null })[];
  categories: Category[];
}

function getMonthly(contract: Contract): number {
  return computeMonthlyAmount(Number(contract.amount), contract.payment_interval);
}

const STATUS_KEY: Record<ContractStatus, string> = {
  active: 'statusActive',
  expiring_soon: 'statusExpiringSoon',
  expired: 'statusExpired',
  cancelled: 'statusCancelled',
};

type TabView = 'charts' | 'table';
type CalendarView = 'year' | 'month';

export function AnalyticsContent({ contracts, categories }: AnalyticsContentProps) {
  const t = useTranslations('analytics');
  const tContracts = useTranslations('contracts');
  const orgDisplayName = useOrgDisplayName();
  const [activeTab, setActiveTab] = useState<TabView>('charts');
  const [calendarView, setCalendarView] = useState<CalendarView>('year');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  // Table filters — default to current calendar year up to today
  const [currentYear] = useState(() => new Date().getFullYear());
  const [currentMonth] = useState(() => new Date().getMonth());
  const now = new Date();
  const yearStart = `${currentYear}-01-01`;
  const todayStr = now.toISOString().split('T')[0];
  const [tableProvider, setTableProvider] = useState('all');
  const [tableCategory, setTableCategory] = useState('all');
  const [tableStatus, setTableStatus] = useState<string>('all');
  const [tableShowGross, setTableShowGross] = useState(true);
  const [tableDateFrom, setTableDateFrom] = useState(yearStart);
  const [tableDateTo, setTableDateTo] = useState(todayStr);

  // Cumulative chart state — simplified for inline preview
  const [cumulativeCategory, setCumulativeCategory] = useState('all');

  const currentMonthName = new Date(currentYear, currentMonth).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
  const currentMonthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;

  const uniqueProviders = useMemo(() =>
    [...new Set(contracts.map((c) => c.provider))].sort(),
    [contracts]
  );

  // Only count contracts active in the current month for KPIs
  const activeContracts = useMemo(() =>
    contracts.filter((c) => {
      if (c.status === 'cancelled' || c.status === 'expired') return false;
      const startKey = c.start_date.substring(0, 7);
      const endKey = c.end_date ? c.end_date.substring(0, 7) : '9999-12';
      return startKey <= currentMonthKey && endKey >= currentMonthKey;
    }),
    [contracts, currentMonthKey]
  );

  const totalMonthly = activeContracts.reduce((sum, c) => sum + getMonthly(c), 0);

  // Yearly: sum of actual monthly costs for each month of the current year
  const totalYearly = useMemo(() => {
    let sum = 0;
    for (let m = 0; m < 12; m++) {
      const mk = `${currentYear}-${String(m + 1).padStart(2, '0')}`;
      for (const c of contracts) {
        if (c.status === 'cancelled') continue;
        const sk = c.start_date.substring(0, 7);
        const ek = c.end_date ? c.end_date.substring(0, 7) : '9999-12';
        if (sk <= mk && ek >= mk) sum += computeMonthlyAmount(Number(c.amount), c.payment_interval);
      }
    }
    return Math.round(sum * 100) / 100;
  }, [contracts, currentYear]);

  const categoryData = useMemo(() => {
    return categories
      .map((cat) => {
        const catContracts = activeContracts.filter((c) => c.category_id === cat.id);
        const total = catContracts.reduce((sum, c) => sum + getMonthly(c), 0);
        return { name: cat.name, value: Math.round(total * 100) / 100, color: cat.color, count: catContracts.length };
      })
      .filter((c) => c.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [activeContracts, categories]);

  const topProviders = useMemo(() => {
    const providerMap = new Map<string, number>();
    for (const c of activeContracts) {
      const monthly = getMonthly(c);
      providerMap.set(c.provider, (providerMap.get(c.provider) ?? 0) + monthly);
    }
    return Array.from(providerMap.entries())
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [activeContracts]);

  // Payment calendar: 12 months for selected year
  const paymentCalendar = useMemo(() => {
    const months: { month: string; monthIndex: number; total: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(selectedYear, i, 1);
      const monthStr = date.toLocaleDateString('de-DE', { month: 'short', year: 'numeric' });
      const mk = `${selectedYear}-${String(i + 1).padStart(2, '0')}`;
      let monthTotal = 0;
      for (const c of contracts) {
        if (c.status === 'cancelled') continue;
        const sk = c.start_date.substring(0, 7);
        const ek = c.end_date ? c.end_date.substring(0, 7) : '9999-12';
        if (sk <= mk && ek >= mk) monthTotal += computeMonthlyAmount(Number(c.amount), c.payment_interval);
      }
      months.push({ month: monthStr, monthIndex: i, total: Math.round(monthTotal * 100) / 100 });
    }
    return months;
  }, [contracts, selectedYear]);

  // Cumulative cost data: per-category colored series for inline preview
  const cumulativeData = useMemo(() => {
    const filtered = cumulativeCategory === 'all'
      ? contracts
      : contracts.filter((c) => c.category_id === cumulativeCategory);

    if (filtered.length === 0) return [];

    const earliest = filtered.reduce((min, c) => c.start_date < min ? c.start_date : min, filtered[0].start_date);
    const startDate = new Date(earliest);
    startDate.setDate(1);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 12);

    const data: { month: string; cumulative: number }[] = [];
    let cumulative = 0;
    const cursor = new Date(startDate);

    while (cursor <= endDate) {
      const cursorKey = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}`;
      let monthTotal = 0;
      for (const c of filtered) {
        if (c.status === 'cancelled') continue;
        const startKey = c.start_date.substring(0, 7);
        const endKey = c.end_date ? c.end_date.substring(0, 7) : '9999-12';
        if (startKey > cursorKey || endKey < cursorKey) continue;
        monthTotal += computeMonthlyAmount(Number(c.amount), c.payment_interval);
      }
      cumulative += monthTotal;
      data.push({
        month: cursor.toLocaleDateString('de-DE', { month: 'short', year: '2-digit' }),
        cumulative: Math.round(cumulative * 100) / 100,
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return data;
  }, [contracts, cumulativeCategory]);

  // Monthly trend preview: last 12 months of non-cumulative cost
  const monthlyTrendData = useMemo(() => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    const data: { month: string; total: number }[] = [];
    const cursor = new Date(startDate);

    while (cursor <= now) {
      const cursorKey = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}`;
      let monthTotal = 0;
      for (const c of contracts) {
        if (c.status === 'cancelled') continue;
        const startKey = c.start_date.substring(0, 7);
        const endKey = c.end_date ? c.end_date.substring(0, 7) : '9999-12';
        if (startKey > cursorKey || endKey < cursorKey) continue;
        monthTotal += computeMonthlyAmount(Number(c.amount), c.payment_interval);
      }
      data.push({
        month: cursor.toLocaleDateString('de-DE', { month: 'short', year: '2-digit' }),
        total: Math.round(monthTotal * 100) / 100,
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }
    return data;
  }, [contracts]);

  function handleCsvExport() {
    const headers = ['Name', 'Anbieter', 'Kategorie', 'Betrag', 'Intervall', 'Monatlich', 'Status', 'Vertragsbeginn', 'Vertragsende', 'Kündigungsfrist'];
    const rows = contracts.map((c) => [
      c.name,
      c.provider,
      c.category?.name ?? '',
      c.amount,
      c.payment_interval,
      getMonthly(c).toFixed(2).replace('.', ','),
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

  const yearOptions = [currentYear - 1, currentYear, currentYear + 1];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: orgDisplayName, href: '/dashboard' }, { label: t('title') }]} />
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>
        {/* Tab Switch */}
        <div className="flex gap-1 rounded-lg border border-zinc-300 p-0.5 dark:border-zinc-700">
          <button
            onClick={() => setActiveTab('charts')}
            className={cn('flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors', activeTab === 'charts' ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300')}
          >
            <BarChart3 className="h-4 w-4" /> Diagramme
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={cn('flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors', activeTab === 'table' ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300')}
          >
            <Table2 className="h-4 w-4" /> Tabelle
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent>
            <p className="text-sm text-zinc-500">{t('totalMonthly')}</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-white">{formatCurrency(totalMonthly)}</p>
            <p className="mt-0.5 text-xs text-zinc-400">{currentMonthName}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="text-sm text-zinc-500">{t('totalYearly')}</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-white">{formatCurrency(totalYearly)}</p>
            <p className="mt-0.5 text-xs text-zinc-400">{currentYear}</p>
          </CardContent>
        </Card>
      </div>

      {activeTab === 'charts' ? (
        <>
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
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2">
                      {categoryData.map((cat) => (
                        <div key={cat.name} className="flex items-center gap-2 text-sm">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className="text-zinc-700 dark:text-zinc-300">{cat.name}</span>
                          <span className="ml-auto font-medium text-zinc-900 dark:text-white">{formatCurrency(cat.value)}</span>
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
                            <span className="font-medium text-zinc-900 dark:text-white">{formatCurrency(p.total)}/Mo</span>
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

          {/* Cumulative Cost Chart — Preview with link to full page */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle>{t('cumulativeCosts')}</CardTitle>
                <select
                  value={cumulativeCategory}
                  onChange={(e) => setCumulativeCategory(e.target.value)}
                  className="rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  <option value="all">{t('allCategories')}</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <Link
                href="/analytics/cumulative"
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
                title={t('openFullPage')}
              >
                <Maximize2 className="h-4 w-4" />
                {t('openFullPage')}
              </Link>
            </CardHeader>
            <CardContent>
              {cumulativeData.length === 0 ? (
                <p className="text-sm text-zinc-500">{t('noData')}</p>
              ) : (
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cumulativeData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                      <defs>
                        <linearGradient id="cumulativeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11 }}
                        interval={Math.max(0, Math.floor(cumulativeData.length / 12) - 1)}
                        className="text-zinc-500"
                      />
                      <YAxis
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
                        className="text-zinc-500"
                        width={60}
                      />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} labelFormatter={(label) => String(label)} />
                      <Area
                        type="monotone"
                        dataKey="cumulative"
                        name={t('cumulativeTotal')}
                        stroke="#6366f1"
                        strokeWidth={2}
                        fill="url(#cumulativeGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Monthly Trend Chart — Preview with link to full page */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('monthlyTrend')}</CardTitle>
              <Link
                href="/analytics/monthly-trend"
                className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
                title={t('openFullPage')}
              >
                <Maximize2 className="h-4 w-4" />
                {t('openFullPage')}
              </Link>
            </CardHeader>
            <CardContent>
              {monthlyTrendData.length === 0 ? (
                <p className="text-sm text-zinc-500">{t('noData')}</p>
              ) : (
                <div style={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyTrendData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                      <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} className="text-zinc-500" />
                      <YAxis
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
                        className="text-zinc-500"
                        width={60}
                      />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} labelFormatter={(label) => String(label)} />
                      <Area
                        type="monotone"
                        dataKey="total"
                        name={t('monthlyTotal')}
                        stroke="#06b6d4"
                        strokeWidth={2}
                        fill="url(#trendGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Calendar */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <CardTitle>{t('paymentCalendar')}</CardTitle>
                <div className="flex gap-1 rounded-lg border border-zinc-200 p-0.5 dark:border-zinc-700">
                  <button
                    onClick={() => setCalendarView('year')}
                    className={cn('rounded-md px-2 py-1 text-xs font-medium', calendarView === 'year' ? 'bg-zinc-200 dark:bg-zinc-700' : 'text-zinc-500')}
                  >
                    Jahr
                  </button>
                  <button
                    onClick={() => setCalendarView('month')}
                    className={cn('rounded-md px-2 py-1 text-xs font-medium', calendarView === 'month' ? 'bg-zinc-200 dark:bg-zinc-700' : 'text-zinc-500')}
                  >
                    Monat
                  </button>
                </div>
                {calendarView === 'year' && (
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  >
                    {yearOptions.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                )}
                {calendarView === 'month' && (
                  <div className="flex gap-1">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(Number(e.target.value))}
                      className="rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i}>
                          {new Date(2024, i).toLocaleDateString('de-DE', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    >
                      {yearOptions.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <button onClick={handleCsvExport} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                {t('exportCsv')}
              </button>
            </CardHeader>
            <CardContent>
              {calendarView === 'year' ? (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                  {paymentCalendar.map((m) => (
                    <button
                      key={m.month}
                      onClick={() => { setCalendarView('month'); setSelectedMonth(m.monthIndex); }}
                      className="rounded-lg border border-zinc-200 p-3 text-center transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-zinc-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/10"
                    >
                      <p className="text-xs text-zinc-500">{m.month}</p>
                      <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-white">{formatCurrency(m.total)}</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div>
                  <h4 className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {new Date(selectedYear, selectedMonth).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
                  </h4>
                  {(() => {
                    const mk = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}`;
                    const monthContracts = contracts.filter((c) => {
                      if (c.status === 'cancelled') return false;
                      const sk = c.start_date.substring(0, 7);
                      const ek = c.end_date ? c.end_date.substring(0, 7) : '9999-12';
                      return sk <= mk && ek >= mk;
                    });
                    const monthSum = monthContracts.reduce((s, c) => s + getMonthly(c), 0);
                    return (
                      <>
                        <p className="text-2xl font-bold text-zinc-900 dark:text-white">{formatCurrency(monthSum)}</p>
                        <p className="mt-1 text-xs text-zinc-500">{t('estimatedCosts')}</p>
                        <div className="mt-4 space-y-2">
                          {monthContracts.map((c) => (
                            <div key={c.id} className="flex items-center justify-between text-sm">
                              <div>
                                <span className="text-zinc-900 dark:text-white">{c.name}</span>
                                <span className="ml-2 text-zinc-500">{c.provider}</span>
                              </div>
                              <span className="font-medium text-zinc-900 dark:text-white">{formatCurrency(getMonthly(c))}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        /* Table View with Rich Filters */
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('contractOverview')}</CardTitle>
            <button onClick={handleCsvExport} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              {t('exportCsv')}
            </button>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="mb-4 flex flex-wrap items-end gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-zinc-500">{t('filterProvider')}</label>
                <select value={tableProvider} onChange={(e) => setTableProvider(e.target.value)} className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                  <option value="all">{t('allProviders')}</option>
                  {uniqueProviders.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-zinc-500">{t('filterCategory')}</label>
                <select value={tableCategory} onChange={(e) => setTableCategory(e.target.value)} className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                  <option value="all">{t('allCategories')}</option>
                  {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-zinc-500">{t('filterStatus')}</label>
                <select value={tableStatus} onChange={(e) => setTableStatus(e.target.value)} className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100">
                  <option value="all">{t('allStatuses')}</option>
                  {(['active', 'expiring_soon', 'expired', 'cancelled'] as ContractStatus[]).map((s) => (
                    <option key={s} value={s}>{tContracts(STATUS_KEY[s] as Parameters<typeof tContracts>[0])}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-zinc-500">{t('dateFrom')}</label>
                <input type="date" value={tableDateFrom} onChange={(e) => setTableDateFrom(e.target.value)} className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-zinc-500">{t('dateTo')}</label>
                <input type="date" value={tableDateTo} onChange={(e) => setTableDateTo(e.target.value)} className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100" />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-zinc-500">&nbsp;</label>
                <button
                  onClick={() => setTableShowGross((v) => !v)}
                  className={cn(
                    'rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors',
                    tableShowGross
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-400'
                      : 'border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400'
                  )}
                >
                  {tableShowGross ? t('showGross') : t('showNet')}
                </button>
              </div>
              {(tableProvider !== 'all' || tableCategory !== 'all' || tableStatus !== 'all' || tableDateFrom !== yearStart || tableDateTo !== todayStr) && (
                <button
                  onClick={() => { setTableProvider('all'); setTableCategory('all'); setTableStatus('all'); setTableDateFrom(yearStart); setTableDateTo(todayStr); }}
                  className="flex items-center gap-1 rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-xs text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  <X className="h-3 w-3" /> {t('clearFilters')}
                </button>
              )}
            </div>

            <TableView
              contracts={contracts}
              tableProvider={tableProvider}
              tableCategory={tableCategory}
              tableStatus={tableStatus}
              tableDateFrom={tableDateFrom}
              tableDateTo={tableDateTo}
              tableShowGross={tableShowGross}
              t={t}
              tContracts={tContracts}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface TableViewProps {
  contracts: (Contract & { category: Category | null })[];
  tableProvider: string;
  tableCategory: string;
  tableStatus: string;
  tableDateFrom: string;
  tableDateTo: string;
  tableShowGross: boolean;
  t: ReturnType<typeof useTranslations<'analytics'>>;
  tContracts: ReturnType<typeof useTranslations<'contracts'>>;
}

function TableView({ contracts, tableProvider, tableCategory, tableStatus, tableDateFrom, tableDateTo, tableShowGross, t, tContracts }: TableViewProps) {
  const router = useRouter();
  const filtered = useMemo(() => {
    let result = [...contracts];
    if (tableProvider !== 'all') result = result.filter((c) => c.provider === tableProvider);
    if (tableCategory !== 'all') result = result.filter((c) => c.category_id === tableCategory);
    if (tableStatus !== 'all') result = result.filter((c) => c.status === tableStatus);
    // Overlap filter: contract is valid if its period overlaps with [tableDateFrom, tableDateTo]
    // A contract overlaps if: contract.start_date <= tableDateTo AND (contract.end_date is null OR contract.end_date >= tableDateFrom)
    if (tableDateFrom) result = result.filter((c) => !c.end_date || c.end_date >= tableDateFrom);
    if (tableDateTo) result = result.filter((c) => c.start_date <= tableDateTo);
    return result;
  }, [contracts, tableProvider, tableCategory, tableStatus, tableDateFrom, tableDateTo]);

  const filteredTotalMonthly = filtered.reduce((sum, c) => sum + getMonthly(c), 0);

  function displayAmount(c: Contract): string {
    const raw = Number(c.amount);
    if (tableShowGross) {
      return formatCurrency(c.is_gross ? raw : netToGross(raw, c.tax_rate));
    }
    return formatCurrency(c.is_gross ? grossToNet(raw, c.tax_rate) : raw);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm table-fixed">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800">
            <th className="w-[18%] pb-2 pr-3 text-left font-medium text-zinc-500">{t('name')}</th>
            <th className="w-[14%] pb-2 pr-3 text-left font-medium text-zinc-500">{t('provider')}</th>
            <th className="w-[12%] pb-2 pr-3 text-left font-medium text-zinc-500">{t('category')}</th>
            <th className="w-[13%] pb-2 pr-3 text-right font-medium text-zinc-500">{t('amount')} ({tableShowGross ? tContracts('gross') : tContracts('net')})</th>
            <th className="w-[11%] pb-2 pr-3 text-right font-medium text-zinc-500">/Mo</th>
            <th className="w-[10%] pb-2 pr-3 text-left font-medium text-zinc-500">{t('status')}</th>
            <th className="w-[11%] pb-2 pr-3 text-left font-medium text-zinc-500">{t('startDate')}</th>
            <th className="w-[11%] pb-2 text-left font-medium text-zinc-500">{t('endDate')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {filtered.map((c) => (
            <tr key={c.id} onClick={() => router.push(`/contracts/${c.id}`)} className="cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <td className="py-2.5 pr-3 font-medium text-indigo-600 dark:text-indigo-400 truncate">{c.name}</td>
              <td className="py-2.5 pr-3 text-zinc-600 dark:text-zinc-400 truncate">{c.provider}</td>
              <td className="py-2.5 pr-3">
                {c.category && (
                  <span className="inline-flex items-center gap-1.5 text-xs">
                    <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: c.category.color }} />
                    <span className="truncate">{c.category.name}</span>
                  </span>
                )}
              </td>
              <td className="py-2.5 pr-3 text-right text-zinc-900 dark:text-white">{displayAmount(c)}</td>
              <td className="py-2.5 pr-3 text-right font-medium text-zinc-900 dark:text-white">{formatCurrency(getMonthly(c))}</td>
              <td className="py-2.5 pr-3 text-zinc-600 dark:text-zinc-400">{tContracts(STATUS_KEY[c.status] as Parameters<typeof tContracts>[0])}</td>
              <td className="py-2.5 pr-3 text-zinc-600 dark:text-zinc-400">{new Date(c.start_date).toLocaleDateString('de-DE')}</td>
              <td className="py-2.5 text-zinc-600 dark:text-zinc-400">{c.end_date ? new Date(c.end_date).toLocaleDateString('de-DE') : '—'}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-zinc-300 dark:border-zinc-700">
            <td colSpan={4} className="py-2.5 pr-3 font-bold text-zinc-900 dark:text-white">{t('sum')} ({filtered.length})</td>
            <td className="py-2.5 pr-3 text-right font-bold text-zinc-900 dark:text-white">{formatCurrency(filteredTotalMonthly)}</td>
            <td colSpan={3} />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
