import Link from 'next/link';
import { UserRole } from '@/middleware';

interface RoleNavProps {
  userRole: UserRole;
}

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export function RoleNav({ userRole }: RoleNavProps) {
  const getNavItems = (role: UserRole): NavItem[] => {
    switch (role) {
      case UserRole.ADMIN:
        return [
          { label: 'Dashboard', href: '/dashboard/admin', icon: '📊' },
          {
            label: 'Inventory',
            href: '/dashboard/admin/inventory',
            icon: '📦',
          },
          {
            label: 'Analytics',
            href: '/dashboard/admin/analytics',
            icon: '📈',
          },
          { label: 'Users', href: '/dashboard/admin/users', icon: '👥' },
        ];

      case UserRole.CUSTOMER:
        return [
          { label: 'Dashboard', href: '/dashboard/customer', icon: '🏠' },
          { label: 'Orders', href: '/dashboard/customer/orders', icon: '📋' },
          {
            label: 'Wishlist',
            href: '/dashboard/customer/wishlist',
            icon: '❤️',
          },
          {
            label: 'Recommendations',
            href: '/dashboard/customer/recommendations',
            icon: '✨',
          },
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems(userRole);

  return (
    <nav className="p-4 space-y-2">
      {navItems.map(item => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span>{item.icon}</span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
