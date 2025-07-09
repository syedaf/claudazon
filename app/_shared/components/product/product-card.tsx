;
// components/product/product-card.tsx - Improved with route management
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Button } from '@/_shared/components/ui/button';
import { ROUTES } from '@/_shared/lib/routes';
import { Product } from '@/_shared/types/types';


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const productUrl = ROUTES.PRODUCT_DETAIL(product.id);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
      {/* Product Image - Clickable */}
      <Link href={productUrl}>
        <div className="aspect-square mb-3 overflow-hidden rounded-md bg-gray-100 cursor-pointer">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover hover:scale-105 transition-transform duration-200"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Product Title - Clickable */}
        <Link href={productUrl}>
          <h3 className="font-medium text-sm line-clamp-2 text-gray-900 hover:text-blue-600 cursor-pointer">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[0, 1, 2, 3, 4].map(i => {
              const isFilled = i < Math.floor(product.rating);
              return (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    isFilled
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              );
            })}
          </div>
          <span className="text-xs text-gray-600">({product.reviewCount})</span>
        </div>

        {/* Price & Prime */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          {product.isPrime && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              Prime
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button className="w-full" size="sm">
          Add to Cart
        </Button>

        {/* View Details Link */}
        <Link href={productUrl}>
          <Button variant="outline" className="w-full" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
