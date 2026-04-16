'use client';

import { useState, useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface FileUploadProps {
  bucket: 'avatars' | 'logos' | 'contracts';
  folder: string;
  currentUrl?: string | null;
  accept?: string;
  maxSizeMB?: number;
  onUpload: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  variant?: 'avatar' | 'logo' | 'document';
}

export function FileUpload({
  bucket,
  folder,
  currentUrl,
  accept = 'image/*',
  maxSizeMB = 2,
  onUpload,
  onRemove,
  label = 'Datei hochladen',
  variant = 'document',
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');

    // Size check
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Datei zu groß (max. ${maxSizeMB} MB)`);
      return;
    }

    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    onUpload(data.publicUrl);
    setUploading(false);

    // Reset input
    if (fileRef.current) fileRef.current.value = '';
  }

  if (variant === 'avatar' || variant === 'logo') {
    const size = variant === 'avatar' ? 'h-20 w-20' : 'h-16 w-16';
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
        <div className="flex items-center gap-4">
          {currentUrl ? (
            <div className="relative">
              <Image
                src={currentUrl}
                alt={label}
                width={variant === 'avatar' ? 80 : 64}
                height={variant === 'avatar' ? 80 : 64}
                className={cn(size, 'rounded-lg object-cover border border-zinc-200 dark:border-zinc-700')}
                unoptimized
              />
              {onRemove && (
                <button
                  onClick={onRemove}
                  type="button"
                  className="absolute -right-1 -top-1 rounded-full bg-red-500 p-0.5 text-white hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          ) : (
            <div className={cn(size, 'flex items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700')}>
              {variant === 'avatar' ? (
                <ImageIcon className="h-6 w-6 text-zinc-400" />
              ) : (
                <ImageIcon className="h-5 w-5 text-zinc-400" />
              )}
            </div>
          )}
          <div>
            <input
              ref={fileRef}
              type="file"
              accept={accept}
              onChange={handleFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {uploading ? 'Hochladen...' : 'Ändern'}
            </button>
          </div>
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  // Document variant
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      {currentUrl ? (
        <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
          <FileText className="h-5 w-5 text-zinc-400" />
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 truncate text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Dokument anzeigen
          </a>
          {onRemove && (
            <button onClick={onRemove} type="button" className="text-red-500 hover:text-red-600">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-zinc-300 p-6 transition-colors hover:border-indigo-400 hover:bg-indigo-50/50 dark:border-zinc-700 dark:hover:border-indigo-600 dark:hover:bg-indigo-900/10"
        >
          <Upload className="h-6 w-6 text-zinc-400" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {uploading ? 'Hochladen...' : label}
          </p>
          <p className="text-xs text-zinc-400">Max. {maxSizeMB} MB</p>
        </div>
      )}
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        onChange={handleFile}
        className="hidden"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
