'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { Organization, OrganizationMember, Profile, MemberRole } from '@/types/database';
import { Building2, Shield, Pencil, Eye } from 'lucide-react';
import Link from 'next/link';
import { toggleOrgActive, toggleUserActive, resetUserPassword } from '../../actions';
import { useState } from 'react';

interface MemberWithProfile extends OrganizationMember {
  profile: Profile | null;
  email: string;
}

interface CompanyDetailProps {
  organization: Organization;
  members: MemberWithProfile[];
  contracts: { id: string; name: string; provider: string; amount: number; payment_interval: string; status: string }[];
}

const roleIcon: Record<MemberRole, typeof Shield> = { company_admin: Shield, manager: Pencil, reader: Eye };
const roleLabel: Record<MemberRole, string> = { company_admin: 'Unternehmensadmin', manager: 'VerWa', reader: 'Leser' };
const roleOrder: Record<MemberRole, number> = { company_admin: 0, manager: 1, reader: 2 };

export function CompanyDetail({ organization, members, contracts }: CompanyDetailProps) {
  const t = useTranslations('admin');
  const [resetId, setResetId] = useState<string | null>(null);
  const [newPw, setNewPw] = useState('');

  const sortedMembers = [...members].sort(
    (a, b) => roleOrder[a.role] - roleOrder[b.role],
  );

  const grouped: Record<MemberRole, MemberWithProfile[]> = {
    company_admin: sortedMembers.filter((m) => m.role === 'company_admin'),
    manager: sortedMembers.filter((m) => m.role === 'manager'),
    reader: sortedMembers.filter((m) => m.role === 'reader'),
  };

  async function handleResetPassword(userId: string) {
    if (!newPw || newPw.length < 6) return;
    await resetUserPassword(userId, newPw);
    setResetId(null);
    setNewPw('');
  }

  return (
    <div className="space-y-6">
      <Link href="/admin/companies" className="text-sm text-indigo-600 hover:text-indigo-500">
        ← {t('companies')}
      </Link>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-zinc-400" />
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{organization.name}</h1>
            <p className="text-sm text-zinc-500">{organization.slug} · {t('created')} {new Date(organization.created_at).toLocaleDateString('de-DE')}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
            organization.is_active
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {organization.is_active ? t('active') : t('inactive')}
          </span>
          <Button
            variant={organization.is_active ? 'danger' : 'primary'}
            size="sm"
            onClick={() => toggleOrgActive(organization.id, !organization.is_active)}
          >
            {organization.is_active ? t('deactivate') : t('activate')}
          </Button>
        </div>
      </div>

      {/* User Tree by Role */}
      <Card>
        <CardHeader><CardTitle>{t('userTree')} ({members.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-6">
            {(['company_admin', 'manager', 'reader'] as MemberRole[]).map((role) => {
              const Icon = roleIcon[role];
              const membersInRole = grouped[role];
              if (membersInRole.length === 0) return null;
              return (
                <div key={role}>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    <Icon className="h-4 w-4" />
                    {roleLabel[role]} ({membersInRole.length})
                  </div>
                  <div className="ml-6 space-y-2 border-l-2 border-zinc-200 pl-4 dark:border-zinc-700">
                    {membersInRole.map((member) => (
                      <div key={member.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium dark:bg-zinc-700">
                            {member.profile?.full_name?.charAt(0)?.toUpperCase() ?? '?'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-900 dark:text-white">
                              {member.profile?.full_name ?? 'Unbekannt'}
                            </p>
                            <p className="text-xs text-zinc-500">{member.email}</p>
                          </div>
                          <span className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                            member.profile?.is_active
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {member.profile?.is_active ? t('active') : t('inactive')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleUserActive(member.user_id, !member.profile?.is_active)}
                            className={`text-xs font-medium ${member.profile?.is_active ? 'text-red-600' : 'text-emerald-600'}`}
                          >
                            {member.profile?.is_active ? t('deactivate') : t('activate')}
                          </button>
                          {resetId === member.user_id ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="password"
                                placeholder="Neues PW"
                                value={newPw}
                                onChange={(e) => setNewPw(e.target.value)}
                                className="w-24 rounded border px-1.5 py-0.5 text-xs dark:border-zinc-700 dark:bg-zinc-800"
                              />
                              <button onClick={() => handleResetPassword(member.user_id)} className="text-xs font-medium text-indigo-600">OK</button>
                              <button onClick={() => { setResetId(null); setNewPw(''); }} className="text-xs text-zinc-400">✕</button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setResetId(member.user_id)}
                              className="text-xs font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              {t('resetPassword')}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Contracts Overview */}
      <Card>
        <CardHeader><CardTitle>{t('contracts')} ({contracts.length})</CardTitle></CardHeader>
        <CardContent>
          {contracts.length === 0 ? (
            <p className="text-sm text-zinc-500">Keine Verträge</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="pb-2 text-left font-medium text-zinc-500">Name</th>
                    <th className="pb-2 text-left font-medium text-zinc-500">Anbieter</th>
                    <th className="pb-2 text-left font-medium text-zinc-500">Betrag</th>
                    <th className="pb-2 text-left font-medium text-zinc-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {contracts.map((c) => (
                    <tr key={c.id}>
                      <td className="py-2 font-medium text-zinc-900 dark:text-white">{c.name}</td>
                      <td className="py-2 text-zinc-600 dark:text-zinc-400">{c.provider}</td>
                      <td className="py-2 text-zinc-900 dark:text-white">€{Number(c.amount).toFixed(2)}</td>
                      <td className="py-2">
                        <span className="text-xs capitalize text-zinc-500">{c.status}</span>
                      </td>
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
