/* app/(auth)/template.tsx */
'use client';

import { analytics } from '@/shared/lib/analytics';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    /* Track authentication flow */
    analytics.track('auth_page_view', {
      pathname,
      authStep: getAuthStep(pathname),
      timestamp: Date.now(),
    });
  }, [pathname]);

  return <div className="auth-template">{children}</div>;
}

function getAuthStep(pathname: string): string {
  if (pathname.includes('/login')) return 'login';
  if (pathname.includes('/register')) return 'register';
  if (pathname.includes('/forgot-password')) return 'password_reset';
  return 'unknown';
}
