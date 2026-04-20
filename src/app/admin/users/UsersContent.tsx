'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { Profile, MemberRole } from '@/types/database';
import { User, Search, Filter } from 'lucide-react';
import { toggleUserActive, resetUserPassword } from '../actions';

interface UserWithDetails extends Profile {
  email: string;
  role: MemberRole | null;
  organizationName: string;
}

const roleLabel: Record<string, string> = {
  company_admin: 'Unternehmensadmin',
  manager: 'VerWa',
  reader: 'Leser',
};

export function UsersContent({ users }: { users: UserWithDetails[] }) {
  const t = useTranslations('admin');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [resetId, setResetId] = useState<string | null>(null);
  const [newPw, setNewPw] = useState('');

  // Unique company names for the filter dropdown
  const companyNames = useMemo(() => {
    const names = new Set(users.map((u) => u.organizationName).filter((n) => n !== '-'));
    return Array.from(names).sort();
  }, [users]);

  const hasActiveFilters = roleFilter !== 'all' || statusFilter !== 'all' || companyFilter !== 'all';

  // Step 1: Apply attribute filters
  const afterFilters = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter !== 'all' && (u.role ?? 'none') !== roleFilter) return false;
      if (statusFilter === 'active' && !u.is_active) return false;
      if (statusFilter === 'inactive' && u.is_active) return false;
      if (companyFilter !== 'all' && u.organizationName !== companyFilter) return false;
      return true;
    });
  }, [users, roleFilter, statusFilter, companyFilter]);

  // Step 2: Apply search on top of filtered set
  const filtered = useMemo(() => {
    if (!search) return afterFilters;
    const q = search.toLowerCase();
    return afterFilters.filter((u) =>
      u.full_name?.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.organizationName.toLowerCase().includes(q)
    );
  }, [afterFilters, search]);

  // Check if search would have found results without filters
  const searchMatchesUnfiltered = useMemo(() => {
    if (!search || !hasActiveFilters || filtered.length > 0) return false;
    const q = search.toLowerCase();
    return users.some((u) =>
      u.full_name?.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.organizationName.toLowerCase().includes(q)
    );
  }, [search, hasActiveFilters, filtered.length, users]);

  function clearFilters() {
    setRoleFilter('all');
    setStatusFilter('all');
    setCompanyFilter('all');
  }

  async function handleResetPassword(userId: string) {
    if (!newPw || newPw.length < 6) return;
    await resetUserPassword(userId, newPw);
    setResetId(null);
    setNewPw('');
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('allUsers')}</h1>

      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Suche nach Name, E-Mail, Unternehmen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="all">Alle Rollen</option>
          <option value="company_admin">Unternehmensadmin</option>
          <option value="manager">VerWa</option>
          <option value="reader">Leser</option>
          <option value="none">Keine Rolle</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="all">Alle Status</option>
          <option value="active">{t('active')}</option>
          <option value="inactive">{t('inactive')}</option>
        </select>

        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="all">Alle Unternehmen</option>
          {companyNames.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
          >
            <Filter className="h-3.5 w-3.5" />
            Filter zurücksetzen
          </button>
        )}
      </div>

      {/* Filter notice when search has no results but would match without filters */}
      {searchMatchesUnfiltered && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
          <Filter className="mr-1.5 inline h-4 w-4" />
          Keine Ergebnisse — es gibt Treffer für &quot;{search}&quot;, aber diese werden durch aktive Filter ausgeblendet.{' '}
          <button onClick={clearFilters} className="font-medium underline">Filter zurücksetzen</button>
        </div>
      )}

      <Card>
        <CardHeader><CardTitle>{t('users')} ({filtered.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="pb-2 text-left font-medium text-zinc-500">Name</th>
                  <th className="pb-2 text-left font-medium text-zinc-500">E-Mail</th>
                  <th className="pb-2 text-left font-medium text-zinc-500">{t('company')}</th>
                  <th className="pb-2 text-left font-medium text-zinc-500">{t('role')}</th>
                  <th className="pb-2 text-left font-medium text-zinc-500">Status</th>
                  <th className="pb-2 text-left font-medium text-zinc-500">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-zinc-400" />
                        <span className="font-medium text-zinc-900 dark:text-white">{user.full_name || '-'}</span>
                      </div>
                    </td>
                    <td className="py-3 text-zinc-600 dark:text-zinc-400">{user.email}</td>
                    <td className="py-3 text-zinc-600 dark:text-zinc-400">{user.organizationName}</td>
                    <td className="py-3">
                      <span className="text-xs text-zinc-500">{user.role ? roleLabel[user.role] : '-'}</span>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        user.is_active
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {user.is_active ? t('active') : t('inactive')}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleUserActive(user.id, !user.is_active)}
                          className={`text-xs font-medium ${user.is_active ? 'text-red-600' : 'text-emerald-600'}`}
                        >
                          {user.is_active ? t('deactivate') : t('activate')}
                        </button>
                        {resetId === user.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="password"
                              placeholder="Neues PW (min 6)"
                              value={newPw}
                              onChange={(e) => setNewPw(e.target.value)}
                              className="w-28 rounded border px-1.5 py-0.5 text-xs dark:border-zinc-700 dark:bg-zinc-800"
                            />
                            <button onClick={() => handleResetPassword(user.id)} className="text-xs font-medium text-indigo-600">OK</button>
                            <button onClick={() => { setResetId(null); setNewPw(''); }} className="text-xs text-zinc-400">✕</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setResetId(user.id)}
                            className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            {t('resetPassword')}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && !searchMatchesUnfiltered && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-sm text-zinc-500">
                      Keine Benutzer gefunden
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
