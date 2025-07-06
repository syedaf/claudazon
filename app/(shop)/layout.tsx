import { Metadata } from 'next';
import ShopFooter from '@components/layout/shop-footer';
import ShopHeader from '@components/layout/shop-header';
import ShopSidebar from '@components/layout/shop-sidebar';

export const metadata: Metadata = {
  title: {
    template: '%s | Shop - Claudazon',
    default: 'Shop - Claudazon',
  },
  description:
    'Shop millions of products on Claudazon with fast, free delivery',
};

interface ShopLayoutProps {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ShopHeader />
      <div className="flex flex-1">
        <ShopSidebar />
        <main className="flex-1 p-4">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
      <ShopFooter />
    </div>
  );
}
