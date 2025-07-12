import { TabNavigation } from '@/(shop)/products/_components/tabs';

interface ProductLayoutProps {
  children: React.ReactNode;
  reviews: React.ReactNode;
  specs: React.ReactNode;
  qa: React.ReactNode;
  params: Promise<{ id: string }>; // ✅ Updated to Promise
}

export default async function ProductLayout({
  children,
  reviews,
  specs,
  qa,
  params,
}: ProductLayoutProps) {
  const { id } = await params; // ✅ Added await

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Product Content */}
      <div className="mb-8">{children}</div>

      {/* Tab Navigation and Parallel Slots */}
      <div className="border-t border-gray-200 pt-8">
        <TabNavigation productId={id} slots={{ reviews, specs, qa }} />
      </div>
    </div>
  );
}
