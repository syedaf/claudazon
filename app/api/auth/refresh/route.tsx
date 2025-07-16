import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { generateToken } from '../../_middleware/auth';
import {
  composeMiddleware,
  corsMiddleware,
  rateLimitMiddleware,
} from '../../_middleware/compose';
import { setCorsHeaders } from '../../_middleware/cors';

const JWT_SECRET = process.env.JWT_SECRET || 'claudazon-secret-key';

interface RefreshTokenPayload {
  userId: string;
  type: string;
  iat?: number;
  exp?: number;
}

// Mock user database - should match other routes
const users: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
}> = [
  {
    id: 'admin_001',
    name: 'Claudazon Admin',
    email: 'admin@claudazon.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeqyoosLTMQqALyNG',
    role: 'admin',
    createdAt: new Date(),
  },
];

export async function POST(request: NextRequest) {
  // Apply middleware
  const middlewareResult = await composeMiddleware(
    corsMiddleware,
    rateLimitMiddleware
  )(request);

  if (middlewareResult) return middlewareResult;

  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      const response = NextResponse.json(
        {
          success: false,
          error: 'Refresh token is required',
        },
        { status: 400 }
      );
      return setCorsHeaders(response);
    }

    // Verify refresh token with proper typing
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as RefreshTokenPayload;

    if (decoded.type !== 'refresh') {
      const response = NextResponse.json(
        {
          success: false,
          error: 'Invalid refresh token type',
        },
        { status: 401 }
      );
      return setCorsHeaders(response);
    }

    // Find user
    const user = users.find(u => u.id === decoded.userId);
    if (!user) {
      const response = NextResponse.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 401 }
      );
      return setCorsHeaders(response);
    }

    // Generate new access token
    const newToken = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: 'Token refreshed successfully',
        token: newToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    return setCorsHeaders(response);
  } catch (error) {
    console.error('Token refresh error:', error);
    const response = NextResponse.json(
      {
        success: false,
        error: 'Invalid or expired refresh token',
      },
      { status: 401 }
    );
    return setCorsHeaders(response);
  }
}

export async function OPTIONS(request: NextRequest) {
  return corsMiddleware(request) || new NextResponse(null, { status: 200 });
}
