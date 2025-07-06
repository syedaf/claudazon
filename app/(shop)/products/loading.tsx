;
// app/(shop)/products/loading.tsx
import { ProductCardSkeleton } from '@components/ui/skeleton';


export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-48"></div>
        </div>
      </div>

      {/* Product grid skeleton */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="loading-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
