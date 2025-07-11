// app/(shop)/products/_components/detail/product-reviews.tsx
'use client';

import { Star } from 'lucide-react';

interface ProductReviewsProps {
  productId: string;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  // Mock reviews - in real app, fetch based on productId
  const reviews: Review[] = [
    {
      id: '1',
      author: 'John D.',
      rating: 5,
      title: 'Excellent quality!',
      comment:
        'This product exceeded my expectations. Great build quality and fast shipping.',
      date: '2024-03-15',
      verified: true,
    },
    {
      id: '2',
      author: 'Sarah M.',
      rating: 4,
      title: 'Good value for money',
      comment:
        'Solid product overall. Minor packaging issues but the product itself is great.',
      date: '2024-03-10',
      verified: true,
    },
    {
      id: '3',
      author: 'Mike R.',
      rating: 5,
      title: 'Highly recommend',
      comment: 'Perfect for my needs. Will definitely order again.',
      date: '2024-03-08',
      verified: false,
    },
  ];

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Customer Reviews ({reviews.length})
        </h3>
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= averageRating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {averageRating.toFixed(1)} out of 5
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map(review => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-6 last:border-b-0"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">
                    {review.author}
                  </span>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>

            <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-700 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
