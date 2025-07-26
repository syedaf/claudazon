'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LayoutDemoControls() {
  const pathname = usePathname();

  const routes = [
    {
      path: '/',
      name: 'Landing Page',
      description: 'Use Case root layout only',
      levels: 2,
    },
    {
      path: '/reviews',
      name: 'Reviews Section',
      description: 'Reviews section layout added',
      levels: 3,
    },
    {
      path: '/reviews/product',
      name: 'Product Reviews',
      description: 'Product context layout added',
      levels: 4,
    },
    {
      path: '/reviews/product/detailed',
      name: 'Detailed Analysis',
      description: 'Detailed analysis layout added',
      levels: 5,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Layout Composition Controls
      </h3>
      <p className="text-slate-600 mb-6">
        Navigate between different pages to see how layouts compose together.
        Watch the layout indicators and breadcrumbs change as you explore.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {routes.map(route => (
          <Link
            key={route.path}
            href={route.path}
            className={`p-4 rounded-lg border transition-all ${
              pathname === route.path
                ? 'border-blue-600 bg-blue-50 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4
                  className={`font-medium ${
                    pathname === route.path ? 'text-blue-900' : 'text-gray-900'
                  }`}
                >
                  {route.name}
                </h4>
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    pathname === route.path
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {route.levels} Levels
                </div>
              </div>
              <p
                className={`text-sm ${
                  pathname === route.path ? 'text-blue-700' : 'text-slate-600'
                }`}
              >
                {route.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
