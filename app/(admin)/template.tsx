/* app/(admin)/template.tsx */
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AdminMonitor } from '@components/monitoring/admin-monitor';
import { analytics } from '@lib/analytics';
import { sessionManager } from '@lib/session';

export default function AdminTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    /* Validate admin access on every navigation */
    const hasAdminAccess = sessionManager.validateAdminAccess();

    if (!hasAdminAccess) {
      /* In real app, redirect to login */
      console.warn('🚨 Unauthorized admin access attempt');
      analytics.track('unauthorized_admin_access', {
        pathname,
        timestamp: Date.now(),
        sessionId: sessionManager.getSession().id,
      });
      return;
    }

    /* Track admin activity */
    analytics.track('admin_page_access', {
      pathname,
      timestamp: Date.now(),
      adminId: sessionManager.getSession().userId || 'demo_admin',
      sessionId: sessionManager.getSession().id,
    });

    /* Update session activity */
    sessionManager.updateActivity();
  }, [pathname]);

  return (
    <>
      <AdminMonitor />
      {children}
    </>
  );
}
