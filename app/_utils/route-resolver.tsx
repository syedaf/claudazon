import { UserRole } from '@/middleware';


// Route resolution based on role
export function resolveUserRoute(userRole: UserRole, basePath: string): string {
  const roleRoutes: Record<UserRole, Record<string, string>> = {
    [UserRole.ADMIN]: {
      '/dashboard': '/dashboard/admin',
      '/profile': '/profile/admin',
      '/settings': '/settings/admin',
    },
    [UserRole.CUSTOMER]: {
      '/dashboard': '/dashboard/customer',
      '/profile': '/profile/customer',
      '/settings': '/settings/customer',
    },
    [UserRole.GUEST]: {
      '/dashboard': '/login',
      '/profile': '/login',
      '/settings': '/login',
    },
  };

  return roleRoutes[userRole][basePath] || basePath;
}

// Get available routes for role
export function getAvailableRoutes(userRole: UserRole): string[] {
  const routes: Record<UserRole, string[]> = {
    [UserRole.ADMIN]: [
      '/dashboard/admin',
      '/dashboard/admin/inventory',
      '/dashboard/admin/analytics',
      '/dashboard/admin/users',
    ],
    [UserRole.CUSTOMER]: [
      '/dashboard/customer',
      '/dashboard/customer/orders',
      '/dashboard/customer/wishlist',
      '/dashboard/customer/recommendations',
    ],
    [UserRole.GUEST]: ['/login', '/register'],
  };

  return routes[userRole] || [];
}
