;
// app/(shop)/products/[id]/page.tsx (updated to use real components)
import { ProductGallery, ProductReviews, ProductSpecs } from '@/(shop)/products/_components/detail';


export default function ProductDetail({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Product Gallery */}
        <ProductGallery productId={params.id} />

        {/* Right: Product Info */}
        <div className="space-y-6">
          <ProductSpecs productId={params.id} />
        </div>
      </div>

      {/* Full width: Reviews */}
      <div className="mt-12">
        <ProductReviews productId={params.id} />
      </div>
    </div>
  );
}
