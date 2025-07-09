// app/(admin)/template.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Analytics } from '@/_shared/lib/analytics';
import { AdminActivityMonitor } from './_components/admin-monitor';

export default function AdminTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Track admin activity with enhanced context
    Analytics.track('admin_page_access', {
      pathname,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      group: 'admin',
      sessionType: 'admin_session',
    });

    // Admin-specific security logging
    console.log(`[ADMIN ACCESS] ${pathname} at ${new Date().toISOString()}`);
  }, [pathname]);

  return (
    <>
      <AdminActivityMonitor />
      <div className="admin-template-wrapper">{children}</div>
    </>
  );
}
