;
// app/(api)/_middleware/auth.ts
import { NextRequest } from 'next/server';
import { AuthService } from '@/_shared/lib/auth';
import { User, UserRole } from '@/_shared/types/user';


interface AuthOptions {
  requiredRole?: UserRole;
  optional?: boolean;
}

interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export async function validateAuth(
  request: NextRequest,
  options: AuthOptions = {}
): Promise<AuthResult> {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token && !options.optional) {
      return { success: false, error: 'No authentication token provided' };
    }

    if (!token && options.optional) {
      return { success: true };
    }

    const user = await AuthService.verifyToken(token!);

    if (!user) {
      return { success: false, error: 'Invalid authentication token' };
    }

    // Check role requirements
    if (options.requiredRole && user.role !== options.requiredRole) {
      return {
        success: false,
        error: `${options.requiredRole} role required`,
      };
    }

    return { success: true, user };
  } catch (error) {
    console.error('Auth validation error:', error);
    return { success: false, error: 'Authentication failed' };
  }
}
