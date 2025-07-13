;

// app/_shared/components/ui/badge.tsx
// Next.js 15+ fully compatible badge component - NO dynamic indexing

import { forwardRef, ReactNode } from 'react';


















// =============================================================================
// SIMPLE UTILITY FUNCTION (No external dependencies)
// =============================================================================

function combineClasses(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}


// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'warning'
  | 'info'
  | 'prime'
  | 'bestseller'
  | 'deal'
  | 'new'
  | 'limited';

type BadgeSize = 'sm' | 'default' | 'lg';

// =============================================================================
// CORE BADGE COMPONENT
// =============================================================================

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    // Base classes
    const baseClasses = 'inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

    // Get variant classes using switch (no dynamic indexing)
    let variantClasses: string;
    switch (variant) {
      case 'secondary':
        variantClasses = 'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200';
        break;
      case 'destructive':
        variantClasses = 'border-transparent bg-red-500 text-white hover:bg-red-600';
        break;
      case 'outline':
        variantClasses = 'text-gray-900 border-gray-300 bg-white hover:bg-gray-50';
        break;
      case 'success':
        variantClasses = 'border-transparent bg-green-500 text-white hover:bg-green-600';
        break;
      case 'warning':
        variantClasses = 'border-transparent bg-yellow-500 text-white hover:bg-yellow-600';
        break;
      case 'info':
        variantClasses = 'border-transparent bg-blue-500 text-white hover:bg-blue-600';
        break;
      case 'prime':
        variantClasses = 'border-transparent bg-blue-600 text-white hover:bg-blue-700';
        break;
      case 'bestseller':
        variantClasses = 'border-transparent bg-orange-500 text-white hover:bg-orange-600';
        break;
      case 'deal':
        variantClasses = 'border-transparent bg-red-500 text-white hover:bg-red-600';
        break;
      case 'new':
        variantClasses = 'border-transparent bg-green-500 text-white hover:bg-green-600';
        break;
      case 'limited':
        variantClasses = 'border-transparent bg-purple-500 text-white hover:bg-purple-600';
        break;
      default: // 'default'
        variantClasses = 'border-transparent bg-gray-900 text-white hover:bg-gray-800';
    }

    // Get size classes using switch (no dynamic indexing)
    let sizeClasses: string;
    switch (size) {
      case 'sm':
        sizeClasses = 'px-2 py-0.5 text-xs';
        break;
      case 'lg':
        sizeClasses = 'px-3 py-1 text-sm';
        break;
      default: // 'default'
        sizeClasses = 'px-2.5 py-0.5 text-xs';
    }

    return (
      <div
        ref={ref}
        className={combineClasses(baseClasses, variantClasses, sizeClasses, className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Badge.displayName = 'Badge';

// =============================================================================
// AMAZON BADGES
// =============================================================================

type AmazonBadgeType = 'prime' | 'bestseller' | 'deal' | 'new' | 'limited' | 'choice';

interface AmazonBadgeProps extends Omit<BadgeProps, 'variant'> {
  type: AmazonBadgeType;
  children?: ReactNode;
}

const AmazonBadge = forwardRef<HTMLDivElement, AmazonBadgeProps>(
  ({ type, children, className, ...props }, ref) => {
    let defaultContent: string;
    let badgeVariant: BadgeVariant;

    switch (type) {
      case 'prime':
        defaultContent = 'Prime';
        badgeVariant = 'prime';
        break;
      case 'bestseller':
        defaultContent = '#1 Best Seller';
        badgeVariant = 'bestseller';
        break;
      case 'deal':
        defaultContent = 'Deal';
        badgeVariant = 'deal';
        break;
      case 'new':
        defaultContent = 'New';
        badgeVariant = 'new';
        break;
      case 'limited':
        defaultContent = 'Limited Time';
        badgeVariant = 'limited';
        break;
      case 'choice':
        defaultContent = 'Amazon\'s Choice';
        badgeVariant = 'warning';
        break;
      default:
        defaultContent = 'Badge';
        badgeVariant = 'default';
    }

    return (
      <Badge
        ref={ref}
        variant={badgeVariant}
        className={combineClasses('font-bold uppercase tracking-wide', className)}
        {...props}
      >
        {children || defaultContent}
      </Badge>
    );
  },
);
AmazonBadge.displayName = 'AmazonBadge';

// =============================================================================
// STATUS BADGES
// =============================================================================

type StatusType = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'processing';

interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: StatusType;
  children?: ReactNode;
}

const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, children, className, ...props }, ref) => {
    let defaultContent: string;
    let badgeVariant: BadgeVariant;

    switch (status) {
      case 'active':
        defaultContent = 'Active';
        badgeVariant = 'success';
        break;
      case 'inactive':
        defaultContent = 'Inactive';
        badgeVariant = 'secondary';
        break;
      case 'pending':
        defaultContent = 'Pending';
        badgeVariant = 'warning';
        break;
      case 'approved':
        defaultContent = 'Approved';
        badgeVariant = 'success';
        break;
      case 'rejected':
        defaultContent = 'Rejected';
        badgeVariant = 'destructive';
        break;
      case 'processing':
        defaultContent = 'Processing';
        badgeVariant = 'info';
        break;
      default:
        defaultContent = 'Unknown';
        badgeVariant = 'default';
    }

    return (
      <Badge
        ref={ref}
        variant={badgeVariant}
        className={combineClasses('capitalize', className)}
        {...props}
      >
        {children || defaultContent}
      </Badge>
    );
  },
);
StatusBadge.displayName = 'StatusBadge';

// =============================================================================
// EXPORTS
// =============================================================================

export { Badge, AmazonBadge, StatusBadge };
export type { BadgeProps, AmazonBadgeProps, StatusBadgeProps };

// Default export
export default Badge;

// =============================================================================
// USAGE EXAMPLES FOR REFERENCE
// =============================================================================

/*
// Basic Usage:
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>

// Amazon-specific badges:
<AmazonBadge type="prime" />
<AmazonBadge type="bestseller" />
<AmazonBadge type="deal" />

// Status badges:
<StatusBadge status="active" />
<StatusBadge status="pending" />

// Use Case #15 Examples:
<Badge variant="secondary" className="mb-2">Electronics</Badge>
<Badge variant="destructive">25% OFF</Badge>
<Badge variant="success">In Stock</Badge>
*/