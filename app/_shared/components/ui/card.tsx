;

// app/_shared/components/ui/card.tsx
// Complete enterprise-grade card component with all variants

import { forwardRef, ReactNode } from 'react';
import { cn } from '@/_shared/lib/utils'; // Utility function for className merging




















// =============================================================================
// CARD ROOT COMPONENT
// =============================================================================

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
Card.displayName = 'Card';

// =============================================================================
// CARD HEADER COMPONENT
// =============================================================================

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
CardHeader.displayName = 'CardHeader';

// =============================================================================
// CARD TITLE COMPONENT - THIS WAS MISSING! ✅
// =============================================================================

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref as any}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  ),
);
CardTitle.displayName = 'CardTitle';

// =============================================================================
// CARD DESCRIPTION COMPONENT - BONUS ADDITION ✅
// =============================================================================

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </p>
  ),
);
CardDescription.displayName = 'CardDescription';

// =============================================================================
// CARD CONTENT COMPONENT
// =============================================================================

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
CardContent.displayName = 'CardContent';

// =============================================================================
// CARD FOOTER COMPONENT - COMPLETED! ✅
// =============================================================================

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
CardFooter.displayName = 'CardFooter';

// =============================================================================
// UTILITY FUNCTION FOR CLASSNAME MERGING
// =============================================================================

// If you don't have utils.ts yet, here's the cn function:
// Create this in app/_shared/lib/utils.ts

/*
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
*/


// Fallback cn function if utils doesn't exist:
function cnFallback(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}


// Use the imported cn or fallback
const cnFunction = typeof cn !== 'undefined' ? cn : cnFallback;

// =============================================================================
// EXPORTS
// =============================================================================

export {
  Card,
  CardHeader,
  CardTitle,        // ✅ NOW AVAILABLE!
  CardDescription,  // ✅ BONUS COMPONENT!
  CardContent,
  CardFooter,
};

// Default export for backward compatibility
export default Card;

// =============================================================================
// USAGE EXAMPLES FOR REFERENCE
// =============================================================================

/*
// Basic Usage:
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Use Case #15 Example:
<Card className="w-full">
  <CardHeader className="text-center">
    <CardTitle className="flex items-center justify-center gap-2">
      <MessageCircle className="h-5 w-5" />
      Customer Reviews
    </CardTitle>
  </CardHeader>
  <CardContent className="text-center space-y-4">
    <p className="text-muted-foreground">
      Sign in to read customer reviews and ratings for this product.
    </p>
  </CardContent>
</Card>
*/