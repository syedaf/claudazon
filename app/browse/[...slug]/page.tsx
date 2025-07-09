;
// app/browse/[...slug]/page.tsx - Catch-All Routes Implementation
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Grid, List, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '@/_shared/components/product/product-card';
import { Button } from '@/_shared/components/ui/button';
import { categories } from '@/_shared/lib/data/categories';
import { products } from '@/_shared/lib/data/products';


interface BrowsePageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Helper function to find category by slug
function findCategoryBySlug(slug: string) {
  return categories.find(cat => cat.slug === slug);
}

// Helper function to find subcategory
function findSubcategoryBySlug(categorySlug: string, subcategorySlug: string) {
  const category = findCategoryBySlug(categorySlug);
  return category?.subcategories.find(sub => sub.slug === subcategorySlug);
}

// Generate breadcrumbs from slug array
function generateBreadcrumbs(slug: string[]) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Browse', href: '/browse' },
  ];

  if (slug.length >= 1) {
    const category = findCategoryBySlug(slug[0]);
    if (category) {
      breadcrumbs.push({
        name: category.name,
        href: `/browse/${slug[0]}`,
      });
    }
  }

  if (slug.length >= 2) {
    const subcategory = findSubcategoryBySlug(slug[0], slug[1]);
    if (subcategory) {
      breadcrumbs.push({
        name: subcategory.name,
        href: `/browse/${slug[0]}/${slug[1]}`,
      });
    }
  }

  // Add any additional path segments
  for (let i = 2; i < slug.length; i++) {
    breadcrumbs.push({
      name: slug[i].charAt(0).toUpperCase() + slug[i].slice(1),
      href: `/browse/${slug.slice(0, i + 1).join('/')}`,
    });
  }

  return breadcrumbs;
}

export default async function BrowsePage({ params }: BrowsePageProps) {
  const { slug } = await params;

  // Handle different path depths
  if (slug.length === 0) {
    // This shouldn't happen with [...slug] but handle gracefully
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs(slug);

  // Level 1: Category browsing (/browse/electronics)
  if (slug.length === 1) {
    const category = findCategoryBySlug(slug[0]);

    if (!category) {
      notFound();
    }

    // Filter products by category
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
          {/* Breadcrumbs */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center">
                  {index > 0 && (
                    <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-900 font-medium">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Back Button */}
          <Link
            href="/browse"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to All Categories
          </Link>

          {/* Category Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {category.name}
            </h2>
            <p className="text-gray-600">{category.description}</p>
          </div>

          {/* Subcategories Grid */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Shop by Subcategory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.subcategories.map(subcategory => (
                <Link
                  key={subcategory.id}
                  href={`/browse/${category.slug}/${subcategory.slug}`}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {subcategory.name}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {subcategory.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {subcategory.productCount} products
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Featured Products in Category */}
          <section>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Featured in {category.name}
            </h3>
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryProducts.slice(0, 8).map(product => (
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

  // Level 2: Subcategory browsing (/browse/electronics/smartphones)
  if (slug.length === 2) {
    const category = findCategoryBySlug(slug[0]);
    const subcategory = findSubcategoryBySlug(slug[0], slug[1]);

    if (!category || !subcategory) {
      notFound();
    }

    // Filter products by category (since we don't have subcategory filtering yet)
    const subcategoryProducts = products.filter(
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
          {/* Breadcrumbs */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center">
                  {index > 0 && (
                    <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-900 font-medium">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Back Button */}
          <Link
            href={`/browse/${slug[0]}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to {category.name}
          </Link>

          {/* Subcategory Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {subcategory.name}
            </h2>
            <p className="text-gray-600">{subcategory.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              {subcategory.productCount} products available
            </p>
          </div>

          {/* Filter Bar */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-sm text-gray-600">
                  Showing {subcategoryProducts.length} results
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <section>
            {subcategoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {subcategoryProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  No products found in this subcategory.
                </p>
              </div>
            )}
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

  // Level 3+: Deep category browsing (/browse/electronics/smartphones/apple/iphone)
  if (slug.length >= 3) {
    // For demonstration, we'll show a "coming soon" page for deeper levels
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Claudazon</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center">
                  {index > 0 && (
                    <ArrowRight className="h-4 w-4 text-gray-400 mx-2" />
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-900 font-medium">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Deep Category Display */}
          <div className="text-center py-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Deep Category Navigation
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              You've navigated to a deep category path: <br />
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                /browse/{slug.join('/')}
              </code>
            </p>

            {/* Path Analysis */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-md mx-auto mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Path Analysis:
              </h3>
              <ul className="space-y-2 text-sm text-left">
                {slug.map((segment, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-600">Level {index + 1}:</span>
                    <span className="font-medium">{segment}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-x-4">
              <Link href="/browse">
                <Button>Browse All Categories</Button>
              </Link>
              <Link href={`/browse/${slug[0]}`}>
                <Button variant="outline">Back to {slug[0]}</Button>
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <p className="text-center text-gray-600">
              © 2025 Claudazon. Built with Next.js App Router - Pattern #4:
              Catch-All Routes (Deep Level)
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Fallback (should not reach here)
  notFound();
}
