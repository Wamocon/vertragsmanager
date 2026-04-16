'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/layout/Sidebar';
import { formatCurrency, computeMonthlyAmount, netToGross } from '@/lib/format';
import { useOrgDisplayName } from '@/lib/OrgContext';
import { cn } from '@/lib/utils';
import type { Contract, Category } from '@/types/database';
import {
  Area, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, Line, ComposedChart,
} from 'recharts';
import { ArrowLeft } from 'lucide-react';

interface CumulativeChartContentProps {
  contracts: (Contract & { category: Category | null })[];
  categories: Category[];
}

type Granularity = 'monthly' | 'yearly';

function getMonthly(contract: Contract, showGross: boolean): number {
  const raw = computeMonthlyAmount(Number(contract.amount), contract.payment_interval);
  if (showGross && !contract.is_gross) return netToGross(raw, contract.tax_rate);
  if (!showGross && contract.is_gross) return raw / (1 + contract.tax_rate / 100);
  return raw;
}

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString('de-DE', { month: 'short', year: '2-digit' });
}

function formatYearLabel(date: Date): string {
  return String(date.getFullYear());
}

export function CumulativeChartContent({ contracts, categories }: CumulativeChartContentProps) {
  const t = useTranslations('analytics');
  const orgDisplayName = useOrgDisplayName();

  // Compute time bounds from data
  const timeBounds = useMemo(() => {
    if (contracts.length === 0) return { minDate: new Date(), maxDate: new Date() };
    const starts = contracts.map((c) => new Date(c.start_date));
    const ends = contracts
      .filter((c) => c.end_date)
      .map((c) => new Date(c.end_date!));
    const minDate = new Date(Math.min(...starts.map((d) => d.getTime())));
    const now = new Date();
    now.setMonth(now.getMonth() + 12);
    const maxDate = ends.length > 0 ? new Date(Math.max(now.getTime(), ...ends.map((d) => d.getTime()))) : now;
    return { minDate, maxDate };
  }, [contracts]);

  // Category state
  const activeCategoryIds = useMemo(() => {
    const catMap = new Map<string, Category>();
    for (const cat of categories) catMap.set(cat.id, cat);
    const used = new Set<string>();
    for (const c of contracts) {
      if (c.category_id && catMap.has(c.category_id)) used.add(c.category_id);
    }
    return Array.from(used);
  }, [contracts, categories]);

  const [enabledCategories, setEnabledCategories] = useState<Set<string>>(() => new Set(activeCategoryIds));
  const [showTotal, setShowTotal] = useState(true);
  const [showAverage, setShowAverage] = useState(false);
  const [showGross, setShowGross] = useState(true);
  const [granularity, setGranularity] = useState<Granularity>('monthly');

  // Time range
  const minMonth = `${timeBounds.minDate.getFullYear()}-${String(timeBounds.minDate.getMonth() + 1).padStart(2, '0')}`;
  const maxMonth = `${timeBounds.maxDate.getFullYear()}-${String(timeBounds.maxDate.getMonth() + 1).padStart(2, '0')}`;
  const [rangeFrom, setRangeFrom] = useState(minMonth);
  const [rangeTo, setRangeTo] = useState(maxMonth);

  const categoryMap = useMemo(() => {
    const m = new Map<string, Category>();
    for (const cat of categories) m.set(cat.id, cat);
    return m;
  }, [categories]);

  // Compute chart data
  const chartData = useMemo(() => {
    const fromDate = new Date(rangeFrom + '-01');
    const toDate = new Date(rangeTo + '-01');
    toDate.setMonth(toDate.getMonth() + 1); // inclusive end

    // Build monthly data
    const monthlyPoints: { date: Date; values: Record<string, number> }[] = [];
    const cursor = new Date(fromDate);
    const cumulatives: Record<string, number> = {};

    // Initialize cumulatives for period before rangeFrom
    const preDate = new Date(fromDate);
    preDate.setMonth(preDate.getMonth() - 1);
    const preCursor = new Date(timeBounds.minDate);
    preCursor.setDate(1);
    while (preCursor < fromDate) {
      const cursorStr = getMonthKey(preCursor);
      for (const c of contracts) {
        if (c.status === 'cancelled') continue;
        const startKey = c.start_date.substring(0, 7);
        const endKey = c.end_date ? c.end_date.substring(0, 7) : '9999-12';
        if (startKey > cursorStr || endKey < cursorStr) continue;
        const catId = c.category_id ?? 'uncategorized';
        cumulatives[catId] = (cumulatives[catId] ?? 0) + getMonthly(c, showGross);
      }
      preCursor.setMonth(preCursor.getMonth() + 1);
    }

    while (cursor < toDate) {
      const cursorStr = getMonthKey(cursor);
      const monthValues: Record<string, number> = {};

      for (const c of contracts) {
        if (c.status === 'cancelled') continue;
        const startKey = c.start_date.substring(0, 7);
        const endKey = c.end_date ? c.end_date.substring(0, 7) : '9999-12';
        if (startKey > cursorStr || endKey < cursorStr) continue;
        const catId = c.category_id ?? 'uncategorized';
        monthValues[catId] = (monthValues[catId] ?? 0) + getMonthly(c, showGross);
      }

      // Add to cumulatives
      for (const [catId, amount] of Object.entries(monthValues)) {
        cumulatives[catId] = (cumulatives[catId] ?? 0) + amount;
      }

      monthlyPoints.push({
        date: new Date(cursor),
        values: { ...cumulatives },
      });

      cursor.setMonth(cursor.getMonth() + 1);
    }

    // Apply granularity
    if (granularity === 'yearly') {
      const yearMap = new Map<string, { date: Date; values: Record<string, number> }>();
      for (const point of monthlyPoints) {
        const year = String(point.date.getFullYear());
        yearMap.set(year, point); // last month of each year = cumulative at year end
      }
      return Array.from(yearMap.values()).map((point) => {
        const record: Record<string, number | string> = {
          label: formatYearLabel(point.date),
        };
        let total = 0;
        for (const catId of activeCategoryIds) {
          if (enabledCategories.has(catId)) {
            const val = Math.round((point.values[catId] ?? 0) * 100) / 100;
            const cat = categoryMap.get(catId);
            record[cat?.name ?? catId] = val;
            total += val;
          }
        }
        record._total = Math.round(total * 100) / 100;
        return record;
      });
    }

    return monthlyPoints.map((point) => {
      const record: Record<string, number | string> = {
        label: formatMonthLabel(point.date),
      };
      let total = 0;
      for (const catId of activeCategoryIds) {
        if (enabledCategories.has(catId)) {
          const val = Math.round((point.values[catId] ?? 0) * 100) / 100;
          const cat = categoryMap.get(catId);
          record[cat?.name ?? catId] = val;
          total += val;
        }
      }
      record._total = Math.round(total * 100) / 100;
      return record;
    });
  }, [contracts, activeCategoryIds, enabledCategories, granularity, rangeFrom, rangeTo, categoryMap, timeBounds.minDate, showGross]);

  // Compute running average — cumulative total at each point divided by number of periods
  const chartDataWithAverage = useMemo(() => {
    if (!showAverage) return chartData;
    return chartData.map((d, idx) => ({
      ...d,
      _average: Math.round((Number(d._total ?? 0) / (idx + 1)) * 100) / 100,
    }));
  }, [chartData, showAverage]);

  // Category series config
  const enabledCategoryList = useMemo(() => {
    return activeCategoryIds
      .filter((id) => enabledCategories.has(id))
      .map((id) => {
        const cat = categoryMap.get(id);
        return { id, name: cat?.name ?? id, color: cat?.color ?? '#6366f1' };
      });
  }, [activeCategoryIds, enabledCategories, categoryMap]);

  const toggleCategory = (catId: string) => {
    setEnabledCategories((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  };

  const selectAll = () => setEnabledCategories(new Set(activeCategoryIds));
  const deselectAll = () => setEnabledCategories(new Set());

  const xAxisInterval = useMemo(() => {
    if (granularity === 'yearly') return 0;
    return Math.max(0, Math.floor(chartDataWithAverage.length / 12) - 1);
  }, [chartDataWithAverage.length, granularity]);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: orgDisplayName, href: '/dashboard' },
        { label: t('title'), href: '/analytics' },
        { label: t('cumulativeCosts') },
      ]} />

      <div className="flex items-center gap-4">
        <Link
          href="/analytics"
          className="flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('backToOverview')}
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('cumulativeCosts')}</h1>
      </div>

      {/* Controls */}
      <Card>
        <CardContent>
          <div className="flex flex-wrap items-end gap-6">
            {/* Time Range */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-500">{t('from')}</label>
              <input
                type="month"
                value={rangeFrom}
                onChange={(e) => setRangeFrom(e.target.value)}
                className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-500">{t('to')}</label>
              <input
                type="month"
                value={rangeTo}
                onChange={(e) => setRangeTo(e.target.value)}
                className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            {/* Granularity */}
            <div className="space-y-1">
              <label className="block text-xs font-medium text-zinc-500">{t('granularity')}</label>
              <div className="flex gap-1 rounded-lg border border-zinc-200 p-0.5 dark:border-zinc-700">
                <button
                  onClick={() => setGranularity('monthly')}
                  className={cn('rounded-md px-2 py-1 text-xs font-medium', granularity === 'monthly' ? 'bg-zinc-200 dark:bg-zinc-700' : 'text-zinc-500')}
                >
                  {t('granularityMonthly')}
                </button>
                <button
                  onClick={() => setGranularity('yearly')}
                  className={cn('rounded-md px-2 py-1 text-xs font-medium', granularity === 'yearly' ? 'bg-zinc-200 dark:bg-zinc-700' : 'text-zinc-500')}
                >
                  {t('granularityYearly')}
                </button>
              </div>
            </div>

            {/* Show Total / Average */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowTotal((v) => !v)}
                className={cn(
                  'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                  showTotal
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-400'
                    : 'border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400'
                )}
              >
                {t('showTotal')}
              </button>
              <button
                onClick={() => setShowAverage((v) => !v)}
                className={cn(
                  'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                  showAverage
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700 dark:border-emerald-500 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400'
                )}
              >
                {t('showAverage')}
              </button>
            </div>

            {/* Gross / Net */}
            <button
              onClick={() => setShowGross((v) => !v)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
                showGross
                  ? 'border-amber-600 bg-amber-50 text-amber-700 dark:border-amber-500 dark:bg-amber-900/20 dark:text-amber-400'
                  : 'border-zinc-300 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400'
              )}
            >
              {showGross ? t('grossLabel') : t('netLabel')}
            </button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm">{t('categories')}</CardTitle>
          <div className="flex gap-2">
            <button onClick={selectAll} className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              {t('selectAll')}
            </button>
            <span className="text-zinc-300 dark:text-zinc-600">|</span>
            <button onClick={deselectAll} className="text-xs font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              {t('deselectAll')}
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {activeCategoryIds.map((catId) => {
              const cat = categoryMap.get(catId);
              const enabled = enabledCategories.has(catId);
              return (
                <button
                  key={catId}
                  onClick={() => toggleCategory(catId)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                    enabled
                      ? 'border-transparent text-white'
                      : 'border-zinc-300 text-zinc-400 dark:border-zinc-700'
                  )}
                  style={enabled ? { backgroundColor: cat?.color ?? '#6366f1' } : undefined}
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat?.color ?? '#6366f1', opacity: enabled ? 1 : 0.3 }} />
                  {cat?.name ?? catId}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardContent>
          {chartDataWithAverage.length === 0 ? (
            <p className="py-12 text-center text-sm text-zinc-500">{t('noData')}</p>
          ) : (
            <div style={{ height: 'calc(100vh - 460px)', minHeight: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartDataWithAverage} margin={{ top: 10, right: 30, bottom: 5, left: 20 }}>
                  <defs>
                    {enabledCategoryList.map((cat) => (
                      <linearGradient key={cat.id} id={`grad-${cat.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={cat.color} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={cat.color} stopOpacity={0} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-zinc-200 dark:stroke-zinc-700" />
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 11 }}
                    interval={xAxisInterval}
                    className="text-zinc-500"
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
                    className="text-zinc-500"
                    width={70}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    labelFormatter={(label) => String(label)}
                    contentStyle={{
                      backgroundColor: 'var(--color-zinc-50, #fafafa)',
                      border: '1px solid var(--color-zinc-200, #e4e4e7)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  {enabledCategoryList.map((cat) => (
                    <Area
                      key={cat.id}
                      type="monotone"
                      dataKey={cat.name}
                      name={cat.name}
                      stroke={cat.color}
                      strokeWidth={2}
                      fill={`url(#grad-${cat.id})`}
                      dot={false}
                    />
                  ))}
                  {showTotal && (
                    <Line
                      type="monotone"
                      dataKey="_total"
                      name={t('total')}
                      stroke="#18181b"
                      strokeWidth={2.5}
                      strokeDasharray="8 4"
                      dot={false}
                    />
                  )}
                  {showAverage && (
                    <Line
                      type="monotone"
                      dataKey="_average"
                      name={showGross ? t('averageHintGross') : t('averageHintNet')}
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={false}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
