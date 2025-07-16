import { NextRequest, NextResponse } from 'next/server';
import { validateAuth } from '../../_middleware/auth';
import {
  composeMiddleware,
  corsMiddleware,
  rateLimitMiddleware,
} from '../../_middleware/compose';
import { setCorsHeaders } from '../../_middleware/cors';
import {
  ProfileUpdateSchema,
  validateRequestBody,
} from '../../_middleware/validation';

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

// GET Profile
export async function GET(request: NextRequest) {
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

    // Find user in database
    const user = users.find(u => u.id === authResult.user!.id);
    if (!user) {
      const response = NextResponse.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      );
      return setCorsHeaders(response);
    }

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
      { status: 200 }
    );

    return setCorsHeaders(response);
  } catch (error) {
    console.error('Profile fetch error:', error);
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

// PUT Profile Update
export async function PUT(request: NextRequest) {
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

    // Validate request body
    const validation = await validateRequestBody(request, ProfileUpdateSchema);

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

    const updates = validation.data!;

    // Find user in database
    const userIndex = users.findIndex(u => u.id === authResult.user!.id);
    if (userIndex === -1) {
      const response = NextResponse.json(
        {
          success: false,
          error: 'User not found',
        },
        { status: 404 }
      );
      return setCorsHeaders(response);
    }

    // Check if email is being changed and already exists
    if (updates.email && updates.email !== users[userIndex].email) {
      const emailExists = users.some(
        u => u.email === updates.email && u.id !== authResult.user!.id
      );
      if (emailExists) {
        const response = NextResponse.json(
          {
            success: false,
            error: 'Email already in use by another account',
          },
          { status: 409 }
        );
        return setCorsHeaders(response);
      }
    }

    // Update user
    if (updates.name) users[userIndex].name = updates.name;
    if (updates.email) users[userIndex].email = updates.email;

    const response = NextResponse.json(
      {
        success: true,
        message: 'Profile updated successfully',
        user: {
          id: users[userIndex].id,
          name: users[userIndex].name,
          email: users[userIndex].email,
          role: users[userIndex].role,
          createdAt: users[userIndex].createdAt,
        },
      },
      { status: 200 }
    );

    return setCorsHeaders(response);
  } catch (error) {
    console.error('Profile update error:', error);
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
