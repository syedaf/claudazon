import Link from 'next/link';
import { Product } from '@/_types/user-roles.types';

interface RecommendationsProps {
  products: Product[];
}

export function Recommendations({ products }: RecommendationsProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Recommended for You
        </h3>
      </div>

      <div className="p-6">
        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No recommendations available
          </p>
        ) : (
          <div className="space-y-4">
            {products.map(product => (
              <div
                key={product.id}
                className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{product.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600 ml-1">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    View
                  </Link>
                  <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
