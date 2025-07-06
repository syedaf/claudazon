/* app/template.tsx */
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { analytics } from '@lib/analytics';

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

  return <div className="min-h-screen fade-in">{children}</div>;
}
