import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateRefreshToken, generateToken } from '../../_middleware/auth';
import {
  composeMiddleware,
  corsMiddleware,
  rateLimitMiddleware,
} from '../../_middleware/compose';
import { setCorsHeaders } from '../../_middleware/cors';
import {
  RegisterSchema,
  validateRequestBody,
} from '../../_middleware/validation';

// Mock user database - replace with real database
const users: Array<{
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
}> = [];

export async function POST(request: NextRequest) {
  // Apply middleware
  const middlewareResult = await composeMiddleware(
    corsMiddleware,
    rateLimitMiddleware
  )(request);

  if (middlewareResult) return middlewareResult;

  try {
    // Validate request body
    const validation = await validateRequestBody(request, RegisterSchema);

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

    const { name, email, password } = validation.data!;

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      const response = NextResponse.json(
        {
          success: false,
          error: 'User with this email already exists',
        },
        { status: 409 }
      );
      return setCorsHeaders(response);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      password: hashedPassword,
      role: 'user' as const,
      createdAt: new Date(),
    };

    users.push(newUser);

    // Generate tokens
    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });
    const refreshToken = generateRefreshToken(newUser.id);

    const response = NextResponse.json(
      {
        success: true,
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        token,
        refreshToken,
      },
      { status: 201 }
    );

    return setCorsHeaders(response);
  } catch (error) {
    console.error('Registration error:', error);
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
