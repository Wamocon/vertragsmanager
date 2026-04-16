'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Breadcrumb } from '@/components/layout/Sidebar';
import type { Category, Contract, MemberRole } from '@/types/database';

interface ContractFormProps {
  categories: Category[];
  organizationId: string;
  userId: string;
  contract?: Contract;
  userRole?: MemberRole;
}

export function ContractForm({ categories, organizationId, userId, contract, userRole }: ContractFormProps) {
  const t = useTranslations('contracts');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSecurityConfirm, setShowSecurityConfirm] = useState(false);
  const isManager = userRole === 'manager';

  const [form, setForm] = useState({
    name: contract?.name ?? '',
    provider: contract?.provider ?? '',
    description: contract?.description ?? '',
    category_id: contract?.category_id ?? '',
    start_date: contract?.start_date ?? new Date().toISOString().split('T')[0],
    end_date: contract?.end_date ?? '',
    cancellation_period_days: contract?.cancellation_period_days ?? 30,
    auto_renew: contract?.auto_renew ?? true,
    amount: contract?.amount ?? 0,
    currency: contract?.currency ?? 'EUR',
    payment_interval: contract?.payment_interval ?? 'monthly',
    licenses_purchased: contract?.licenses_purchased ?? null,
    licenses_used: contract?.licenses_used ?? null,
    customer_number: contract?.customer_number ?? '',
    notes: contract?.notes ?? '',
  });

  function updateField(field: string, value: unknown) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Manager editing existing contract → show security confirmation first
    if (isManager && contract && !showSecurityConfirm) {
      setShowSecurityConfirm(true);
      return;
    }

    setLoading(true);
    setError('');
    setShowSecurityConfirm(false);

    const supabase = createClient();

    const payload = {
      organization_id: organizationId,
      created_by: userId,
      name: form.name,
      provider: form.provider,
      description: form.description || null,
      category_id: form.category_id || null,
      start_date: form.start_date,
      end_date: form.end_date || null,
      cancellation_period_days: form.cancellation_period_days,
      auto_renew: form.auto_renew,
      amount: Number(form.amount),
      currency: form.currency,
      payment_interval: form.payment_interval as Contract['payment_interval'],
      licenses_purchased: form.licenses_purchased ? Number(form.licenses_purchased) : null,
      licenses_used: form.licenses_used ? Number(form.licenses_used) : null,
      customer_number: form.customer_number || null,
      notes: form.notes || null,
    };

    if (contract) {
      const { error: updateError } = await supabase
        .from('contracts')
        .update(payload)
        .eq('id', contract.id);
      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }
      // Log the edit (triggers admin notification if manager)
      await supabase.from('contract_edit_log').insert({
        contract_id: contract.id,
        organization_id: organizationId,
        user_id: userId,
        changes: { updated_fields: Object.keys(payload) },
        security_confirmed: true,
      });
    } else {
      const { error: insertError } = await supabase
        .from('contracts')
        .insert(payload);
      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return;
      }
    }

    router.push('/contracts');
    router.refresh();
  }

  const isEdit = !!contract;

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: t('title'), href: '/contracts' },
        { label: isEdit ? t('editContract') : t('addContract') },
      ]} />

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
        {isEdit ? t('editContract') : t('addContract')}
      </h1>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {showSecurityConfirm && (
          <div className="mb-4 rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-900/20">
            <p className="mb-2 font-medium text-amber-800 dark:text-amber-300">Sicherheitshinweis</p>
            <p className="mb-3 text-sm text-amber-700 dark:text-amber-400">
              Änderungen an Vertragsdaten werden protokolliert und der Unternehmensadmin wird benachrichtigt.
              Bitte bestätigen Sie, dass die Änderungen korrekt sind.
            </p>
            <div className="flex gap-2">
              <Button type="submit" size="sm">Änderungen bestätigen</Button>
              <Button type="button" variant="secondary" size="sm" onClick={() => setShowSecurityConfirm(false)}>Abbrechen</Button>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Basic Info */}
          <Card>
            <CardHeader><CardTitle>Vertragsdetails</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input id="name" label={t('name')} value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
              <Input id="provider" label={t('provider')} value={form.provider} onChange={(e) => updateField('provider', e.target.value)} required />
              <div className="space-y-1">
                <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('description')}</label>
                <textarea
                  id="description"
                  rows={3}
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="category" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('category')}</label>
                <select
                  id="category"
                  value={form.category_id}
                  onChange={(e) => updateField('category_id', e.target.value)}
                  className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                >
                  <option value="">-- Auswählen --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <Input id="customer_number" label={t('customerNumber')} value={form.customer_number} onChange={(e) => updateField('customer_number', e.target.value)} />
            </CardContent>
          </Card>

          {/* Dates & Financial */}
          <Card>
            <CardHeader><CardTitle>Laufzeit & Kosten</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input id="start_date" label={t('startDate')} type="date" value={form.start_date} onChange={(e) => updateField('start_date', e.target.value)} required />
              <Input id="end_date" label={t('endDate')} type="date" value={form.end_date} onChange={(e) => updateField('end_date', e.target.value)} />
              <Input id="cancellation_period" label={t('cancellationPeriod')} type="number" value={form.cancellation_period_days} onChange={(e) => updateField('cancellation_period_days', parseInt(e.target.value) || 0)} />
              <div className="flex items-center gap-2">
                <input
                  id="auto_renew"
                  type="checkbox"
                  checked={form.auto_renew}
                  onChange={(e) => updateField('auto_renew', e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="auto_renew" className="text-sm text-zinc-700 dark:text-zinc-300">{t('autoRenew')}</label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input id="amount" label={t('amount')} type="number" step="0.01" value={form.amount} onChange={(e) => updateField('amount', e.target.value)} required />
                <div className="space-y-1">
                  <label htmlFor="interval" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{t('paymentInterval')}</label>
                  <select
                    id="interval"
                    value={form.payment_interval}
                    onChange={(e) => updateField('payment_interval', e.target.value)}
                    className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  >
                    <option value="monthly">{t('monthly')}</option>
                    <option value="quarterly">{t('quarterly')}</option>
                    <option value="yearly">{t('yearly')}</option>
                    <option value="one_time">{t('oneTime')}</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input id="licenses_purchased" label={t('licensesPurchased')} type="number" value={form.licenses_purchased ?? ''} onChange={(e) => updateField('licenses_purchased', e.target.value || null)} />
                <Input id="licenses_used" label={t('licensesUsed')} type="number" value={form.licenses_used ?? ''} onChange={(e) => updateField('licenses_used', e.target.value || null)} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <Card className="mt-6">
          <CardHeader><CardTitle>{t('notes')}</CardTitle></CardHeader>
          <CardContent>
            <textarea
              rows={4}
              value={form.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              placeholder="Interne Notizen zum Vertrag..."
            />
          </CardContent>
        </Card>

        <div className="mt-6 flex gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? '...' : isEdit ? t('editContract') : t('addContract')}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Abbrechen
          </Button>
        </div>
      </form>
    </div>
  );
}
