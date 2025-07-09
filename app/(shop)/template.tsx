/* app/(shop)/template.tsx */
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PageTracker } from '@/_shared/components/analytics/page-tracker';
import { analytics, Analytics } from '@/_shared/lib/analytics';

export default function ShopTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    /* E-commerce specific tracking */
    analytics.track('shop_page_view', {
      pathname,
      section: 'e-commerce',
      timestamp: Date.now(),
    });

    /* Track shopping funnel step */
    const funnelStep = getFunnelStep(pathname);
    if (funnelStep) {
      Analytics.track('funnel_step', {
        step: funnelStep,
        pathname,
      });
    }
  }, [pathname]);

  return (
    <>
      <PageTracker section="shop" />
      {children}
    </>
  );
}

function getFunnelStep(pathname: string): string | null {
  if (pathname === '/products') return 'browse';
  if (pathname.startsWith('/products/')) return 'product_view';
  if (pathname.startsWith('/search')) return 'search';
  if (pathname === '/cart') return 'cart';
  if (pathname === '/checkout') return 'checkout';
  return null;
}
