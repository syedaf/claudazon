// app/(shop)/products/_components/detail/product-gallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  productId: string;
  images?: string[];
}

export function ProductGallery({
  productId,
  images = [],
}: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Default images if none provided
  const defaultImages = [
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
  ];

  const galleryImages = images.length > 0 ? images : defaultImages;

  const nextImage = () => {
    setCurrentImageIndex(prev =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={galleryImages[currentImageIndex]}
          alt={`Product ${productId} - Image ${currentImageIndex + 1}`}
          fill
          className="object-cover"
          priority
        />

        {/* Navigation Arrows */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Grid */}
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                index === currentImageIndex
                  ? 'border-blue-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`Product ${productId} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
