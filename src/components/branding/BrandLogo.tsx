import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  size?: number;
  name?: 'short' | 'long';
  showName?: boolean;
  className?: string;
  textClassName?: string;
}

export function BrandLogo({
  size = 32,
  name = 'short',
  showName = true,
  className,
  textClassName,
}: BrandLogoProps) {
  const label = name === 'long' ? 'Vertragswächter' : 'VerWa';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Image
        src="/brand/verwa-logo-l2.svg"
        alt="VerWa Logo"
        width={size}
        height={size}
        className="rounded-lg"
        priority
      />
      {showName ? (
        <span className={cn('text-base font-bold text-zinc-900 dark:text-zinc-100', textClassName)}>
          {label}
        </span>
      ) : null}
    </div>
  );
}
