;
// app/(shop)/search/not-found.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { NotFoundLayout } from '@components/error/not-found-layout';
import { SearchBar } from '@components/search/search-bar';
import { generateNotFoundMetadata } from '@lib/not-found-utils';
import { SuggestionEngine } from '@lib/suggestions';


export const metadata: Metadata = generateNotFoundMetadata(
  'search',
  'Search Not Found - Claudazon'
);

export default async function SearchNotFound() {
  const popularSearches = await SuggestionEngine.getSearchSuggestions();

  return (
    <NotFoundLayout
      icon={<Search className="h-12 w-12 text-gray-400" />}
      title="Search Not Found"
      description="No results found for your search."
      section="search"
      suggestions={
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Try a new search
          </h3>
          <SearchBar />

          <div>
            <h4 className="text-lg font-medium text-gray-900 mb-3">
              Popular searches
            </h4>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map(term => (
                <Link key={term} href={`/search?q=${encodeURIComponent(term)}`}>
                  <span className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 transition-colors">
                    {term}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      }
    />
  );
}
