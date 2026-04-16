'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Breadcrumb } from '@/components/layout/Sidebar';
import { ContractForm } from '../ContractForm';
import { formatCurrency, computeMonthlyAmount, computeProjectedTotalCost, netToGross, grossToNet } from '@/lib/format';
import { useOrgDisplayName } from '@/lib/OrgContext';
import { cn } from '@/lib/utils';
import type { Contract, Category, Reminder, MemberRole, ContractComment, Profile, OrganizationMember } from '@/types/database';
import { Pencil, Trash2, Bell, BellOff, MessageCircle, Send, RefreshCw } from 'lucide-react';

const ROLE_BADGE_KEY: Record<MemberRole, string> = {
  company_admin: 'roleCompanyAdmin',
  manager: 'roleManager',
  reader: 'roleReader',
};

const ROLE_BADGE_STYLE: Record<MemberRole, string> = {
  company_admin: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  manager: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  reader: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
};

interface ContractDetailProps {
  contract: Contract & { category: Category | null };
  reminders: Reminder[];
  categories: Category[];
  comments: (ContractComment & { profile: Profile | null })[];
  orgMembers: Pick<OrganizationMember, 'user_id' | 'role'>[];
  userRole: MemberRole;
  userId: string;
  organizationId: string;
}

export function ContractDetail({ contract, reminders, categories, comments, orgMembers, userRole, userId, organizationId }: ContractDetailProps) {
  const t = useTranslations('contracts');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const orgDisplayName = useOrgDisplayName();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const canEdit = userRole === 'company_admin' || userRole === 'manager';
  const canDelete = userRole === 'company_admin';

  const monthly = computeMonthlyAmount(Number(contract.amount), contract.payment_interval);
  const projectedTotal = computeProjectedTotalCost(
    Number(contract.amount),
    contract.payment_interval,
    contract.start_date,
    contract.end_date,
    contract.auto_renew,
    contract.renewal_count,
    contract.max_renewals,
  );

  async function handleDelete() {
    setDeleting(true);
    const supabase = createClient();
    await supabase.from('contracts').delete().eq('id', contract.id);
    router.push('/contracts');
    router.refresh();
  }

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;
    setSubmittingComment(true);
    const supabase = createClient();
    await supabase.from('contract_comments').insert({
      contract_id: contract.id,
      organization_id: organizationId,
      user_id: userId,
      content: commentText.trim(),
    });
    setCommentText('');
    setSubmittingComment(false);
    router.refresh();
  }

  async function toggleReminder(reminderId: string, enabled: boolean) {
    const supabase = createClient();
    await supabase.from('reminders').update({ enabled: !enabled }).eq('id', reminderId);
    router.refresh();
  }

  if (editing) {
    return (
      <ContractForm
        contract={contract}
        categories={categories}
        organizationId={organizationId}
        userId={userId}
        userRole={userRole}
      />
    );
  }

  return (
    <div className="space-y-6">
      <ConfirmDialog
        open={showDeleteConfirm}
        title={t('deleteContract')}
        message={t('deleteConfirm')}
        variant="danger"
        confirmLabel={t('deleteContract') ?? 'Löschen'}
        cancelLabel={tCommon('cancel')}
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      <Breadcrumb items={[
        { label: orgDisplayName, href: '/dashboard' },
        { label: t('title'), href: '/contracts' },
        { label: contract.name },
      ]} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{contract.name}</h1>
            <StatusBadge status={contract.status} />
          </div>
          <p className="mt-1 text-zinc-500">{contract.provider}</p>
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
              <Pencil className="mr-1.5 h-4 w-4" /> {t('editContract')}
            </Button>
            {canDelete && (
              <Button variant="danger" size="sm" onClick={() => setShowDeleteConfirm(true)} disabled={deleting}>
                <Trash2 className="mr-1.5 h-4 w-4" /> {t('deleteContract')}
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Details */}
        <Card>
          <CardHeader><CardTitle>{t('contractDetails')}</CardTitle></CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              {contract.description && (
                <div>
                  <dt className="text-zinc-500">{t('description')}</dt>
                  <dd className="mt-0.5 text-zinc-900 dark:text-white">{contract.description}</dd>
                </div>
              )}
              {contract.category && (
                <div>
                  <dt className="text-zinc-500">{t('category')}</dt>
                  <dd className="mt-0.5 flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: contract.category.color }} />
                    <span className="text-zinc-900 dark:text-white">{contract.category.name}</span>
                  </dd>
                </div>
              )}
              {contract.customer_number && (
                <div>
                  <dt className="text-zinc-500">{t('customerNumber')}</dt>
                  <dd className="mt-0.5 font-mono text-zinc-900 dark:text-white">{contract.customer_number}</dd>
                </div>
              )}
              {contract.notes && (
                <div>
                  <dt className="text-zinc-500">{t('notes')}</dt>
                  <dd className="mt-0.5 text-zinc-900 dark:text-white whitespace-pre-wrap">{contract.notes}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        {/* Financial & Dates */}
        <Card>
          <CardHeader><CardTitle>{t('durationCosts')}</CardTitle></CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-500">{t('amount')} ({contract.is_gross ? 'Brutto' : 'Netto'})</dt>
                <dd className="font-medium text-zinc-900 dark:text-white">
                  {formatCurrency(Number(contract.amount))} / {t(contract.payment_interval)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">{contract.is_gross ? 'Netto' : 'Brutto'}</dt>
                <dd className="text-zinc-600 dark:text-zinc-400">
                  {contract.is_gross
                    ? formatCurrency(grossToNet(Number(contract.amount), contract.tax_rate))
                    : formatCurrency(netToGross(Number(contract.amount), contract.tax_rate))}
                  <span className="ml-1 text-xs">({contract.tax_rate}% MwSt)</span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">{t('monthlyCost')}</dt>
                <dd className="font-medium text-zinc-900 dark:text-white">{formatCurrency(monthly)}</dd>
              </div>
              <div className="flex justify-between border-t border-zinc-200 pt-3 dark:border-zinc-800">
                <dt className="text-zinc-500">{t('projectedTotalCost')}</dt>
                <dd className="font-bold text-zinc-900 dark:text-white">{formatCurrency(projectedTotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-500">{t('startDate')}</dt>
                <dd className="text-zinc-900 dark:text-white">{new Date(contract.start_date).toLocaleDateString('de-DE')}</dd>
              </div>
              {contract.end_date && (
                <div className="flex justify-between">
                  <dt className="text-zinc-500">{t('endDate')}</dt>
                  <dd className="text-zinc-900 dark:text-white">{new Date(contract.end_date).toLocaleDateString('de-DE')}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-zinc-500">{t('cancellationPeriod')}</dt>
                <dd className="text-zinc-900 dark:text-white">{contract.cancellation_period_days} {t('days')}</dd>
              </div>
              {contract.cancellation_deadline && (
                <div className="flex justify-between border-t border-zinc-200 pt-3 dark:border-zinc-800">
                  <dt className="font-medium text-amber-600 dark:text-amber-400">{t('cancellationDeadline')}</dt>
                  <dd className="font-bold text-amber-600 dark:text-amber-400">
                    {new Date(contract.cancellation_deadline).toLocaleDateString('de-DE')}
                  </dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-zinc-500">{t('autoRenew')}</dt>
                <dd className="text-zinc-900 dark:text-white">{contract.auto_renew ? tCommon('yes') : tCommon('no')}</dd>
              </div>
              {contract.auto_renew && contract.end_date && (() => {
                const start = new Date(contract.start_date);
                const end = new Date(contract.end_date);
                let years = end.getFullYear() - start.getFullYear();
                let months = end.getMonth() - start.getMonth();
                let days = end.getDate() - start.getDate();
                if (days < 0) { months--; days += new Date(end.getFullYear(), end.getMonth(), 0).getDate(); }
                if (months < 0) { years--; months += 12; }
                const parts: string[] = [];
                if (years > 0) parts.push(`${years} ${years === 1 ? t('year') : t('years')}`);
                if (months > 0) parts.push(`${months} ${months === 1 ? t('month') : t('months')}`);
                if (days > 0 && years === 0) parts.push(`${days} ${t('days')}`);
                const label = parts.join(', ');
                return label ? (
                  <div className="flex items-center justify-between rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      <dt className="font-medium text-indigo-700 dark:text-indigo-400">{t('renewalDuration')}</dt>
                    </div>
                    <dd className="font-bold text-indigo-700 dark:text-indigo-400">{label}</dd>
                  </div>
                ) : null;
              })()}
              {contract.licenses_purchased && (
                <div className="flex justify-between">
                  <dt className="text-zinc-500">{t('licenses')}</dt>
                  <dd className="text-zinc-900 dark:text-white">
                    {contract.licenses_used ?? 0} / {contract.licenses_purchased} {t('used')}
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* Reminders */}
      <Card>
        <CardHeader><CardTitle>{t('reminders')}</CardTitle></CardHeader>
        <CardContent>
          {reminders.length === 0 ? (
            <p className="text-sm text-zinc-500">{t('noReminders')}</p>
          ) : (
            <div className="space-y-2">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    {reminder.enabled ? (
                      <Bell className="h-4 w-4 text-indigo-600" />
                    ) : (
                      <BellOff className="h-4 w-4 text-zinc-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {t('daysBefore', { days: reminder.days_before })}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {new Date(reminder.remind_at).toLocaleDateString('de-DE')}
                        {reminder.sent && ` — ${t('sent')} ✓`}
                      </p>
                    </div>
                  </div>
                  {canEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleReminder(reminder.id, reminder.enabled)}
                    >
                      {reminder.enabled ? t('deactivate') : t('activate')}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            {t('comments')} ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {comments.length > 0 && (
            <div className="mb-4 space-y-3">
              {comments.map((comment) => {
                const memberRole = orgMembers.find((m) => m.user_id === comment.user_id)?.role;
                return (
                <div key={comment.id} className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium dark:bg-zinc-700">
                        {comment.profile?.full_name?.charAt(0)?.toUpperCase() ?? '?'}
                      </div>
                      <span className="text-sm font-medium text-zinc-900 dark:text-white">
                        {comment.profile?.full_name ?? tCommon('none')}
                      </span>
                      {memberRole && (
                        <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', ROLE_BADGE_STYLE[memberRole])}>
                          {t(ROLE_BADGE_KEY[memberRole] as Parameters<typeof t>[0])}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-400">
                      {new Date(comment.created_at).toLocaleString('de-DE')}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{comment.content}</p>
                </div>
                );
              })}
            </div>
          )}

          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={t('writeComment')}
              className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
            <Button type="submit" size="sm" disabled={submittingComment || !commentText.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
