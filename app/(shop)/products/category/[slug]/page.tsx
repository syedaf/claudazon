;
// app/products/category/[slug]/page.tsx - Clean ID-based filtering
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProductCard } from '@/_shared/components/product/product-card';
import { categories } from '@/_shared/lib/data/categories';
import { products } from '@/_shared/lib/data/products';


interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug: categorySlug } = await params;

  // Find category by slug (URL-safe identifier)
  const category = categories.find(c => c.slug === categorySlug);

  if (!category) {
    notFound();
  }

  // Filter products by categoryId (proper relationship)
  const categoryProducts = products.filter(
    product => product.categoryId === category.id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Claudazon</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
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

          {/* Subcategories Navigation */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Browse by Category:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {category.subcategories.map(subcategory => (
                <div
                  key={subcategory.id}
                  className="flex items-center justify-between p-3 rounded hover:bg-gray-50 transition-colors border border-gray-100"
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
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            All {category.name} Products ({categoryProducts.length})
          </h3>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            © 2025 Claudazon. Built with Next.js App Router - Pattern #2:
            Nested Routes
          </p>
        </div>
      </footer>
    </div>
  );
}
