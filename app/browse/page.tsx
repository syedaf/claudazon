;
// app/browse/page.tsx - Browse Landing Page
import Link from 'next/link';
import { ArrowRight, Grid, Search, TrendingUp } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { categories } from '@/lib/data/categories';
import { products } from '@/lib/data/products';


export default function BrowsePage() {
  // Get featured products (first 4)
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-900">Claudazon</h1>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-900"
              >
                Products
              </Link>
              <Link href="/browse" className="text-blue-600 font-medium">
                Browse
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Browse Our Categories
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover amazing products organized by category. Use our flexible
            navigation to explore everything from electronics to home
            essentials.
          </p>

          {/* Demo Catch-All URLs */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              <Grid className="h-5 w-5 inline mr-2" />
              Try These Catch-All Route Examples:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <Link
                href="/browse/electronics"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                /browse/electronics
              </Link>
              <Link
                href="/browse/electronics/smartphones"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                /browse/electronics/smartphones
              </Link>
              <Link
                href="/browse/home-kitchen"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                /browse/home-kitchen
              </Link>
              <Link
                href="/browse/home-kitchen/appliances"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                /browse/home-kitchen/appliances
              </Link>
              <Link
                href="/browse/electronics/smartphones/apple"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                /browse/electronics/smartphones/apple
              </Link>
              <Link
                href="/browse/home-kitchen/cookware/professional"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                /browse/home-kitchen/cookware/professional
              </Link>
            </div>
            <p className="text-blue-700 text-xs mt-4">
              ✨ Each URL demonstrates catch-all routing with different path
              depths
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">
              Shop by Category
            </h3>
            <Button variant="outline">
              <Grid className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map(category => (
              <div
                key={category.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h4>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-green-500 flex-shrink-0" />
                </div>

                {/* Subcategories */}
                <div className="space-y-2 mb-6">
                  {category.subcategories.slice(0, 3).map(subcategory => (
                    <Link
                      key={subcategory.id}
                      href={`/browse/${category.slug}/${subcategory.slug}`}
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
                    </Link>
                  ))}
                </div>

                {/* Browse Category Button */}
                <Link href={`/browse/${category.slug}`}>
                  <Button className="w-full">
                    Browse {category.name}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h3>
            <Link href="/products">
              <Button variant="outline">
                View All Products
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Browse Features */}
        <section className="bg-white rounded-lg border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Flexible Navigation with Catch-All Routes
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Deep Navigation
              </h4>
              <p className="text-gray-600 text-sm">
                Browse through multiple category levels with seamless URL
                handling
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Grid className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Flexible Paths
              </h4>
              <p className="text-gray-600 text-sm">
                Handle any path depth automatically with catch-all routing
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Smart Breadcrumbs
              </h4>
              <p className="text-gray-600 text-sm">
                Automatically generated navigation breadcrumbs for any path
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            © 2025 Claudazon. Built with Next.js App Router - Pattern #4:
            Catch-All Routes
          </p>
        </div>
      </footer>
    </div>
  );
}
