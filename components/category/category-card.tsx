;
// components/category/category-card.tsx - Improved with route management
import Link from 'next/link';
import { ROUTES } from '@lib/routes';
import { Category } from '@lib/types';
import { ArrowRight } from 'lucide-react';


interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
      <p className="text-gray-600 mb-4">{category.description}</p>

      {/* Subcategories List */}
      <div className="space-y-2 mb-4">
        {category.subcategories.map(subcategory => (
          <div
            key={subcategory.id}
            className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
          >
            <div>
              <span className="font-medium text-gray-900">
                {subcategory.name}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                ({subcategory.productCount})
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </div>
        ))}
      </div>

      {/* View All Link - Using centralized route management */}
      <Link
        href={ROUTES.PRODUCT_CATEGORY(category.slug)}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
      >
        View All {category.name}
        <ArrowRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
}
