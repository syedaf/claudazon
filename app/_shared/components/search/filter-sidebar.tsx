'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface FilterSidebarProps {
  currentFilters: Record<string, string>;
  basePath: string;
  searchQuery?: string;
}

export function FilterSidebar({
  currentFilters,
  basePath,
  searchQuery,
}: FilterSidebarProps) {
  const createFilterUrl = (newFilter: string) => {
    // Remove existing filter of the same type
    const currentFilterValues = Object.values(currentFilters);
    const cleanPath = basePath
      .replace(/\/search\/?/, '')
      .split('/')
      .filter(Boolean);

    // Remove conflicting filters
    const filteredPath = cleanPath.filter(segment => {
      if (newFilter.startsWith('under-') || newFilter.startsWith('over-')) {
        return !(segment.startsWith('under-') || segment.startsWith('over-'));
      }
      if (
        ['electronics', 'home-kitchen', 'clothing', 'books'].includes(newFilter)
      ) {
        return !['electronics', 'home-kitchen', 'clothing', 'books'].includes(
          segment
        );
      }
      if (
        ['apple', 'samsung', 'dell', 'hp', 'sony', 'lg'].includes(newFilter)
      ) {
        return !['apple', 'samsung', 'dell', 'hp', 'sony', 'lg'].includes(
          segment
        );
      }
      return segment !== newFilter;
    });

    const newPath = [...filteredPath, newFilter];
    let url = `/search/${newPath.join('/')}`;

    if (searchQuery) {
      url += `?q=${encodeURIComponent(searchQuery)}`;
    }

    return url;
  };

  const isFilterActive = (filter: string) => {
    return Object.values(currentFilters).includes(filter);
  };

  const filterSections = [
    {
      title: 'Categories',
      filters: [
        { value: 'electronics', label: 'Electronics' },
        { value: 'home-kitchen', label: 'Home & Kitchen' },
        { value: 'clothing', label: 'Clothing' },
        { value: 'books', label: 'Books' },
      ],
    },
    {
      title: 'Price Range',
      filters: [
        { value: 'under-50', label: 'Under $50' },
        { value: 'under-100', label: 'Under $100' },
        { value: 'under-500', label: 'Under $500' },
        { value: 'under-1000', label: 'Under $1,000' },
        { value: 'over-1000', label: 'Over $1,000' },
      ],
    },
    {
      title: 'Brands',
      filters: [
        { value: 'apple', label: 'Apple' },
        { value: 'samsung', label: 'Samsung' },
        { value: 'dell', label: 'Dell' },
        { value: 'hp', label: 'HP' },
        { value: 'sony', label: 'Sony' },
        { value: 'lg', label: 'LG' },
      ],
    },
    {
      title: 'Product Type',
      filters: [
        { value: 'gaming', label: 'Gaming' },
        { value: 'professional', label: 'Professional' },
        { value: 'budget', label: 'Budget' },
        { value: 'premium', label: 'Premium' },
        { value: 'wireless', label: 'Wireless' },
        { value: 'portable', label: 'Portable' },
      ],
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

      <div className="space-y-6">
        {filterSections.map(section => (
          <div key={section.title}>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              {section.title}
            </h4>
            <div className="space-y-2">
              {section.filters.map(filter => {
                const isActive = isFilterActive(filter.value);
                return (
                  <Link
                    key={filter.value}
                    href={createFilterUrl(filter.value)}
                    className={`flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{filter.label}</span>
                    {isActive ? (
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Demo URLs Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Demo URLs</h4>
        <div className="space-y-2 text-xs">
          <Link
            href="/search"
            className="block text-blue-600 hover:text-blue-700"
          >
            /search
          </Link>
          <Link
            href="/search/electronics"
            className="block text-blue-600 hover:text-blue-700"
          >
            /search/electronics
          </Link>
          <Link
            href="/search/electronics/under-500"
            className="block text-blue-600 hover:text-blue-700"
          >
            /search/electronics/under-500
          </Link>
          <Link
            href="/search/electronics/under-500/apple"
            className="block text-blue-600 hover:text-blue-700"
          >
            /search/electronics/under-500/apple
          </Link>
          <Link
            href="/search?q=laptop"
            className="block text-blue-600 hover:text-blue-700"
          >
            /search?q=laptop
          </Link>
        </div>
      </div>
    </div>
  );
}
