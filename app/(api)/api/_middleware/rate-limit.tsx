;
// app/(api)/_middleware/rate-limit.ts
import { NextRequest } from 'next/server';
import { MiddlewareContext, MiddlewareFunction } from 'app/(api)/api/_middleware/compose';


interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
  keyGenerator?: (request: NextRequest) => string;
}

// In-memory store for demo (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const rateLimitMiddleware = (
  options: RateLimitOptions
): MiddlewareFunction => {
  const { maxRequests, windowMs, keyGenerator } = options;

  return async (request: NextRequest, context: MiddlewareContext) => {
    try {
      // Generate key for rate limiting (IP address by default)
      const key = keyGenerator ? keyGenerator(request) : getClientIP(request);

      const now = Date.now();
      const windowStart = now - windowMs;

      // Get current rate limit data
      let limitData = rateLimitStore.get(key);

      // Reset if window has expired
      if (!limitData || limitData.resetTime < windowStart) {
        limitData = {
          count: 0,
          resetTime: now + windowMs,
        };
      }

      // Increment request count
      limitData.count++;
      rateLimitStore.set(key, limitData);

      // Check if limit exceeded
      if (limitData.count > maxRequests) {
        return {
          success: false,
          error: `Rate limit exceeded. Max ${maxRequests} requests per ${windowMs / 1000} seconds`,
        };
      }

      return {
        success: true,
        context: {
          ...context,
          rateLimit: {
            remaining: maxRequests - limitData.count,
            resetTime: limitData.resetTime,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        error: 'Rate limiting failed',
      };
    }
  };
};

// Helper function to get client IP from headers
function getClientIP(request: NextRequest): string {
  // Try different headers in order of preference
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
  const remoteAddr = request.headers.get('remote-addr');

  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  if (remoteAddr) {
    return remoteAddr;
  }

  // Fallback for development/unknown cases
  return 'unknown';
}

// Helper function for common rate limiting scenarios
export function applyRateLimit(options: RateLimitOptions) {
  return rateLimitMiddleware(options);
}

// Pre-configured rate limiters
export const standardRateLimit = rateLimitMiddleware({
  maxRequests: 100,
  windowMs: 15 * 60 * 1000, // 15 minutes
});

export const strictRateLimit = rateLimitMiddleware({
  maxRequests: 10,
  windowMs: 60 * 1000, // 1 minute
});

export const authRateLimit = rateLimitMiddleware({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  keyGenerator: request => {
    // Rate limit by IP for auth endpoints
    return `auth:${getClientIP(request)}`;
  },
});
