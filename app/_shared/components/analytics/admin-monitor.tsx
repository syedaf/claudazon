/* components/monitoring/admin-monitor.tsx */
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@/_shared/lib/analytics';
import { sessionManager } from '@/_shared/lib/session';

export function AdminMonitor() {
  const pathname = usePathname();

  useEffect(() => {
    /* Monitor admin activity patterns */
    const session = sessionManager.getSession();

    analytics.track('admin_activity_monitor', {
      pathname,
      sessionDuration: Date.now() - session.startTime,
      lastActivity: session.lastActivity,
      sessionId: session.id,
      timestamp: Date.now(),
    });
  }, [pathname]);

  return null; /* No UI, just monitoring */
}
