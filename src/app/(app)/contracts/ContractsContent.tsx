'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Breadcrumb } from '@/components/layout/Sidebar';
import { formatCurrency, computeMonthlyAmount } from '@/lib/format';
import { useOrgDisplayName } from '@/lib/OrgContext';
import type { Contract, Category, MemberRole } from '@/types/database';
import { Plus, LayoutGrid, List, Search } from 'lucide-react';

interface ContractsContentProps {
  contracts: (Contract & { category: Category | null })[];
  categories: Category[];
  organizationId: string;
  userRole: MemberRole;
}

function getMonthly(contract: Contract): number {
  return computeMonthlyAmount(Number(contract.amount), contract.payment_interval);
}

export function ContractsContent({ contracts, categories, userRole }: ContractsContentProps) {
  const t = useTranslations('contracts');
  const orgDisplayName = useOrgDisplayName();
  const [view, setView] = useState<'cards' | 'list'>('cards');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<string>('active_only');
  const [sortBy, setSortBy] = useState<'name' | 'cost' | 'deadline' | 'provider'>('name');

  const canEdit = userRole === 'company_admin' || userRole === 'manager';

  const filtered = useMemo(() => {
    let result = [...contracts];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.provider.toLowerCase().includes(q) ||
        (c.notes?.toLowerCase().includes(q) ?? false) ||
        (c.description?.toLowerCase().includes(q) ?? false)
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      result = result.filter((c) => c.category_id === categoryFilter);
    }

    // Status filter
    if (statusFilter === 'active_only') {
      result = result.filter((c) => c.status !== 'expired' && c.status !== 'cancelled');
    } else if (statusFilter !== 'all') {
      result = result.filter((c) => c.status === statusFilter);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'cost': return getMonthly(b) - getMonthly(a);
        case 'deadline': {
          const da = a.cancellation_deadline ? new Date(a.cancellation_deadline).getTime() : Infinity;
          const db = b.cancellation_deadline ? new Date(b.cancellation_deadline).getTime() : Infinity;
          return da - db;
        }
        case 'provider': return a.provider.localeCompare(b.provider);
        default: return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [contracts, search, categoryFilter, statusFilter, sortBy]);

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: orgDisplayName, href: '/dashboard' }, { label: t('title') }]} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>
        {canEdit && (
          <Link href="/contracts/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              {t('addContract')}
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder={`${t('title')} ${t('sortProvider')}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="all">{t('allCategories')}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="active_only">Aktive Verträge</option>
          <option value="all">{t('allStatuses')}</option>
          <option value="active">{t('statusActive')}</option>
          <option value="expiring_soon">{t('statusExpiringSoon')}</option>
          <option value="expired">{t('statusExpired')}</option>
          <option value="cancelled">{t('statusCancelled')}</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="name">{t('sortName')}</option>
          <option value="cost">{t('sortCost')}</option>
          <option value="deadline">{t('sortDeadline')}</option>
          <option value="provider">{t('sortProvider')}</option>
        </select>

        <div className="flex gap-1 rounded-lg border border-zinc-300 p-0.5 dark:border-zinc-700">
          <button onClick={() => setView('cards')} className={`rounded-md p-1.5 ${view === 'cards' ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}>
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button onClick={() => setView('list')} className={`rounded-md p-1.5 ${view === 'list' ? 'bg-zinc-200 dark:bg-zinc-700' : ''}`}>
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-zinc-500 dark:text-zinc-400">Keine Verträge gefunden</p>
        </div>
      ) : view === 'cards' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((contract) => (
            <Link key={contract.id} href={`/contracts/${contract.id}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium text-zinc-900 dark:text-white">{contract.name}</p>
                      <p className="mt-0.5 text-sm text-zinc-500">{contract.provider}</p>
                    </div>
                    <StatusBadge status={contract.status} />
                  </div>
                  {contract.category && (
                    <div className="mt-3 flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: contract.category.color }} />
                      <span className="text-xs text-zinc-500">{contract.category.name}</span>
                    </div>
                  )}
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {formatCurrency(getMonthly(contract))}
                      </p>
                      <p className="text-xs text-zinc-500">{t('perMonth')}</p>
                    </div>
                    {contract.cancellation_deadline && (
                      <div className="text-right">
                        <p className="text-xs text-zinc-500">Kündigungsfrist</p>
                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          {new Date(contract.cancellation_deadline).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="pb-2 text-left font-medium text-zinc-500">Name</th>
                    <th className="pb-2 text-left font-medium text-zinc-500">Anbieter</th>
                    <th className="pb-2 text-left font-medium text-zinc-500">Kategorie</th>
                    <th className="pb-2 text-left font-medium text-zinc-500">Kosten/Mo</th>
                    <th className="pb-2 text-left font-medium text-zinc-500">Kündigungsfrist</th>
                    <th className="pb-2 text-left font-medium text-zinc-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {filtered.map((contract) => (
                    <tr key={contract.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                      <td className="py-3">
                        <Link href={`/contracts/${contract.id}`} className="font-medium text-zinc-900 hover:text-indigo-600 dark:text-white">
                          {contract.name}
                        </Link>
                      </td>
                      <td className="py-3 text-zinc-600 dark:text-zinc-400">{contract.provider}</td>
                      <td className="py-3">
                        {contract.category && (
                          <span className="inline-flex items-center gap-1.5 text-xs">
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: contract.category.color }} />
                            {contract.category.name}
                          </span>
                        )}
                      </td>
                      <td className="py-3 font-medium text-zinc-900 dark:text-white">{formatCurrency(getMonthly(contract))}</td>
                      <td className="py-3 text-zinc-600 dark:text-zinc-400">
                        {contract.cancellation_deadline ? new Date(contract.cancellation_deadline).toLocaleDateString('de-DE') : '-'}
                      </td>
                      <td className="py-3"><StatusBadge status={contract.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
