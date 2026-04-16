'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { FileUpload } from '@/components/ui/FileUpload';
import { Breadcrumb } from '@/components/layout/Sidebar';
import { useOrgDisplayName } from '@/lib/OrgContext';
import type { Organization, OrganizationMember, Profile, Invitation, AuditLogEntry, MemberRole, Category } from '@/types/database';
import { UserPlus, Shield, Pencil, Eye, Trash2, Plus } from 'lucide-react';

interface OrganizationContentProps {
  organization: Organization | null;
  members: (OrganizationMember & { profile: Profile | null })[];
  invitations: Invitation[];
  auditLog: AuditLogEntry[];
  categories: Category[];
  userRole: MemberRole;
  currentUserId: string;
}

const roleIcon = { company_admin: Shield, manager: Pencil, reader: Eye } as const;

export function OrganizationContent({ organization, members, invitations, auditLog, categories, userRole, currentUserId }: OrganizationContentProps) {
  const t = useTranslations('organization');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const orgDisplayName = useOrgDisplayName();
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<MemberRole>('reader');
  const [inviting, setInviting] = useState(false);
  const [removeMemberId, setRemoveMemberId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#6366f1');
  const [addingCategory, setAddingCategory] = useState(false);
  const [orgName, setOrgName] = useState(organization?.name ?? '');
  const [orgShortName, setOrgShortName] = useState((organization as Record<string, unknown> | null)?.short_name as string ?? '');
  const [savingOrg, setSavingOrg] = useState(false);
  const [orgMessage, setOrgMessage] = useState('');
  const isAdmin = userRole === 'company_admin';
  const roleLabel = {
    company_admin: t('companyAdmin'),
    manager: t('manager'),
    reader: t('reader'),
  } as const;

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
    const supabase = createClient();
    await supabase.from('organization_members').delete().eq('id', memberId);
    setRemoveMemberId(null);
    router.refresh();
  }

  async function handleSaveOrgInfo(e: React.FormEvent) {
    e.preventDefault();
    if (!organization || !orgName.trim()) return;
    setSavingOrg(true);
    setOrgMessage('');
    const supabase = createClient();
    // short_name may not be in generated types yet, so we use type assertion
    const updatePayload: Record<string, unknown> = { name: orgName.trim(), short_name: orgShortName.trim() || null };
    const { error } = await supabase
      .from('organizations')
      .update(updatePayload as { name: string })
      .eq('id', organization.id);
    if (error) {
      setOrgMessage(error.message);
    } else {
      setOrgMessage(t('companySaved'));
    }
    setSavingOrg(false);
    router.refresh();
  }

  async function handleLogoUpload(url: string) {
    if (!organization) return;
    const supabase = createClient();
    await supabase.from('organizations').update({ logo_url: url }).eq('id', organization.id);
    router.refresh();
  }

  async function handleRemoveLogo() {
    if (!organization) return;
    const supabase = createClient();
    await supabase.from('organizations').update({ logo_url: null }).eq('id', organization.id);
    router.refresh();
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!organization || !newCategoryName.trim()) return;
    setAddingCategory(true);
    const supabase = createClient();
    await supabase.from('categories').insert({
      organization_id: organization.id,
      name: newCategoryName.trim(),
      color: newCategoryColor,
      is_system: false,
    });
    setNewCategoryName('');
    setAddingCategory(false);
    router.refresh();
  }

  async function handleDeleteCategory(categoryId: string) {
    const supabase = createClient();
    await supabase.from('categories').delete().eq('id', categoryId).eq('is_system', false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <ConfirmDialog
        open={!!removeMemberId}
        title={t('removeMemberConfirmTitle')}
        message={t('removeMemberConfirmMessage')}
        variant="danger"
        confirmLabel={t('removeMember')}
        cancelLabel={tCommon('cancel')}
        onConfirm={() => removeMemberId && handleRemoveMember(removeMemberId)}
        onCancel={() => setRemoveMemberId(null)}
      />

      <Breadcrumb items={[{ label: orgDisplayName, href: '/dashboard' }, { label: t('title') }]} />
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
        {organization?.name ?? t('title')}
      </h1>

      {/* Company Info (Admin only) */}
      {isAdmin && organization && (
        <Card>
          <CardHeader><CardTitle>{t('companyName')}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSaveOrgInfo} className="space-y-4">
              <Input
                id="orgName"
                label={t('companyName')}
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
              />
              <div>
                <Input
                  id="orgShortName"
                  label={t('shortName')}
                  value={orgShortName}
                  onChange={(e) => setOrgShortName(e.target.value)}
                  placeholder={organization.name}
                />
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{t('shortNameHint')}</p>
              </div>
              {orgMessage && <p className="text-sm text-emerald-600">{orgMessage}</p>}
              <Button type="submit" disabled={savingOrg}>
                {savingOrg ? '...' : t('saveCompanyInfo')}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

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
                        {member.profile?.full_name ?? t('unknown')}
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
                        <option value="company_admin">{roleLabel.company_admin}</option>
                        <option value="manager">{roleLabel.manager}</option>
                        <option value="reader">{roleLabel.reader}</option>
                      </select>
                      <button onClick={() => setRemoveMemberId(member.id)} className="text-red-500 hover:text-red-700">
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
                <option value="company_admin">{roleLabel.company_admin}</option>
                <option value="manager">{roleLabel.manager}</option>
                <option value="reader">{roleLabel.reader}</option>
              </select>
              <Button type="submit" disabled={inviting}>
                <UserPlus className="mr-1.5 h-4 w-4" /> {t('inviteButton')}
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

      {/* Company Logo */}
      {isAdmin && organization && (
        <Card>
          <CardHeader><CardTitle>{t('companyLogo')}</CardTitle></CardHeader>
          <CardContent>
            <FileUpload
              bucket="logos"
              folder={organization.id}
              currentUrl={organization.logo_url}
              accept="image/jpeg,image/png,image/webp,image/svg+xml"
              maxSizeMB={2}
              label={t('companyLogo')}
              variant="logo"
              onUpload={handleLogoUpload}
              onRemove={handleRemoveLogo}
            />
          </CardContent>
        </Card>
      )}

      {/* Custom Categories */}
      {isAdmin && organization && (
        <Card>
          <CardHeader><CardTitle>{t('categories')}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-sm text-zinc-900 dark:text-white">{cat.name}</span>
                    {cat.is_system && (
                      <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800">{t('system')}</span>
                    )}
                  </div>
                  {!cat.is_system && (
                    <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <form onSubmit={handleAddCategory} className="flex items-end gap-3">
              <div className="flex-1">
                <Input
                  id="categoryName"
                  label={t('newCategory')}
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="z. B. Cloud-Dienste"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('color')}</label>
                <input
                  type="color"
                  value={newCategoryColor}
                  onChange={(e) => setNewCategoryColor(e.target.value)}
                  className="h-10 w-10 cursor-pointer rounded border border-zinc-300 dark:border-zinc-700"
                />
              </div>
              <Button type="submit" size="sm" disabled={addingCategory}>
                <Plus className="mr-1 h-4 w-4" /> {t('addCategory')}
              </Button>
            </form>
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
