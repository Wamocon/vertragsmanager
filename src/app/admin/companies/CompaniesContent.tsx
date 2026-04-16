'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { Organization } from '@/types/database';
import { Building2 } from 'lucide-react';
import Link from 'next/link';
import { toggleOrgActive } from '../actions';

interface OrgWithStats extends Organization {
  memberCount: number;
  contractCount: number;
}

export function CompaniesContent({ organizations }: { organizations: OrgWithStats[] }) {
  const t = useTranslations('admin');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('companies')}</h1>

      <Card>
        <CardHeader><CardTitle>{t('allCompanies')} ({organizations.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="pb-2 text-left font-medium text-zinc-500">{t('companyName')}</th>
                  <th className="pb-2 text-left font-medium text-zinc-500">Slug</th>
                  <th className="pb-2 text-left font-medium text-zinc-500">{t('members')}</th>
                  <th className="pb-2 text-left font-medium text-zinc-500">{t('contracts')}</th>
                  <th className="pb-2 text-left font-medium text-zinc-500">Status</th>
                  <th className="pb-2 text-left font-medium text-zinc-500">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {organizations.map((org) => (
                  <tr key={org.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="py-3">
                      <Link href={`/admin/companies/${org.id}`} className="flex items-center gap-2 font-medium text-zinc-900 hover:text-indigo-600 dark:text-white">
                        <Building2 className="h-4 w-4 text-zinc-400" />
                        {org.name}
                      </Link>
                    </td>
                    <td className="py-3 font-mono text-xs text-zinc-500">{org.slug}</td>
                    <td className="py-3 text-zinc-600 dark:text-zinc-400">{org.memberCount}</td>
                    <td className="py-3 text-zinc-600 dark:text-zinc-400">{org.contractCount}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        org.is_active
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {org.is_active ? t('active') : t('inactive')}
                      </span>
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => toggleOrgActive(org.id, !org.is_active)}
                        className={`text-xs font-medium ${org.is_active ? 'text-red-600 hover:text-red-700' : 'text-emerald-600 hover:text-emerald-700'}`}
                      >
                        {org.is_active ? t('deactivate') : t('activate')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
