;
// app/products/[id]/not-found.tsx

// app/products/[id]/not-found.tsx
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Claudazon</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* 404 Message */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">Error 404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Product Not Found
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              {`Sorry, we couldn't find the product you're looking for. It may
              have been removed or the link might be incorrect.`}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <Button variant="default" size="lg" className="min-w-48">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>

            <Link href="/products">
              <Button variant="outline" size="lg" className="min-w-48">
                <Search className="h-4 w-4 mr-2" />
                Search Products
              </Button>
            </Link>
          </div>

          {/* Helpful Suggestions */}
          <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-4">
              You might be interested in:
            </h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/products/electronics"
                className="block text-blue-600 hover:text-blue-800"
              >
                Browse Electronics
              </Link>
              <Link
                href="/products/home-kitchen"
                className="block text-blue-600 hover:text-blue-800"
              >
                Browse Home & Kitchen
              </Link>
              <Link
                href="/products"
                className="block text-blue-600 hover:text-blue-800"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            © 2025 Claudazon. Built with Next.js App Router
          </p>
        </div>
      </footer>
    </div>
  );
}
