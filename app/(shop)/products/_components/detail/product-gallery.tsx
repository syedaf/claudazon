// app/(shop)/products/_components/detail/product-gallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductGalleryProps {
  productId: string;
  images?: string[];
}

export function ProductGallery({
  productId,
  images = [],
}: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Default images with IDs for intercept routes
  const defaultImages = [
    {
      id: 'img001',
      url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    },
    {
      id: 'img002',
      url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
    },
    {
      id: 'img003',
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Main Image - CLICKABLE FOR MODAL */}
      <Link href={`/photo/${defaultImages[currentImageIndex].id}`}>
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-95">
          <Image
            src={defaultImages[currentImageIndex].url}
            alt={`Product ${productId} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </Link>

      {/* Thumbnail Grid - EACH CLICKABLE FOR MODAL */}
      <div className="grid grid-cols-3 gap-2">
        {defaultImages.map((image, index) => (
          <Link
            key={image.id}
            href={`/photo/${image.id}`}
            className={`relative aspect-square rounded-md overflow-hidden border-2 hover:ring-2 hover:ring-blue-500 ${
              index === currentImageIndex
                ? 'border-blue-500'
                : 'border-gray-200'
            }`}
          >
            <Image
              src={image.url}
              alt={`Product ${productId} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
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
  );
}
