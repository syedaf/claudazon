// File 4: app/(shop)/products/[id]/@reviews/page.tsx
// Updated reviews slot to check login status
'use client';

import { MessageCircle, Star, ThumbsUp, User } from 'lucide-react';
import { useSlotContext } from '@/components/slot-context/slot-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


// Mock reviews data
const mockReviews = [
  {
    id: 1,
    user: 'Sarah M.',
    rating: 5,
    title: 'Amazing quality!',
    content: 'This product exceeded my expectations. Great value for money.',
    helpful: 12,
    date: '2 weeks ago',
  },
  {
    id: 2,
    user: 'Mike R.',
    rating: 4,
    title: 'Good purchase',
    content: 'Solid product, fast shipping. Would recommend to others.',
    helpful: 8,
    date: '1 month ago',
  },
  {
    id: 3,
    user: 'Emily K.',
    rating: 5,
    title: 'Perfect!',
    content: 'Exactly what I was looking for. Works perfectly.',
    helpful: 15,
    date: '3 weeks ago',
  },
];

export default function ReviewsPage() {
  const { isLoggedIn, toggleLogin } = useSlotContext();

  // Slot-based rendering: Show default.tsx content if not logged in
  if (!isLoggedIn) {
    // This will trigger Next.js to render default.tsx instead
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Customer Reviews
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLogin}
            className="text-xs"
          >
            Demo: Sign Out
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                className="h-4 w-4 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            4.7 out of 5 stars
          </span>
          <span className="text-sm text-muted-foreground">
            ({mockReviews.length} reviews)
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockReviews.map(review => (
          <div key={review.id} className="border-b pb-4 last:border-b-0">
            <div className="flex items-start gap-3">
              <div className="bg-muted rounded-full p-2">
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{review.user}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`h-3 w-3 ${
                          star <= review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {review.date}
                  </span>
                </div>
                <h4 className="font-medium text-sm">{review.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {review.content}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-6 px-2">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full">
            Write a Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
