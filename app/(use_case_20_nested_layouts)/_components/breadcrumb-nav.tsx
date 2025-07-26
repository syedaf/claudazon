'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BreadcrumbNav() {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ name: 'Nested Layouts Demo', href: '/' }];

    if (segments.includes('reviews')) {
      breadcrumbs.push({ name: 'Reviews', href: '/reviews' });
    }

    if (segments.includes('product')) {
      breadcrumbs.push({ name: 'Product Reviews', href: '/reviews/product' });
    }

    if (segments.includes('detailed')) {
      breadcrumbs.push({
        name: 'Detailed Analysis',
        href: '/reviews/product/detailed',
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 py-3 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 text-slate-400 mx-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-slate-900 font-medium">{crumb.name}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
