import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Crown, Grid, List, Search, Star } from 'lucide-react';
import { FilterChips } from '@/_shared/components/search/filter-chips';
import { FilterSidebar } from '@/_shared/components/search/filter-sidebar';
import { SearchBar } from '@/_shared/components/search/search-bar';
import { Button } from '@/_shared/components/ui/button';
import { products } from '@/_shared/lib/data/products';

interface SearchPageProps {
  params: Promise<{
    filters?: string[];
  }>;
  searchParams: Promise<{
    q?: string;
    view?: 'grid' | 'list';
    sort?: 'relevance' | 'price-low' | 'price-high' | 'rating';
  }>;
}

// Generate metadata based on filters
export async function generateMetadata({
  params,
  searchParams,
}: SearchPageProps): Promise<Metadata> {
  const { filters } = await params;
  const { q } = await searchParams;

  if (!filters?.length && !q) {
    return {
      title: 'Search Products - Claudazon',
      description:
        'Find exactly what you need from millions of products on Claudazon.',
    };
  }

  const filterText = filters?.join(' ') || '';
  const searchText = q || '';
  const title = `${searchText} ${filterText}`.trim() || 'Search Results';

  return {
    title: `${title} - Claudazon`,
    description: `Search results for ${title}. Find the best deals and products on Claudazon.`,
  };
}

// Parse filter segments into structured data
function parseFilters(filters?: string[]) {
  if (!filters?.length) return {};

  const parsed: Record<string, string> = {};

  filters.forEach(filter => {
    // Parse different filter types
    if (filter.startsWith('under-') || filter.startsWith('over-')) {
      parsed.price = filter;
    } else if (
      ['electronics', 'home-kitchen', 'clothing', 'books'].includes(filter)
    ) {
      parsed.category = filter;
    } else if (
      [
        'apple',
        'samsung',
        'dell',
        'hp',
        'sony',
        'lg',
        'nike',
        'adidas',
      ].includes(filter)
    ) {
      parsed.brand = filter;
    } else if (
      [
        'gaming',
        'professional',
        'budget',
        'premium',
        'wireless',
        'portable',
      ].includes(filter)
    ) {
      parsed.type = filter;
    } else {
      parsed.general = filter;
    }
  });

  return parsed;
}

// Filter products based on active filters
function filterProducts(
  allProducts: typeof products,
  filters: Record<string, string>,
  searchQuery?: string
) {
  let filtered = [...allProducts];

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      product =>
        product.title.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(
      product => product.categoryId === filters.category
    );
  }

  // Filter by price
  if (filters.price) {
    if (filters.price.startsWith('under-')) {
      const maxPrice = parseInt(filters.price.replace('under-', ''));
      filtered = filtered.filter(product => product.price <= maxPrice);
    } else if (filters.price.startsWith('over-')) {
      const minPrice = parseInt(filters.price.replace('over-', ''));
      filtered = filtered.filter(product => product.price >= minPrice);
    }
  }

  // Filter by brand (simplified - matches product title)
  if (filters.brand) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(filters.brand.toLowerCase())
    );
  }

  // Filter by type
  if (filters.type) {
    filtered = filtered.filter(
      product =>
        product.title.toLowerCase().includes(filters.type.toLowerCase()) ||
        product.description?.toLowerCase().includes(filters.type.toLowerCase())
    );
  }

  return filtered;
}

// Generate breadcrumb navigation
function generateBreadcrumbs(filters?: string[], searchQuery?: string) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Search', href: '/search' },
  ];

  if (searchQuery) {
    breadcrumbs.push({
      name: `"${searchQuery}"`,
      href: `/search?q=${searchQuery}`,
    });
  }

  if (filters?.length) {
    filters.forEach((filter, index) => {
      const href = `/search/${filters.slice(0, index + 1).join('/')}${searchQuery ? `?q=${searchQuery}` : ''}`;
      breadcrumbs.push({
        name:
          filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' '),
        href,
      });
    });
  }

  return breadcrumbs;
}

export default async function SearchPage({
  params,
  searchParams,
}: SearchPageProps) {
  const { filters } = await params;
  const {
    q: searchQuery,
    view = 'grid',
    sort = 'relevance',
  } = await searchParams;

  const parsedFilters = parseFilters(filters);
  const filteredProducts = filterProducts(products, parsedFilters, searchQuery);
  const breadcrumbs = generateBreadcrumbs(filters, searchQuery);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0; // relevance (keep original order)
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/public">
              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Search Products
            </h1>
          </div>

          <SearchBar initialQuery={searchQuery} currentFilters={filters} />

          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mt-4">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.href} className="flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                <Link
                  href={crumb.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {crumb.name}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Active Filters */}
      {(filters?.length || searchQuery) && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <FilterChips
              filters={filters}
              searchQuery={searchQuery}
              parsedFilters={parsedFilters}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <FilterSidebar
              currentFilters={parsedFilters}
              basePath={`/search${filters?.length ? `/${filters.join('/')}` : ''}`}
              searchQuery={searchQuery}
            />
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {sortedProducts.length === 0
                    ? 'No results found'
                    : `${sortedProducts.length} result${sortedProducts.length !== 1 ? 's' : ''}`}
                </h2>
                {(searchQuery || filters?.length) && (
                  <p className="text-sm text-gray-600 mt-1">
                    {searchQuery && `for "${searchQuery}"`}
                    {searchQuery && filters?.length && ' '}
                    {filters?.length && `in ${filters.join(' → ')}`}
                  </p>
                )}
              </div>

              {/* View & Sort Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort:</span>
                  <select
                    defaultValue={sort}
                    className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <Link
                    href={{
                      pathname:
                        '/search' +
                        (filters?.length ? `/${filters.join('/')}` : ''),
                      query: {
                        ...(searchQuery && { q: searchQuery }),
                        view: 'grid',
                      },
                    }}
                  >
                    <Button
                      variant={view === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link
                    href={{
                      pathname:
                        '/search' +
                        (filters?.length ? `/${filters.join('/')}` : ''),
                      query: {
                        ...(searchQuery && { q: searchQuery }),
                        view: 'list',
                      },
                    }}
                  >
                    <Button
                      variant={view === 'list' ? 'default' : 'ghost'}
                      size="sm"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Results Display */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-6">
                  {` Try adjusting your search terms or filters to find what
                  you're looking for.`}
                </p>
                <Link href="/search">
                  <Button>Start new search</Button>
                </Link>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 group"
                  >
                    <Link href={`/products/${product.id}`}>
                      <div className="aspect-square relative overflow-hidden">
                        <Image
                          src={product.imageUrl}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">
                          ({product.reviewCount})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        {product.isPrime && (
                          <div className="flex items-center text-blue-600">
                            <Crown className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <Link href={`/products/${product.id}`}>
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            width={120}
                            height={120}
                            className="rounded-lg object-cover hover:opacity-90 transition-opacity"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <Link href={`/products/${product.id}`}>
                          <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors mb-2">
                            {product.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            ({product.reviewCount})
                          </span>
                          {product.isPrime && (
                            <div className="flex items-center text-blue-600">
                              <Crown className="h-4 w-4 mr-1" />
                              <span className="text-sm font-semibold">
                                Prime
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-gray-900">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Educational Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-2">
            Optional Catch-All Routes Demo
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Pattern: [[...filters]] - Single route handles all search scenarios
          </p>
          <div className="text-xs text-gray-400">
            <p>
              Built with Next.js App Router - Pattern #5: Optional Catch-All
              Routes
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
