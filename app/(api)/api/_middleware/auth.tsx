;
// app/(api)/_middleware/auth.ts
import { NextRequest } from 'next/server';
import { MiddlewareContext, MiddlewareFunction } from 'app/(api)/api/_middleware/compose';


export const authMiddleware: MiddlewareFunction = async (
  request: NextRequest,
  context: MiddlewareContext
) => {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        success: false,
        error: 'Missing or invalid authorization header',
      };
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // In production, verify JWT token here
    // For now, simple token validation
    if (token === 'admin-token') {
      return {
        success: true,
        context: {
          ...context,
          user: {
            id: '1',
            email: 'admin@claudazon.com',
            role: 'admin',
          },
        },
      };
    }

    if (token === 'user-token') {
      return {
        success: true,
        context: {
          ...context,
          user: {
            id: '2',
            email: 'user@claudazon.com',
            role: 'user',
          },
        },
      };
    }

    return {
      success: false,
      error: 'Invalid token',
    };
  } catch (error) {
    return {
      success: false,
      error: 'Authentication failed',
    };
  }
};

export function validateAuth(request: NextRequest, context: MiddlewareContext) {
  return authMiddleware(request, context);
}
