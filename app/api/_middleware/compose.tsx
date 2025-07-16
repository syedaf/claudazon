import { NextRequest, NextResponse } from 'next/server';
import { handleCorsPrelight, setCorsHeaders } from './cors';
import { checkRateLimit } from './rate-limit';

export type MiddlewareFunction = (
  request: NextRequest
) => Promise<NextResponse | null> | NextResponse | null;

export interface MiddlewareContext {
  request: NextRequest;
  timestamp: number;
  ip: string;
}

export function composeMiddleware(...middlewares: MiddlewareFunction[]) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    for (const middleware of middlewares) {
      const result = await middleware(request);
      if (result) return result;
    }
    return null;
  };
}

export function corsMiddleware(request: NextRequest): NextResponse | null {
  if (request.method === 'OPTIONS') {
    return handleCorsPrelight();
  }
  return null;
}

export function rateLimitMiddleware(request: NextRequest): NextResponse | null {
  const rateLimitResult = checkRateLimit(request);

  if (!rateLimitResult.allowed) {
    const response = NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
    response.headers.set('X-RateLimit-Remaining', '0');
    response.headers.set(
      'X-RateLimit-Reset',
      rateLimitResult.resetTime.toString()
    );
    return setCorsHeaders(response);
  }

  return null;
}
