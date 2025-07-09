;
// app/(api)/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ProductService } from '@/_shared/lib/product-service';
import { ApiResponse, PaginationParams, Product } from '@/_shared/types/api';
import { validateAuth } from '../_middleware/auth';
import { applyRateLimit } from '../_middleware/rate-limit';
import { validateRequest } from '../_middleware/validation';


export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<Product[]>>> {
  try {
    // Apply middleware chain
    const authResult = await validateAuth(request);
    const validationResult = await validateRequest(request);
    const rateLimitResult = await applyRateLimit(request);

    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const params: PaginationParams = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
    };

    // Fetch products using shared service
    const result = await ProductService.getProducts(params);

    return NextResponse.json({
      success: true,
      data: result.products,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<Product>>> {
  try {
    // Admin-only endpoint
    const authResult = await validateAuth(request, { requiredRole: 'admin' });

    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const productData = await request.json();
    const newProduct = await ProductService.createProduct(productData);

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
