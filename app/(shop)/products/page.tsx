import { Product } from 'app/_shared/types/types';
import { CategoryCard } from '@/_shared/components/category/category-card';
import { ProductCard } from '@/_shared/components/product/product-card';
import { categories } from '@/_shared/lib/data/categories';
import { products } from '@/_shared/lib/data/products';

export default function ProductsPage() {
  return (
    <div>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">
          Discover our collection of amazing products
        </p>
        <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
          <h4 className="text-sm font-semibold mb-2">Dev Error Test</h4>
        </div>
      </div>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
      {/* Featured Products Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
