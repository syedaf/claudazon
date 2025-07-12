import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/_shared/lib/data/categories';

interface BrowsePageProps {
  params: Promise<{
    // ✅ Updated to Promise
    slug: string[];
  }>;
}

// Helper functions remain the same...
function findCategoryBySlug(slug: string) {
  return categories.find(cat => cat.slug === slug);
}

function findSubcategoryBySlug(categorySlug: string, subcategorySlug: string) {
  const category = findCategoryBySlug(categorySlug);
  return category?.subcategories.find(sub => sub.slug === subcategorySlug);
}

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

  for (let i = 2; i < slug.length; i++) {
    breadcrumbs.push({
      name: slug[i].charAt(0).toUpperCase() + slug[i].slice(1),
      href: `/browse/${slug.slice(0, i + 1).join('/')}`,
    });
  }

  return breadcrumbs;
}

export default async function BrowsePage({ params }: BrowsePageProps) {
  const { slug } = await params; // ✅ Added await

  // Handle different path depths
  if (slug.length === 0) {
    notFound();
  }

  const breadcrumbs = generateBreadcrumbs(slug);

  // Rest of component implementation...
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ArrowRight className="h-4 w-4 mx-2" />}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-blue-600">
                {crumb.name}
              </Link>
            ) : (
              <span className="font-medium text-gray-900">{crumb.name}</span>
            )}
          </div>
        ))}
      </nav>

      {/* Rest of page content */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Browse: {slug.join(' / ')}
        </h1>
        <p className="text-gray-600">
          This demonstrates catch-all routes with path: {slug.join('/')}
        </p>
      </div>
    </div>
  );
}
