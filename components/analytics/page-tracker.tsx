/* components/analytics/page-tracker.tsx */
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@lib/analytics';

interface PageTrackerProps {
  section?: string;
}

export function PageTracker({ section = 'general' }: PageTrackerProps) {
  const pathname = usePathname();

  useEffect(() => {
    analytics.track('detailed_page_view', {
      pathname,
      section,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  }, [pathname, section]);

  return null; /* No UI, just tracking */
}
