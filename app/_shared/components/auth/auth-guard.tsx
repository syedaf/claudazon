// app/_shared/components/auth/auth-guard.tsx
'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
}

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
  redirectTo?: string;
}

export function AuthGuard({
  children,
  requiredRole = 'user',
  redirectTo = '/login',
}: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // In a real app, this would check authentication status
      // For now, we'll simulate authentication
      const token = localStorage.getItem('auth_token');

      if (!token) {
        redirect(redirectTo);
        return;
      }

      // Simulate API call to verify token and get user
      const mockUser: User = {
        id: '1',
        email: 'admin@claudazon.com',
        role: 'admin',
        name: 'Admin User',
      };

      // Check role permissions
      if (requiredRole === 'admin' && mockUser.role !== 'admin') {
        redirect('/unauthorized');
        return;
      }

      setUser(mockUser);
    } catch (error) {
      console.error('Auth check failed:', error);
      redirect(redirectTo);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    // This shouldn't render due to redirects, but just in case
    return null;
  }

  return <>{children}</>;
}

// Hook to access current user (optional)
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get user from localStorage or API
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Mock user data
      setUser({
        id: '1',
        email: 'admin@claudazon.com',
        role: 'admin',
        name: 'Admin User',
      });
    }
  }, []);

  return { user };
}
