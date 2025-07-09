;
// app/(api)/_middleware/validation.ts
import { NextRequest } from 'next/server';


interface ValidationResult {
  success: boolean;
  error?: string;
}

export async function validateRequest(
  request: NextRequest
): Promise<ValidationResult> {
  try {
    const { method, url } = request;
    const { searchParams } = new URL(url);

    // Validate pagination parameters
    if (method === 'GET') {
      const page = searchParams.get('page');
      const limit = searchParams.get('limit');

      if (page && (isNaN(Number(page)) || Number(page) < 1)) {
        return { success: false, error: 'Page must be a positive integer' };
      }

      if (
        limit &&
        (isNaN(Number(limit)) || Number(limit) < 1 || Number(limit) > 100)
      ) {
        return { success: false, error: 'Limit must be between 1 and 100' };
      }
    }

    // Validate POST/PUT request body
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const contentType = request.headers.get('content-type');

      if (!contentType?.includes('application/json')) {
        return {
          success: false,
          error: 'Content-Type must be application/json',
        };
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Request validation error:', error);
    return { success: false, error: 'Request validation failed' };
  }
}
