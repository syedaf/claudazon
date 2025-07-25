import { headers } from 'next/headers';
import { UserRole } from '@/middleware';

// Server-side role detection
export async function getUserRoleServer(): Promise<UserRole> {
  try {
    const headersList = await headers();
    const role = headersList.get('x-user-role') as UserRole;

    return role || UserRole.GUEST;
  } catch (error) {
    console.error('Server role detection error:', error);
    return UserRole.GUEST;
  }
}

// Client-side role detection hook
export function useUserRole(): UserRole {
  if (typeof window === 'undefined') {
    return UserRole.GUEST;
  }

  // Check test cookie for demo
  const cookies = document.cookie.split(';');
  const testRoleCookie = cookies.find(c => c.trim().startsWith('test-role='));

  if (testRoleCookie) {
    const role = testRoleCookie.split('=')[1] as UserRole;
    if (Object.values(UserRole).includes(role)) {
      return role;
    }
  }

  return UserRole.GUEST;
}
