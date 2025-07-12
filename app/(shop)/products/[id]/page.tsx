import Link from 'next/link';
import { TestLinks } from './test-links'; // ✅ Import client component

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  // Mock product images for demo
  const productImages = [
    { id: 'img001', alt: 'Product Front View' },
    { id: 'img002', alt: 'Product Side View' },
    { id: 'img003', alt: 'Product Detail View' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images Section - ENHANCED */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Product Gallery</h2>

        {/* Main Image with Intercept Route Link */}
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Link href={`/photo/${productImages[0].id}`}>
            <img
              src={`https://picsum.photos/600/600?random=${productImages[0].id}`}
              alt={productImages[0].alt}
              className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Thumbnail Images */}
        <div className="grid grid-cols-3 gap-2">
          {productImages.map(image => (
            <Link
              key={image.id}
              href={`/photo/${image.id}`}
              className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500"
            >
              <img
                src={`https://picsum.photos/200/200?random=${image.id}`}
                alt={image.alt}
                className="w-full h-full object-cover cursor-pointer"
              />
            </Link>
          ))}
        </div>

        {/* Demo Notice */}
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>🎯 Intercept Routes Demo:</strong> Click any image above.
            Notice it opens in a modal overlay instead of navigating to a new
            page!
          </p>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Sample Product {id}
          </h1>
          <p className="text-gray-600 mt-2">
            This product page demonstrates intercept routes. Click the images to
            see the modal overlay in action!
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">$99.99</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
              In Stock
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-gray-600">
              A sample product created to demonstrate Next.js intercept routes
              functionality. The images above use intercept routes to show
              modals when clicked from this page, but will show full pages when
              accessed directly.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Features</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Intercept route modal demonstration</li>
              <li>Fallback route for direct access</li>
              <li>Responsive image gallery</li>
              <li>Amazon-style user experience</li>
            </ul>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>

        {/* Test Links - CLIENT COMPONENT */}
        <TestLinks />
      </div>
    </div>
  );
}