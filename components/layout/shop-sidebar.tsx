'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';

const categories = [
  {
    name: 'Electronics',
    href: '/categories/electronics',
    subcategories: ['Computers', 'Phones', 'Audio', 'Gaming'],
  },
  {
    name: 'Books',
    href: '/categories/books',
    subcategories: ['Fiction', 'Non-fiction', 'Textbooks', 'Children'],
  },
  {
    name: 'Home & Garden',
    href: '/categories/home',
    subcategories: ['Furniture', 'Kitchen', 'Garden', 'Tools'],
  },
  {
    name: 'Fashion',
    href: '/categories/fashion',
    subcategories: ['Men', 'Women', 'Kids', 'Shoes'],
  },
  {
    name: 'Sports',
    href: '/categories/sports',
    subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Water Sports'],
  },
];

export default function ShopSidebar() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 hidden md:block">
      <div className="p-4">
        {/* Department Navigation */}
        <div className="mb-6">
          <h3 className="font-bold text-lg mb-3 text-gray-900">Departments</h3>
          <nav className="space-y-1">
            {categories.map(category => (
              <div key={category.name}>
                <button
                  onClick={() =>
                    setExpandedCategory(
                      expandedCategory === category.name ? null : category.name
                    )
                  }
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 rounded-md transition-colors"
                >
                  <Link
                    href={category.href}
                    className="flex-1 text-gray-700 hover:text-[#007185]"
                  >
                    {category.name}
                  </Link>
                  <ChevronRight
                    className={`h-4 w-4 text-gray-400 transition-transform ${
                      expandedCategory === category.name ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {expandedCategory === category.name && (
                  <div className="ml-4 mt-1 space-y-1">
                    {category.subcategories.map(sub => (
                      <Link
                        key={sub}
                        href={`${category.href}/${sub.toLowerCase()}`}
                        className="block py-1 px-3 text-sm text-gray-600 hover:text-[#007185] hover:bg-gray-50 rounded-md transition-colors"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-gray-900">Customer Reviews</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2" />
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating
                          ? 'text-[#ff9900] fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">& Up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3 text-gray-900">Price</h4>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">Under $25</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">$25 to $50</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">$50 to $100</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600">$100 & Above</span>
            </label>
          </div>
        </div>

        {/* Brands */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-900">Brands</h4>
          <div className="space-y-2">
            {['Amazon Basics', 'Apple', 'Samsung', 'Sony', 'Nike'].map(
              brand => (
                <label key={brand} className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">{brand}</span>
                </label>
              )
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
