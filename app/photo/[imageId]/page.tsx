import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PhotoPageProps {
  params: Promise<{
    // ✅ Updated to Promise
    imageId: string;
  }>;
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { imageId } = await params; // ✅ Added await

  // Mock image data
  const imageUrl = `https://picsum.photos/1200/800?random=${imageId}`;
  const imageTitle = `Product Image ${imageId}`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>

        {/* Full Page Image View */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video bg-gray-100">
            <img
              src={imageUrl}
              alt={imageTitle}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {imageTitle}
            </h1>

            <div className="text-gray-600 space-y-2">
              <p>
                <strong>Image ID:</strong> {imageId}
              </p>
              <p>
                <strong>Resolution:</strong> 1200 x 800
              </p>
              <p>
                <strong>View:</strong> Full Page (Direct URL Access)
              </p>
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                💡 Intercept Routes Demo
              </h3>
              <p className="text-blue-800 text-sm">
                This is the <strong>fallback route</strong> that shows when
                someone visits
                <code className="bg-blue-100 px-2 py-1 rounded">
                  /photo/{imageId}
                </code>{' '}
                directly. When navigating from a product page, the intercept
                route shows a modal instead!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
