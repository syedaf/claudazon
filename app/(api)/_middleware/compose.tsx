;
// app/(api)/_middleware/compose.ts
import { NextRequest, NextResponse } from 'next/server';


// Define proper types instead of 'any'
export interface MiddlewareContext {
  user?: {
    id: string;
    email: string;
    role: string;
  };
  rateLimit?: {
    remaining: number;
    resetTime: number;
  };
  validation?: {
    isValid: boolean;
    errors: string[];
  };
}

export type MiddlewareFunction = (
  request: NextRequest,
  context: MiddlewareContext
) => Promise<{ success: boolean; error?: string; context?: MiddlewareContext }>;

export function composeMiddleware(...middlewares: MiddlewareFunction[]) {
  return async (request: NextRequest): Promise<NextResponse> => {
    let context: MiddlewareContext = {};

    for (const middleware of middlewares) {
      const result = await middleware(request, context);

      if (!result.success) {
        return NextResponse.json(
          { error: result.error || 'Middleware failed' },
          { status: 400 }
        );
      }

      if (result.context) {
        context = { ...context, ...result.context };
      }
    }

    // If all middleware passed, continue to the actual route handler
    return NextResponse.next();
  };
}
