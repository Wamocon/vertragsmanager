'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/layout/Sidebar';
import type { Contract, Profile } from '@/types/database';
import { FileSignature, AlertTriangle, Download } from 'lucide-react';

interface TemplatesContentProps {
  contracts: Contract[];
  orgName: string;
  profile: Profile | null;
}

const TEMPLATE_TYPES = [
  { id: 'ordinary', labelDe: 'Ordentliche Kündigung', labelEn: 'Ordinary Cancellation', isSpecial: false },
  { id: 'notice', labelDe: 'Kündigung unter Berufung auf Kündigungsfrist', labelEn: 'Cancellation with Notice', isSpecial: false },
  { id: 'non_renewal', labelDe: 'Nichtverlängerungs-Bestätigung', labelEn: 'Non-Renewal Confirmation', isSpecial: false },
  { id: 'extraordinary', labelDe: 'Außerordentliche Kündigung', labelEn: 'Extraordinary Cancellation', isSpecial: true },
];

function generateLetter(contract: Contract, templateType: string, orgName: string, senderName: string): string {
  const today = new Date().toLocaleDateString('de-DE');
  const endDate = contract.end_date ? new Date(contract.end_date).toLocaleDateString('de-DE') : 'nächstmöglicher Termin';

  const header = `${orgName}\n${senderName}\n\nDatum: ${today}\n\nAn:\n${contract.provider}\n\n`;
  const customerRef = contract.customer_number ? `Kundennummer: ${contract.customer_number}\n` : '';
  const contractRef = `Vertrag: ${contract.name}\nVertragsbeginn: ${new Date(contract.start_date).toLocaleDateString('de-DE')}\n${customerRef}\n`;

  switch (templateType) {
    case 'ordinary':
      return `${header}Betreff: Ordentliche Kündigung\n\n${contractRef}Sehr geehrte Damen und Herren,\n\nhiermit kündige ich den oben genannten Vertrag ordentlich und fristgerecht zum ${endDate}.\n\nBitte bestätigen Sie mir den Eingang dieser Kündigung sowie den Beendigungszeitpunkt schriftlich.\n\nMit freundlichen Grüßen\n${senderName}\n${orgName}`;

    case 'notice':
      return `${header}Betreff: Kündigung unter Berufung auf Kündigungsfrist\n\n${contractRef}Sehr geehrte Damen und Herren,\n\nhiermit kündige ich den oben genannten Vertrag unter Einhaltung der vertraglich vereinbarten Kündigungsfrist von ${contract.cancellation_period_days} Tagen zum ${endDate}.\n\nIch bitte um schriftliche Bestätigung der Kündigung und des Beendigungszeitpunkts.\n\nMit freundlichen Grüßen\n${senderName}\n${orgName}`;

    case 'non_renewal':
      return `${header}Betreff: Nichtverlängerung des Vertrags\n\n${contractRef}Sehr geehrte Damen und Herren,\n\nhiermit teile ich Ihnen mit, dass ich den oben genannten Vertrag zum Ablauf der aktuellen Vertragslaufzeit am ${endDate} nicht verlängern werde.\n\nBitte bestätigen Sie mir, dass der Vertrag zum genannten Datum endet und keine automatische Verlängerung erfolgt.\n\nMit freundlichen Grüßen\n${senderName}\n${orgName}`;

    case 'extraordinary':
      return `${header}Betreff: Außerordentliche Kündigung\n\n${contractRef}Sehr geehrte Damen und Herren,\n\nhiermit kündige ich den oben genannten Vertrag aus wichtigem Grund außerordentlich und fristlos.\n\nDer wichtige Grund besteht in: [BITTE BEGRÜNDUNG EINFÜGEN]\n\nBitte bestätigen Sie mir den Eingang dieser Kündigung unverzüglich schriftlich.\n\nMit freundlichen Grüßen\n${senderName}\n${orgName}\n\n⚠️ HINWEIS: Bei einer außerordentlichen Kündigung empfehlen wir dringend die vorherige Prüfung durch einen Rechtsanwalt.`;

    default:
      return '';
  }
}

export function TemplatesContent({ contracts, orgName, profile }: TemplatesContentProps) {
  const t = useTranslations('templates');
  const [selectedContract, setSelectedContract] = useState<string>('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('ordinary');
  const senderName = profile?.full_name ?? '';

  const contract = contracts.find((c) => c.id === selectedContract);
  const letter = contract ? generateLetter(contract, selectedTemplate, orgName, senderName) : '';

  function handleDownload() {
    if (!letter) return;
    const blob = new Blob([letter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kuendigung_${contract?.provider?.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: t('title') }]} />
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{t('title')}</h1>

      {/* Legal Disclaimer */}
      <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20">
        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-300">{t('legalNote')}</p>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">{t('legalDisclaimer')}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Selection */}
        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>{t('selectContract')}</CardTitle></CardHeader>
            <CardContent>
              <select
                value={selectedContract}
                onChange={(e) => setSelectedContract(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              >
                <option value="">-- Vertrag auswählen --</option>
                {contracts.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} ({c.provider})</option>
                ))}
              </select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>{t('selectTemplate')}</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {TEMPLATE_TYPES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedTemplate(tmpl.id)}
                    className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors ${
                      selectedTemplate === tmpl.id
                        ? 'border-indigo-600 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-900/20'
                        : 'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <FileSignature className="h-4 w-4 flex-shrink-0" />
                    <span>{tmpl.labelDe}</span>
                    {tmpl.isSpecial && <AlertTriangle className="ml-auto h-4 w-4 text-amber-500" />}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('preview')}</CardTitle>
              {letter && (
                <Button size="sm" variant="secondary" onClick={handleDownload}>
                  <Download className="mr-1.5 h-4 w-4" /> Download
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {!selectedContract ? (
                <div className="flex h-64 items-center justify-center text-zinc-400">
                  <p>{t('autoFill')}</p>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap rounded-lg border border-zinc-200 bg-zinc-50 p-6 font-mono text-sm leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                  {letter}
                </pre>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
