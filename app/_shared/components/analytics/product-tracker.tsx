/* components/analytics/product-tracker.tsx */
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Analytics } from '@/_shared/lib/analytics';

export function ProductTracker() {
  const pathname = usePathname();

  useEffect(() => {
    /* Track product-specific metrics */
    Analytics.track('product_context_loaded', {
      pathname,
      timestamp: Date.now(),
      context: 'product_browsing',
    });
  }, [pathname]);

  return null; /* No UI, just tracking */
}
