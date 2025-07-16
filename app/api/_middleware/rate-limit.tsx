import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
}

export function checkRateLimit(
  request: NextRequest,
  options: RateLimitOptions = { maxRequests: 100, windowMs: 60000 }
): { allowed: boolean; remaining: number; resetTime: number } {
  // Get IP from headers - NextRequest doesn't have .ip property
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIp || 'unknown';

  const now = Date.now();

  if (!store[ip] || now > store[ip].resetTime) {
    store[ip] = {
      count: 1,
      resetTime: now + options.windowMs,
    };
    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      resetTime: store[ip].resetTime,
    };
  }

  store[ip].count++;

  return {
    allowed: store[ip].count <= options.maxRequests,
    remaining: Math.max(0, options.maxRequests - store[ip].count),
    resetTime: store[ip].resetTime,
  };
}

// Export alias for backwards compatibility
export const applyRateLimit = checkRateLimit;
