import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '../../_middleware/auth';
import {
  composeMiddleware,
  corsMiddleware,
  rateLimitMiddleware,
} from '../../_middleware/compose';
import { setCorsHeaders } from '../../_middleware/cors';

// Mock blacklist for tokens - replace with Redis or database
const tokenBlacklist: Set<string> = new Set();

export async function POST(request: NextRequest) {
  // Apply middleware
  const middlewareResult = await composeMiddleware(
    corsMiddleware,
    rateLimitMiddleware
  )(request);

  if (middlewareResult) return middlewareResult;

  try {
    // Validate authentication
    const authResult = await validateAuth(request);

    if (!authResult.success) {
      const response = NextResponse.json(
        {
          success: false,
          error: 'Authentication required',
        },
        { status: 401 }
      );
      return setCorsHeaders(response);
    }

    // Get token from header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.substring(7); // Remove 'Bearer ' prefix

    if (token) {
      // Add token to blacklist
      tokenBlacklist.add(token);
    }

    const response = NextResponse.json(
      {
        success: true,
        message: 'Logout successful',
      },
      { status: 200 }
    );

    return setCorsHeaders(response);
  } catch (error) {
    console.error('Logout error:', error);
    const response = NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
    return setCorsHeaders(response);
  }
}

export async function OPTIONS(request: NextRequest) {
  return corsMiddleware(request) || new NextResponse(null, { status: 200 });
}
