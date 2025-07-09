;
// components/error/suggested-products.tsx
import Link from 'next/link';
import { Product } from 'app/_shared/types/types';
import { ProductCard } from '@components/product/product-card';


interface SuggestedProductsProps {
  products: Product[];
  title?: string;
}

export function SuggestedProducts({
  products,
  title = 'You might like these products',
}: SuggestedProductsProps) {
  if (!products.length) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="text-center">
        <Link
          href="/products"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          View all products →
        </Link>
      </div>
    </div>
  );
}

// Also export as default for flexibility
export default SuggestedProducts;
