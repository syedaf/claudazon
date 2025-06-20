;
// components/product/product-card.tsx
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';


interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="aspect-square mb-3 overflow-hidden rounded-md bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-medium text-sm line-clamp-2 text-gray-900">
          {product.title}
        </h3>

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
      </div>
    </div>
  );
}
