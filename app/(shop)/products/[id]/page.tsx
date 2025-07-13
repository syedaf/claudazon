// app/(shop)/products/[id]/page.tsx
// Updated product page with demo toggle button
'use client';

import { Heart, Share, ShoppingCart, Star } from 'lucide-react';
import { useSlotContext } from '@/components/slot-context/slot-context';
import Badge from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { isLoggedIn, toggleLogin, userRole } = useSlotContext();

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="space-y-4">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-4xl mb-2">📱</div>
            <p>Product Image</p>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <Badge variant="secondary" className="mb-2">
            Electronics
          </Badge>
          <h1 className="text-3xl font-bold">Premium Smartphone Pro</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              4.7 (2,847 reviews)
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-3xl font-bold text-primary">$899.99</div>
          <div className="text-sm text-muted-foreground line-through">
            $1,199.99
          </div>
          <Badge variant="destructive">25% OFF</Badge>
        </div>

        {/* Slot-based Rendering Demo Controls */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-800">
              🎯 Use Case #15 Demo: Slot-based Rendering
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <span className="font-medium">Status:</span>{' '}
              {isLoggedIn ? '✅ Logged In' : '❌ Not Logged In'}
              <br />
              <span className="font-medium">User Role:</span> {userRole}
            </div>
            <Button
              onClick={toggleLogin}
              variant={isLoggedIn ? 'destructive' : 'default'}
              size="sm"
              className="w-full"
            >
              {isLoggedIn
                ? 'Sign Out (Hide Reviews)'
                : 'Sign In (Show Reviews)'}
            </Button>
            <p className="text-xs text-blue-700">
              Toggle to see conditional slot rendering below ⬇️
            </p>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button className="flex-1">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Free shipping</span>
            <span className="text-green-600">✓</span>
          </div>
          <div className="flex justify-between">
            <span>2-day delivery</span>
            <span className="text-green-600">✓</span>
          </div>
          <div className="flex justify-between">
            <span>30-day returns</span>
            <span className="text-green-600">✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
