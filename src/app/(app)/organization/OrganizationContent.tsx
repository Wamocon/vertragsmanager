'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Breadcrumb } from '@/components/layout/Sidebar';
import type { Organization, OrganizationMember, Profile, Invitation, AuditLogEntry, MemberRole } from '@/types/database';
import { UserPlus, Shield, Pencil, Eye, Trash2 } from 'lucide-react';

interface OrganizationContentProps {
  organization: Organization | null;
  members: (OrganizationMember & { profile: Profile | null })[];
  invitations: Invitation[];
  auditLog: AuditLogEntry[];
  userRole: MemberRole;
  currentUserId: string;
}

const roleIcon = { company_admin: Shield, manager: Pencil, reader: Eye } as const;
const roleLabel = { company_admin: 'Unternehmensadmin', manager: 'Vertragsmanager', reader: 'Leser' } as const;

export function OrganizationContent({ organization, members, invitations, auditLog, userRole, currentUserId }: OrganizationContentProps) {
  const t = useTranslations('organization');
  const router = useRouter();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<MemberRole>('reader');
  const [inviting, setInviting] = useState(false);
  const isAdmin = userRole === 'company_admin';

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!organization || !inviteEmail) return;
    setInviting(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from('invitations').insert({
      organization_id: organization.id,
      email: inviteEmail,
      role: inviteRole,
      invited_by: user.id,
      accepted: false,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });

    setInviteEmail('');
    setInviting(false);
    router.refresh();
  }

  async function handleChangeRole(memberId: string, newRole: MemberRole) {
    const supabase = createClient();
    await supabase.from('organization_members').update({ role: newRole }).eq('id', memberId);
    router.refresh();
  }

  async function handleRemoveMember(memberId: string) {
    if (!confirm('Mitglied wirklich entfernen?')) return;
    const supabase = createClient();
    await supabase.from('organization_members').delete().eq('id', memberId);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: t('title') }]} />
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
        {organization?.name ?? t('title')}
      </h1>

      {/* Members */}
      <Card>
        <CardHeader><CardTitle>{t('members')} ({members.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            {members.map((member) => {
              const Icon = roleIcon[member.role];
              return (
                <div key={member.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 text-sm font-medium dark:bg-zinc-700">
                      {member.profile?.full_name?.charAt(0)?.toUpperCase() ?? '?'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {member.profile?.full_name ?? 'Unbekannt'}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Icon className="h-3 w-3" />
                        {roleLabel[member.role]}
                      </div>
                    </div>
                  </div>
                  {isAdmin && member.user_id !== currentUserId && (
                    <div className="flex gap-2">
                      <select
                        value={member.role}
                        onChange={(e) => handleChangeRole(member.id, e.target.value as MemberRole)}
                        className="rounded border border-zinc-300 px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-800"
                      >
                        <option value="company_admin">Unternehmensadmin</option>
                        <option value="manager">Vertragsmanager</option>
                        <option value="reader">Leser</option>
                      </select>
                      <button onClick={() => handleRemoveMember(member.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Invite */}
      {isAdmin && (
        <Card>
          <CardHeader><CardTitle>{t('inviteMember')}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px]">
                <Input
                  id="inviteEmail"
                  type="email"
                  placeholder="email@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  required
                />
              </div>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as MemberRole)}
                className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
              >
                <option value="company_admin">Unternehmensadmin</option>
                <option value="manager">Vertragsmanager</option>
                <option value="reader">Leser</option>
              </select>
              <Button type="submit" disabled={inviting}>
                <UserPlus className="mr-1.5 h-4 w-4" /> Einladen
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Pending invitations */}
      {invitations.length > 0 && (
        <Card>
          <CardHeader><CardTitle>{t('pendingInvites')} ({invitations.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {invitations.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between text-sm rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <span className="text-zinc-700 dark:text-zinc-300">{inv.email}</span>
                  <span className="text-xs text-zinc-500">{roleLabel[inv.role]} — läuft ab {new Date(inv.expires_at).toLocaleDateString('de-DE')}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audit Log */}
      <Card>
        <CardHeader><CardTitle>{t('auditLog')}</CardTitle></CardHeader>
        <CardContent>
          {auditLog.length === 0 ? (
            <p className="text-sm text-zinc-500">Keine Einträge</p>
          ) : (
            <div className="space-y-2 text-sm">
              {auditLog.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">{entry.action}</span>
                    <span className="ml-2 text-zinc-500">{entry.entity_type}</span>
                  </div>
                  <span className="text-xs text-zinc-400">{new Date(entry.created_at).toLocaleString('de-DE')}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
