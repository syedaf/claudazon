'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AccountNavLinkProps {
  href: string;
  children: React.ReactNode;
}

export function AccountNavLink({ href, children }: AccountNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
        isActive
          ? 'bg-amazon-blue text-white'
          : 'text-slate-600 hover:bg-slate-100'
      )}
    >
      {children}
    </Link>
  );
}
