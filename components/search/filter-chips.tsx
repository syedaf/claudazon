'use client';

import Link from 'next/link';
import { X } from 'lucide-react';

interface FilterChipsProps {
  filters?: string[];
  searchQuery?: string;
  parsedFilters: Record<string, string>;
}

export function FilterChips({
  filters = [],
  searchQuery,
  parsedFilters,
}: FilterChipsProps) {
  const removeFilter = (filterToRemove: string) => {
    const newFilters = filters.filter(f => f !== filterToRemove);
    let url = '/search';
    if (newFilters.length > 0) {
      url += `/${newFilters.join('/')}`;
    }
    if (searchQuery) {
      url += `?q=${encodeURIComponent(searchQuery)}`;
    }
    return url;
  };

  const removeSearch = () => {
    let url = '/search';
    if (filters.length > 0) {
      url += `/${filters.join('/')}`;
    }
    return url;
  };

  const getFilterDisplayName = (filter: string) => {
    return filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ');
  };

  const getFilterType = (filter: string) => {
    if (filter.startsWith('under-') || filter.startsWith('over-')) {
      return 'Price';
    } else if (
      ['electronics', 'home-kitchen', 'clothing', 'books'].includes(filter)
    ) {
      return 'Category';
    } else if (
      ['apple', 'samsung', 'dell', 'hp', 'sony', 'lg'].includes(filter)
    ) {
      return 'Brand';
    } else if (
      ['gaming', 'professional', 'budget', 'premium'].includes(filter)
    ) {
      return 'Type';
    }
    return 'Filter';
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-gray-600 font-medium">Active filters:</span>

      {searchQuery && (
        <Link href={removeSearch()}>
          <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors cursor-pointer">
            <span>Search: "{searchQuery}"</span>
            <X className="h-3 w-3" />
          </div>
        </Link>
      )}

      {filters.map(filter => (
        <Link key={filter} href={removeFilter(filter)}>
          <div className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">
            <span className="text-xs text-gray-500 font-medium">
              {getFilterType(filter)}:
            </span>
            <span>{getFilterDisplayName(filter)}</span>
            <X className="h-3 w-3" />
          </div>
        </Link>
      ))}

      {(filters.length > 0 || searchQuery) && (
        <Link href="/search">
          <div className="text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer font-medium">
            Clear all
          </div>
        </Link>
      )}
    </div>
  );
}
