// app/(shop)/products/[id]/(...)photo/[imageId]/page.tsx
'use client';

import { useEffect, useState } from 'react'; // ✅ Import useState
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface PhotoModalProps {
  params: Promise<{
    imageId: string;
    id: string;
  }>;
}

export default function PhotoModal({ params }: PhotoModalProps) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{
    imageId: string;
    id: string;
  } | null>(null);

  // ✅ Resolve params in useEffect for client component
  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [router]);

  if (!resolvedParams) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const { imageId, id } = resolvedParams;

  // Mock image data
  const imageUrl = `https://picsum.photos/800/600?random=${imageId}`;
  const imageTitle = `Product Image ${imageId}`;

  console.log('🎯 INTERCEPT ROUTE TRIGGERED!', { imageId, id }); // ✅ Debug log

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-75"
        onClick={() => router.back()}
      />

      {/* Modal Content */}
      <div className="relative max-w-4xl max-h-[90vh] mx-4">
        {/* Close Button */}
        <button
          onClick={() => router.back()}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
          aria-label="Close modal"
        >
          <X className="h-8 w-8" />
        </button>

        {/* Image */}
        <img
          src={imageUrl}
          alt={imageTitle}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />

        {/* Image Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
          <h3 className="text-lg font-semibold">{imageTitle}</h3>
          <p className="text-sm text-gray-300">Product ID: {id}</p>
          <p className="text-sm text-green-400">✅ INTERCEPT ROUTE WORKING!</p>
        </div>
      </div>
    </div>
  );
}
