// app/(api)/_middleware/compose.ts
type MiddlewareFunction = (
  request: NextRequest,
  context?: any
) => Promise<{ success: boolean; error?: string; context?: any }>;

export function composeMiddleware(...middlewares: MiddlewareFunction[]) {
  return async (request: NextRequest) => {
    let context = {};

    for (const middleware of middlewares) {
      const result = await middleware(request, context);

      if (!result.success) {
        return result;
      }

      context = { ...context, ...result.context };
    }

    return { success: true, context };
  };
}

// Usage in API routes
export const standardApiMiddleware = composeMiddleware(
  validateAuth,
  validateRequest,
  applyRateLimit
);

export const adminApiMiddleware = composeMiddleware(
  req => validateAuth(req, { requiredRole: 'admin' }),
  validateRequest,
  applyRateLimit
);
