'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }
    if (password.length < 6) {
      setError(t('weakPassword'));
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
          company_name: companyName,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Check if user already exists (no identities returned)
    if (data.user && data.user.identities?.length === 0) {
      setError('Diese E-Mail-Adresse ist bereits registriert.');
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-xl font-bold text-white">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('registerTitle')}</h1>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-900/20">
            <p className="text-sm text-emerald-700 dark:text-emerald-400">
              Bestätigungsmail wurde gesendet! Bitte prüfen Sie Ihr Postfach
              (oder <a href="http://127.0.0.1:54354" target="_blank" rel="noopener noreferrer" className="font-medium underline">Inbucket</a> in der lokalen Entwicklung).
            </p>
          </div>
          <p className="text-sm text-zinc-500">
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              {t('loginButton')}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white">
            VM
          </div>
          <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">{t('registerTitle')}</h1>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <Input id="fullName" label={t('fullName')} value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <Input id="companyName" label={t('companyName')} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          <Input id="email" label={t('email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          <Input id="password" label={t('password')} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" />
          <Input id="confirmPassword" label={t('confirmPassword')} type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete="new-password" />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '...' : t('registerButton')}
          </Button>
        </form>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          {t('hasAccount')}{' '}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            {t('loginButton')}
          </Link>
        </p>
      </div>
    </div>
  );
}
