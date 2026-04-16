'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Breadcrumb } from '@/components/layout/Sidebar';
import { useOrgDisplayName } from '@/lib/OrgContext';
import type { Profile } from '@/types/database';

interface ProfileContentProps {
  profile: Profile | null;
  email: string;
}

export function ProfileContent({ profile, email }: ProfileContentProps) {
  const t = useTranslations('profile');
  const router = useRouter();
  const orgDisplayName = useOrgDisplayName();
  const [fullName, setFullName] = useState(profile?.full_name ?? '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName })
      .eq('id', profile?.id ?? '');

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Gespeichert');
    }
    setSaving(false);
    router.refresh();
  }

  async function handleExportData() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: membership } = await supabase
      .from('organization_members')
      .select('organization_id')
      .eq('user_id', user.id)
      .limit(1)
      .single();

    const exports: Record<string, unknown> = { profile };

    if (membership) {
      const { data: contracts } = await supabase
        .from('contracts')
        .select('*')
        .eq('organization_id', membership.organization_id);
      exports.contracts = contracts;
    }

    const blob = new Blob([JSON.stringify(exports, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `datenexport_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: orgDisplayName, href: '/dashboard' }, { label: t('title') }]} />
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>

      <Card>
        <CardHeader><CardTitle>{t('personalInfo')}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <Input id="email" label="E-Mail" value={email} disabled />
            <Input id="fullName" label="Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <Input id="companyName" label={t('company')} value={orgDisplayName} disabled />
            {message && <p className="text-sm text-emerald-600">{message}</p>}
            <Button type="submit" disabled={saving}>{saving ? '...' : 'Speichern'}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>DSGVO-Rechte</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <Button variant="secondary" onClick={handleExportData}>{t('exportData')}</Button>
          <p className="text-xs text-zinc-500">{t('deleteWarning')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
