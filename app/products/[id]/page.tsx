;
// app/products/[id]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Heart, Share2, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data/products';


interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  // Find product by ID
  const product = products.find(p => p.id === id);

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Claudazon</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/products" className="hover:text-blue-600">
            Products
          </Link>
          <span>/</span>
          <Link
            href={`/products/${product.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="hover:text-blue-600"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900">{product.title}</span>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
        </div>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border border-gray-200 p-8">
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-md"
                priority
              />
            </div>

            {/* Image thumbnails placeholder */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="aspect-square bg-gray-100 rounded border border-gray-200 p-2"
                >
                  <Image
                    src={product.imageUrl}
                    alt={`${product.title} view ${i}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover rounded opacity-60"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map(i => {
                    const isFilled = i < Math.floor(product.rating);
                    return (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          isFilled
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    );
                  })}
                </div>
                <span className="text-blue-600 hover:underline cursor-pointer">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <p className="text-gray-600">
                Brand:{' '}
                <span className="font-medium text-gray-900">
                  {product.category}
                </span>
              </p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {product.isPrime && (
                <div className="mt-2">
                  <span className="inline-flex items-center text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Prime FREE One-Day Delivery
                  </span>
                </div>
              )}
            </div>

            {/* Product Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                About this item
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• {product.description}</li>
                <li>• High-quality materials and construction</li>
                <li>• Compatible with modern devices and systems</li>
                <li>• Manufacturer warranty included</li>
                <li>• Customer service support available</li>
              </ul>
            </div>

            {/* Stock Status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                <span className="font-semibold">In Stock</span> - Ready to ship
              </p>
              <p className="text-sm text-green-600 mt-1">
                Order within 2 hours for same-day processing
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button size="lg" className="w-full">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

              <Button variant="outline" size="lg" className="w-full">
                Buy Now
              </Button>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">SKU:</span>{' '}
                {product.id.toUpperCase()}
              </p>
              <p>
                <span className="font-medium">Category:</span>{' '}
                {product.category}
              </p>
              <p>
                <span className="font-medium">Availability:</span> In Stock
              </p>
            </div>
          </div>
        </div>

        {/* Product Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Description
              </button>
              <button className="border-blue-500 text-blue-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Reviews ({product.reviewCount})
              </button>
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                Specifications
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Customer Reviews
              </h3>

              {/* Review Summary */}
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">
                    {product.rating}
                  </div>
                  <div className="flex justify-center mt-1">
                    {[0, 1, 2, 3, 4].map(i => {
                      const isFilled = i < Math.floor(product.rating);
                      return (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            isFilled
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      );
                    })}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {product.reviewCount} reviews
                  </div>
                </div>

                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <div key={stars} className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-600 w-8">
                        {stars}★
                      </span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width:
                              stars === 5 ? '60%' : stars === 4 ? '25%' : '8%',
                          }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {stars === 5 ? '60%' : stars === 4 ? '25%' : '8%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      J
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">
                          John D.
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          2 days ago
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Excellent quality and fast delivery
                      </h4>
                      <p className="text-gray-600">
                        Great product! Exactly as described and arrived quickly.
                        Would definitely recommend to others.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                      S
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">
                          Sarah M.
                        </span>
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="text-sm text-gray-600">
                          1 week ago
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Good value for money
                      </h4>
                      <p className="text-gray-600">
                        Solid product with good build quality. Only minor issue
                        was packaging could be better.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            © 2025 Claudazon. Built with Next.js App Router - Pattern #3:
            Dynamic Routes
          </p>
        </div>
      </footer>
    </div>
  );
}
