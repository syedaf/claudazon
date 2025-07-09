// Create this file: app/(admin)/_components/admin-breadcrumbs.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadCrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

const routeLabels: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/inventory': 'Inventory',
  '/analytics': 'Analytics',
  '/inventory/add': 'Add Product',
  '/inventory/edit': 'Edit Product',
  '/analytics/sales': 'Sales Analytics',
  '/analytics/products': 'Product Analytics',
  '/analytics/customers': 'Customer Analytics',
};

export function AdminBreadCrumbs() {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadCrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadCrumbItem[] = [];

    // Always start with Dashboard
    breadcrumbs.push({
      label: 'Dashboard',
      href: '/dashboard',
      current: pathname === '/dashboard',
    });

    // Build breadcrumbs from path segments
    let currentPath = '';

    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Skip dashboard since we already added it
      if (segment === 'dashboard') return;

      const isLast = index === segments.length - 1;
      const label =
        routeLabels[currentPath] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);

      breadcrumbs.push({
        label,
        href: currentPath,
        current: isLast,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs if we're only on dashboard
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
      <div className="px-6 py-3">
        <ol className="flex items-center space-x-2">
          {breadcrumbs.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}

              {index === 0 && <Home className="h-4 w-4 text-gray-400 mr-2" />}

              {item.current ? (
                <span className="text-sm font-medium text-gray-900">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

// Hook to get current breadcrumb info (useful for page titles)
export function useBreadcrumbs() {
  const pathname = usePathname();

  const getCurrentPageTitle = (): string => {
    return routeLabels[pathname] || 'Admin';
  };

  const getCurrentSection = (): string => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length <= 1) return 'Dashboard';

    const section = segments[1];
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  return {
    currentPageTitle: getCurrentPageTitle(),
    currentSection: getCurrentSection(),
    pathname,
  };
}
