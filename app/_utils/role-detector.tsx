import { headers } from 'next/headers';
import { UserRole } from '@/middleware';

// Server-side role detection
export async function getUserRoleServer(): Promise<UserRole> {
  try {
    const headersList = await headers(); // Add await here
    const role = headersList.get('x-user-role') as UserRole;

    return role || UserRole.GUEST;
  } catch (error) {
    console.error('Server role detection error:', error);
    return UserRole.GUEST;
  }
}

// Client-side role detection hook
export function useUserRole() {
  // This would typically use a context or state management
  // For now, we'll simulate with localStorage
  if (typeof window === 'undefined') {
    return UserRole.GUEST;
  }

  const role = localStorage.getItem('userRole') as UserRole;
  return role || UserRole.GUEST;
}

// Role permission checker
export function hasPermission(
  userRole: UserRole,
  requiredRole: UserRole
): boolean {
  const rolePriority = {
    [UserRole.GUEST]: 0,
    [UserRole.CUSTOMER]: 1,
    [UserRole.ADMIN]: 2,
  };

  return rolePriority[userRole] >= rolePriority[requiredRole];
}
