import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateRefreshToken, generateToken } from '../../_middleware/auth';
import {
  composeMiddleware,
  corsMiddleware,
  rateLimitMiddleware,
} from '../../_middleware/compose';
import { setCorsHeaders } from '../../_middleware/cors';
import { LoginSchema, validateRequestBody } from '../../_middleware/validation';

// Mock user database - should match register route
const users: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
}> = [
  // Demo admin user
  {
    id: 'admin_001',
    name: 'Claudazon Admin',
    email: 'admin@claudazon.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LeqyoosLTMQqALyNG', // password: admin123
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
    // Validate request body
    const validation = await validateRequestBody(request, LoginSchema);

    if (!validation.success) {
      const response = NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: validation.errors,
        },
        { status: 400 }
      );
      return setCorsHeaders(response);
    }

    const { email, password } = validation.data!;

    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      const response = NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
        },
        { status: 401 }
      );
      return setCorsHeaders(response);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const response = NextResponse.json(
        {
          success: false,
          error: 'Invalid email or password',
        },
        { status: 401 }
      );
      return setCorsHeaders(response);
    }

    // Generate tokens
    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
    const refreshToken = generateRefreshToken(user.id);

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
        refreshToken,
      },
      { status: 200 }
    );

    return setCorsHeaders(response);
  } catch (error) {
    console.error('Login error:', error);
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
