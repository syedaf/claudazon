/* app/(shop)/products/template.tsx */
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ProductTracker } from '@components/analytics/product-tracker';
import { analytics } from '@lib/analytics';

export default function ProductTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    /* Track product section visits */
    analytics.track('product_section_view', {
      pathname,
      timestamp: Date.now(),
    });

    /* Extract product ID if on product detail page */
    const productId = extractProductId(pathname);
    if (productId) {
      analytics.track('product_impression', {
        productId,
        pathname,
        timestamp: Date.now(),
      });
    }
  }, [pathname]);

  return (
    <>
      <ProductTracker />
      {children}
    </>
  );
}

function extractProductId(pathname: string): string | null {
  const match = pathname.match(/\/products\/([^\/]+)$/);
  return match ? match[1] : null;
}
