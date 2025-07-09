;
// app/(api)/_middleware/rate-limit.ts
import { NextRequest } from 'next/server';


interface RateLimitResult {
  success: boolean;
  error?: string;
  remaining?: number;
}

// Simple in-memory rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export async function applyRateLimit(
  request: NextRequest,
  maxRequests: number = 100,
  windowMs: number = 60000 // 1 minute
): Promise<RateLimitResult> {
  try {
    const clientId = getClientId(request);
    const now = Date.now();
    const windowStart = now - windowMs;

    // Clean up old entries
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }

    const current = rateLimitStore.get(clientId);

    if (!current || current.resetTime < windowStart) {
      // First request in window or window has expired
      rateLimitStore.set(clientId, {
        count: 1,
        resetTime: now + windowMs,
      });
      return { success: true, remaining: maxRequests - 1 };
    }

    if (current.count >= maxRequests) {
      return {
        success: false,
        error: 'Rate limit exceeded',
        remaining: 0,
      };
    }

    // Increment count
    current.count++;
    rateLimitStore.set(clientId, current);

    return { success: true, remaining: maxRequests - current.count };
  } catch (error) {
    console.error('Rate limiting error:', error);
    // Don't block requests if rate limiting fails
    return { success: true };
  }
}

function getClientId(request: NextRequest): string {
  // Use IP address as client identifier
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}
