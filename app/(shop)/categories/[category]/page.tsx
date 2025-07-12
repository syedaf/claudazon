import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/_shared/components/product/product-card';
import { categories } from '@/_shared/lib/data/categories';
import { products } from '@/_shared/lib/data/products';

interface CategoryPageProps {
  params: Promise<{
    // ✅ Updated to Promise
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params; // ✅ Added await

  // Find category by slug
  const category = categories.find(c => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  // Filter products by categoryId
  const categoryProducts = products.filter(
    product => product.categoryId === category.id
  );

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/products" className="hover:text-blue-600">
          Products
        </Link>
        <ArrowRight className="h-4 w-4" />
        <span className="font-medium text-gray-900">{category.name}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/products"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to All Products
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {category.name}
        </h2>
        <p className="text-gray-600 mb-6">{category.description}</p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categoryProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
