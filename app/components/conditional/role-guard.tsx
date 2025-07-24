'use client';

import { hasPermission, useUserRole } from '@/_utils/role-detector';
import { UserRole } from '@/middleware';

interface RoleGuardProps {
  requiredRole: UserRole;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function RoleGuard({
  requiredRole,
  fallback,
  children,
}: RoleGuardProps) {
  const userRole = useUserRole();

  if (!hasPermission(userRole, requiredRole)) {
    return (
      <>
        {fallback || (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">
              Access denied. Required role: {requiredRole}
            </p>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
}
