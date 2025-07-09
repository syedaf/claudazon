;
// Create this file: app/_shared/lib/auth.ts

import { LoginCredentials, User, UserRole } from '@/_shared/types/user';


export class AuthService {
  static async verifyToken(token: string): Promise<User | null> {
    try {
      // In production, verify JWT token or validate with auth service
      // This is a simplified example for demonstration

      // Mock token validation
      if (token === 'admin-token') {
        return {
          id: '1',
          email: 'admin@claudazon.com',
          name: 'Admin User',
          role: 'admin' as UserRole,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date(),
          lastLoginAt: new Date(),
          isActive: true,
          preferences: {
            theme: 'light',
            language: 'en',
            timezone: 'UTC',
            notifications: {
              email: true,
              push: true,
              sms: false,
            },
            emailUpdates: {
              newsletter: true,
              productUpdates: true,
              orderUpdates: true,
            },
          },
        };
      }

      if (token === 'user-token') {
        return {
          id: '2',
          email: 'user@claudazon.com',
          name: 'Customer User',
          role: 'user' as UserRole,
          createdAt: new Date('2024-02-01'),
          updatedAt: new Date(),
          lastLoginAt: new Date(),
          isActive: true,
          preferences: {
            theme: 'system',
            language: 'en',
            timezone: 'UTC',
            notifications: {
              email: true,
              push: false,
              sms: false,
            },
            emailUpdates: {
              newsletter: false,
              productUpdates: true,
              orderUpdates: true,
            },
          },
        };
      }

      return null;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  static async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string } | null> {
    try {
      // Mock login validation
      if (
        credentials.email === 'admin@claudazon.com' &&
        credentials.password === 'admin123'
      ) {
        const user: User = {
          id: '1',
          email: 'admin@claudazon.com',
          name: 'Admin User',
          role: 'admin',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date(),
          lastLoginAt: new Date(),
          isActive: true,
          avatar: '/avatars/admin.jpg',
          preferences: {
            theme: 'light',
            language: 'en',
            timezone: 'UTC',
            notifications: {
              email: true,
              push: true,
              sms: false,
            },
            emailUpdates: {
              newsletter: true,
              productUpdates: true,
              orderUpdates: true,
            },
          },
        };

        const token = await this.generateToken(user);
        return { user, token };
      }

      if (
        credentials.email === 'user@claudazon.com' &&
        credentials.password === 'user123'
      ) {
        const user: User = {
          id: '2',
          email: 'user@claudazon.com',
          name: 'Customer User',
          role: 'user',
          createdAt: new Date('2024-02-01'),
          updatedAt: new Date(),
          lastLoginAt: new Date(),
          isActive: true,
          preferences: {
            theme: 'system',
            language: 'en',
            timezone: 'UTC',
            notifications: {
              email: true,
              push: false,
              sms: false,
            },
            emailUpdates: {
              newsletter: false,
              productUpdates: true,
              orderUpdates: true,
            },
          },
        };

        const token = await this.generateToken(user);
        return { user, token };
      }

      return null;
    } catch (error) {
      console.error('Login failed:', error);
      return null;
    }
  }

  static async generateToken(user: User): Promise<string> {
    // In production, generate JWT token with proper signing
    // This is a simplified example
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      issuedAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };

    // In real implementation, use a proper JWT library
    return btoa(JSON.stringify(payload));
  }

  static async validatePermission(
    user: User,
    permission: string
  ): Promise<boolean> {
    // Role-based permission checking
    const rolePermissions: Record<UserRole, string[]> = {
      admin: ['read', 'write', 'delete', 'manage', 'admin'],
      moderator: ['read', 'write', 'moderate'],
      user: ['read', 'write_own'],
      guest: ['read'],
    };

    return rolePermissions[user.role]?.includes(permission) ?? false;
  }

  static async logout(): Promise<void> {
    // Clear token from storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    if (typeof window === 'undefined') return null;

    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return null;

      return await this.verifyToken(token);
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  static async refreshToken(refreshToken: string): Promise<string | null> {
    try {
      // In production, exchange refresh token for new access token
      // This is a mock implementation
      const user = await this.verifyToken(refreshToken);
      if (user) {
        return await this.generateToken(user);
      }
      return null;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return null;
    }
  }

  static hasRole(user: User, role: UserRole): boolean {
    return user.role === role;
  }

  static hasAnyRole(user: User, roles: UserRole[]): boolean {
    return roles.includes(user.role);
  }

  static isAdmin(user: User): boolean {
    return user.role === 'admin';
  }

  static isModerator(user: User): boolean {
    return user.role === 'moderator';
  }

  static hasAdminAccess(user: User): boolean {
    return user.role === 'admin' || user.role === 'moderator';
  }
}

// Export a singleton instance
export const authService = new AuthService();
