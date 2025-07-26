import { NextRequest, NextResponse } from 'next/server';


// User roles enum
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  GUEST = 'guest',
}

// Simplified role detection for testing
async function getUserRole(request: NextRequest): Promise<UserRole> {
  try {
    // Check for test role cookie (for demo purposes)
    const testRole = request.cookies.get('test-role')?.value as UserRole;
    if (testRole && Object.values(UserRole).includes(testRole)) {
      return testRole;
    }

    // Check for auth token (simplified)
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return UserRole.GUEST;
    }

    // For demo: return CUSTOMER by default if token exists
    return UserRole.CUSTOMER;
  } catch (error) {
    console.error('Role detection error:', error);
    return UserRole.GUEST;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle dashboard conditional routing
  if (pathname === '/dashboard') {
    const userRole = await getUserRole(request);

    switch (userRole) {
      case UserRole.ADMIN:
        return NextResponse.redirect(new URL('/dashboard/admin', request.url));

      case UserRole.CUSTOMER:
        return NextResponse.redirect(
          new URL('/dashboard/customer', request.url)
        );

      case UserRole.GUEST:
      default:
        return NextResponse.redirect(new URL('/unauthorized', request.url));
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
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Set role header for components
  const userRole = await getUserRole(request);
  const response = NextResponse.next();
  response.headers.set('x-user-role', userRole);

  return response;
}

export const runtime = 'edge';

export const matcher = ['/((?!_next/static|_next/image|favicon.ico).*)'];
