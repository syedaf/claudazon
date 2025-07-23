import { Suspense } from 'react';
import ProductListServer from '@/components/server-components/product-list-server';

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      {/* ✅ Server Component with Suspense for loading */}
      <Suspense fallback={<ProductsLoading />}>
        <ProductListServer />
      </Suspense>
    </div>
  );
}

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 animate-pulse">
          <div className="w-full h-48 bg-gray-200 mb-2"></div>
          <div className="h-4 bg-gray-200 mb-2"></div>
          <div className="h-4 bg-gray-200 w-1/2"></div>
        </div>
      ))}
    </div>
  );
}
