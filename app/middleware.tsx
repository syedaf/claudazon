import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// User roles enum
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  GUEST = 'guest',
}

// JWT payload interface
interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  exp: number;
}

// Role detection function
async function getUserRole(request: NextRequest): Promise<UserRole> {
  try {
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return UserRole.GUEST;
    }

    // Verify JWT and extract role
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'fallback-secret'
    );
    const { payload } = (await jwtVerify(token, secret)) as {
      payload: JWTPayload;
    };

    return payload.role || UserRole.GUEST;
  } catch (error) {
    console.error('Role detection error:', error);
    return UserRole.GUEST;
  }
}

// Main middleware function
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle dashboard conditional routing
  if (pathname === '/dashboard') {
    const userRole = await getUserRole(request);

    // Conditional routing based on role
    switch (userRole) {
      case UserRole.ADMIN:
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));

      case UserRole.CUSTOMER:
        return NextResponse.redirect(
          new URL('/dashboard/customer', request.url)
        );

      case UserRole.GUEST:
      default:
        return NextResponse.redirect(
          new URL('/login?redirect=/dashboard', request.url)
        );
    }
  }

  // Protect admin routes
  if (pathname.startsWith('/dashboard/admin')) {
    const userRole = await getUserRole(request);

    if (userRole !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Protect customer routes
  if (pathname.startsWith('/dashboard/customer')) {
    const userRole = await getUserRole(request);

    if (userRole !== UserRole.CUSTOMER && userRole !== UserRole.ADMIN) {
      return NextResponse.redirect(
        new URL('/login?redirect=' + pathname, request.url)
      );
    }
  }

  // Set role header for components
  const userRole = await getUserRole(request);
  const response = NextResponse.next();
  response.headers.set('x-user-role', userRole);

  return response;
}

// Middleware configuration
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/dashboard/:path*'],
};
