// Create this file: app/_shared/components/analytics/page-tracker.tsx

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Analytics } from '@/_shared/lib/analytics';

interface PageTrackerProps {
  section?: string;
}

export function PageTracker({ section = 'general' }: PageTrackerProps): null {
  const pathname = usePathname();

  useEffect(() => {
    Analytics.track('detailed_page_view', {
      pathname,
      section,
      timestamp: Date.now(),
    });
  }, [pathname, section]);

  return null; // No UI, just tracking
}
