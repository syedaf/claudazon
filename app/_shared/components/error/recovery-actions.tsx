;
// components/error/recovery-actions.tsx
import Link from 'next/link';
import { Grid, Home, Search, Settings, User } from 'lucide-react';
import { Button } from '@/_shared/components/ui/button';


interface RecoveryActionsProps {
  section: string;
  compact?: boolean;
}

export function RecoveryActions({
  section,
  compact = false,
}: RecoveryActionsProps) {
  const getQuickActions = () => {
    switch (section) {
      case 'products':
        return [
          { icon: Grid, label: 'Browse All', href: '/products' },
          { icon: Search, label: 'Search', href: '/search' },
          { icon: Home, label: 'Home', href: '/' },
        ];
      case 'admin':
        return [
          { icon: Settings, label: 'Dashboard', href: '/admin' },
          { icon: Grid, label: 'Inventory', href: '/admin/inventory' },
          { icon: Home, label: 'Home', href: '/' },
        ];
      case 'auth':
        return [
          { icon: User, label: 'Sign In', href: '/auth/login' },
          { icon: Home, label: 'Home', href: '/' },
        ];
      default:
        return [
          { icon: Home, label: 'Home', href: '/' },
          { icon: Search, label: 'Search', href: '/search' },
        ];
    }
  };

  const actions = getQuickActions();

  if (compact) {
    return (
      <div className="flex gap-2 justify-center">
        {actions.map(action => (
          <Link key={action.href} href={action.href}>
            <Button variant="outline" size="sm">
              <action.icon className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
      {actions.map(action => (
        <Link key={action.href} href={action.href}>
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-center">
            <action.icon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">
              {action.label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
