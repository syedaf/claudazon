;

// app/(shop)/products/[id]/@reviews/default.tsx

// Fallback content when reviews slot is conditionally hidden
import { Lock, MessageCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import Card, { CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';











// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ReviewsDefault() {
  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <Lock className="h-8 w-8 text-muted-foreground" />
        </div>
        <CardTitle className="flex items-center justify-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Customer Reviews
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">
          Sign in to read customer reviews and ratings for this product.
        </p>
        <div className="space-y-2">
          <Button className="w-full" variant="default">
            Sign In to View Reviews
          </Button>
          <Button className="w-full" variant="outline">
            Create Account
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Join thousands of customers sharing their experiences
        </p>
      </CardContent>
    </Card>
  );
}
