'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import type { Organization } from '@/types/database';
import { Building2, Users, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

interface AdminDashboardProps {
  totalOrgs: number;
  activeOrgs: number;
  totalUsers: number;
  activeUsers: number;
  recentOrgs: Organization[];
}

export function AdminDashboard({ totalOrgs, activeOrgs, totalUsers, activeUsers, recentOrgs }: AdminDashboardProps) {
  const t = useTranslations('admin');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('adminDashboard')}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">{t('totalCompanies')}</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{totalOrgs}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
              <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">{t('activeCompanies')}</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{activeOrgs}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
              <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">{t('totalUsers')}</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{totalUsers}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <XCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-zinc-500">{t('inactiveUsers')}</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">{totalUsers - activeUsers}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('recentCompanies')}</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrgs.length === 0 ? (
            <p className="text-sm text-zinc-500">Keine Unternehmen vorhanden</p>
          ) : (
            <div className="space-y-2">
              {recentOrgs.map((org) => (
                <Link
                  key={org.id}
                  href={`/admin/companies/${org.id}`}
                  className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-zinc-400" />
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-white">{org.name}</p>
                      <p className="text-xs text-zinc-500">{new Date(org.created_at).toLocaleDateString('de-DE')}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    org.is_active
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {org.is_active ? t('active') : t('inactive')}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
