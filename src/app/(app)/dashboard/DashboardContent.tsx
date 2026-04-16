'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Breadcrumb } from '@/components/layout/Sidebar';
import { formatCurrency, computeMonthlyAmount } from '@/lib/format';
import { useOrgDisplayName } from '@/lib/OrgContext';
import type { Contract, Category, Notification, Profile, MemberRole } from '@/types/database';
import { FileText, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardContentProps {
  contracts: (Contract & { category: Category | null })[];
  categories: Category[];
  notifications: Notification[];
  profile: Profile | null;
  userRole: MemberRole;
}

function getMonthly(contract: Contract): number {
  return computeMonthlyAmount(Number(contract.amount), contract.payment_interval);
}

export function DashboardContent({ contracts, categories, profile }: DashboardContentProps) {
  const t = useTranslations('dashboard');
  const orgDisplayName = useOrgDisplayName();

  // Only count contracts that are active in the current month (exclude expired/cancelled)
  const now = new Date();
  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const activeContracts = contracts.filter((c) => {
    if (c.status === 'cancelled' || c.status === 'expired') return false;
    const startKey = c.start_date.substring(0, 7);
    const endKey = c.end_date ? c.end_date.substring(0, 7) : '9999-12';
    return startKey <= currentMonthKey && endKey >= currentMonthKey;
  });

  const totalMonthly = activeContracts.reduce((sum, c) => sum + getMonthly(c), 0);

  // Yearly: sum of actual monthly costs for each month of the current year
  const currentYear = now.getFullYear();
  let totalYearly = 0;
  for (let m = 0; m < 12; m++) {
    const mk = `${currentYear}-${String(m + 1).padStart(2, '0')}`;
    for (const c of contracts) {
      if (c.status === 'cancelled') continue;
      const sk = c.start_date.substring(0, 7);
      const ek = c.end_date ? c.end_date.substring(0, 7) : '9999-12';
      if (sk <= mk && ek >= mk) totalYearly += computeMonthlyAmount(Number(c.amount), c.payment_interval);
    }
  }
  totalYearly = Math.round(totalYearly * 100) / 100;

  const today = new Date();
  const in30Days = new Date(today);
  in30Days.setDate(in30Days.getDate() + 30);

  const upcomingDeadlines = contracts
    .filter((c) => {
      if (!c.cancellation_deadline) return false;
      const deadline = new Date(c.cancellation_deadline);
      return deadline >= today && deadline <= in30Days;
    })
    .sort((a, b) => new Date(a.cancellation_deadline!).getTime() - new Date(b.cancellation_deadline!).getTime());

  const expiringContracts = contracts.filter((c) => c.status === 'expiring_soon');
  const recentContracts = contracts.slice(0, 5);

  // Cost by category
  const costByCategory = categories
    .map((cat) => {
      const catContracts = activeContracts.filter((c) => c.category_id === cat.id);
      const total = catContracts.reduce((sum, c) => sum + getMonthly(c), 0);
      return { name: cat.name, color: cat.color, total };
    })
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: orgDisplayName, href: '/dashboard' }, { label: t('title') }]} />

      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>
        {profile?.full_name && (
          <p className="mt-1 text-zinc-500 dark:text-zinc-400">{t('welcome')}, {profile.full_name}</p>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Link href="/contracts/new" className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800">
          {t('ctaNewContract')}
        </Link>
        <Link href="/deadlines" className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800">
          {t('ctaDeadlines')}
        </Link>
        <Link href="/analytics" className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800">
          {t('ctaAnalytics')}
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/contracts">
          <Card className="transition-shadow hover:shadow-md cursor-pointer">
            <CardContent className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('totalContracts')}</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">{activeContracts.length}</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/analytics">
          <Card className="transition-shadow hover:shadow-md cursor-pointer">
            <CardContent className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('monthlyCosts')}</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">{formatCurrency(totalMonthly)}</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/analytics">
          <Card className="transition-shadow hover:shadow-md cursor-pointer">
            <CardContent className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('yearlyCosts')}</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">{formatCurrency(totalYearly)}</p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/deadlines">
          <Card className="transition-shadow hover:shadow-md cursor-pointer">
            <CardContent className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                <Clock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{t('upcomingDeadlines')}</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">{upcomingDeadlines.length}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Monthly Cost Trend */}
      <MonthlyTrendChart contracts={contracts} currentYear={currentYear} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Cost by Category */}
        <Card>
          <CardHeader>
            <CardTitle>{t('costByCategory')}</CardTitle>
          </CardHeader>
          <CardContent>
            {costByCategory.length === 0 ? (
              <p className="text-sm text-zinc-500">{t('noContracts')}</p>
            ) : (
              <div className="space-y-3">
                {costByCategory.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="flex-1 text-sm text-zinc-700 dark:text-zinc-300">{cat.name}</span>
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">{formatCurrency(cat.total)}/Mo</span>
                  </div>
                ))}
                <div className="border-t border-zinc-200 pt-2 dark:border-zinc-800">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-sm text-zinc-900 dark:text-white">{t('totalLabel')}</span>
                    <span className="text-sm text-zinc-900 dark:text-white">{formatCurrency(totalMonthly)}/Mo</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>{t('expiringContracts')}</CardTitle>
          </CardHeader>
          <CardContent>
            {expiringContracts.length === 0 ? (
              <p className="text-sm text-zinc-500">{t('noExpiringContracts')}</p>
            ) : (
              <div className="space-y-3">
                {expiringContracts.map((contract) => {
                  const daysLeft = contract.cancellation_deadline
                    ? Math.ceil((new Date(contract.cancellation_deadline).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                    : null;
                  return (
                    <Link
                      key={contract.id}
                      href={`/contracts/${contract.id}`}
                      className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                    >
                      <div>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">{contract.name}</p>
                        <p className="text-xs text-zinc-500">{contract.provider}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {daysLeft !== null && daysLeft <= 14 && (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="text-xs text-zinc-500">
                          {daysLeft !== null ? `${daysLeft} Tage` : '-'}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Contracts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('recentContracts')}</CardTitle>
          <Link href="/contracts" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            {t('showAll')} →
          </Link>
        </CardHeader>
        <CardContent>
          {recentContracts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-zinc-500">{t('noContracts')}</p>
              <Link href="/contracts/new" className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {t('addFirst')} →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="pb-2 text-left font-medium text-zinc-500">Name</th>
                    <th className="pb-2 text-left font-medium text-zinc-500">Anbieter</th>
                    <th className="pb-2 text-left font-medium text-zinc-500">Kosten/Mo</th>
                    <th className="pb-2 text-left font-medium text-zinc-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {recentContracts.map((contract) => (
                    <tr key={contract.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                      <td className="py-3">
                        <Link href={`/contracts/${contract.id}`} className="font-medium text-zinc-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">
                          {contract.name}
                        </Link>
                      </td>
                      <td className="py-3 text-zinc-600 dark:text-zinc-400">{contract.provider}</td>
                      <td className="py-3 text-zinc-900 dark:text-white">{formatCurrency(getMonthly(contract))}</td>
                      <td className="py-3"><StatusBadge status={contract.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function MonthlyTrendChart({ contracts, currentYear }: { contracts: (Contract & { category: Category | null })[]; currentYear: number }) {
  const t = useTranslations('dashboard');

  const chartData = useMemo(() => {
    const data: { month: string; total: number }[] = [];
    for (let m = 0; m < 12; m++) {
      const mk = `${currentYear}-${String(m + 1).padStart(2, '0')}`;
      let monthTotal = 0;
      for (const c of contracts) {
        if (c.status === 'cancelled') continue;
        const sk = c.start_date.substring(0, 7);
        const ek = c.end_date ? c.end_date.substring(0, 7) : '9999-12';
        if (sk <= mk && ek >= mk) {
          monthTotal += computeMonthlyAmount(Number(c.amount), c.payment_interval);
        }
      }
      data.push({
        month: new Date(currentYear, m).toLocaleDateString('de-DE', { month: 'short' }),
        total: Math.round(monthTotal * 100) / 100,
      });
    }
    return data;
  }, [contracts, currentYear]);

  if (contracts.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
          {t('monthlyCostTrend')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
              <defs>
                <linearGradient id="dashTrendGrad" x1="0" y1="0" x2="0" y2="1">
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
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Area
                type="monotone"
                dataKey="total"
                name={t('monthlyCosts')}
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#dashTrendGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
