;
// app/products/page.tsx - Updated with category navigation
import { CategoryCard } from '@/components/category/category-card';
import { ProductCard } from '@/components/product/product-card';
import { categories } from '@/lib/data/categories';
import { products } from '@/lib/data/products';
import { Product } from '@/lib/types';


export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Claudazon</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Products</h2>
          <p className="text-gray-600">
            Discover our collection of amazing products
          </p>
        </div>

        {/* Categories Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Shop by Category
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">
            Featured Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            © 2025 Claudazon. Built with Next.js App Router - Patterns #1 & #2
          </p>
        </div>
      </footer>
    </div>
  );
}
