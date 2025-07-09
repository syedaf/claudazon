/* app/template.tsx */
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LoadingManager } from '@/_shared/lib/loading-utils';
import { analytics } from '@/lib/analytics';

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    /* Track every page navigation */
    analytics.track('page_navigation', {
      pathname,
      timestamp: Date.now(),
      referrer: document.referrer,
    });
  }, [pathname]);

  // Hook for loading analytics (enterprise-ready)
  LoadingManager.trackLoadingEnd(pathname, Date.now());

  return <div className="min-h-screen fade-in">{children}</div>;
}
