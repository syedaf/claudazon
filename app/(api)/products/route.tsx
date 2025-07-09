;
// app/(api)/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ProductService } from '@/_shared/lib/product-service';
import { ApiResponse, Product } from '@/_shared/types/api';
import { validateAuth } from '../_middleware/auth';
import { MiddlewareContext } from '../_middleware/compose';
import { applyRateLimit } from '../_middleware/rate-limit';
import { validateRequest } from '../_middleware/validation';


// GET /api/products
export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await applyRateLimit({
      maxRequests: 100,
      windowMs: 15 * 60 * 1000, // 15 minutes
    })(request, {});

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { success: false, error: rateLimitResult.error },
        { status: 429 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder =
      (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc';

    // Get products
    let products = await ProductService.getAllProducts();

    // Apply filters
    if (category) {
      products = await ProductService.getProductsByCategory(category);
    }

    if (search) {
      products = await ProductService.searchProducts(search);
    }

    // Apply sorting
    products.sort((a, b) => {
      const aValue = a[sortBy as keyof Product];
      const bValue = b[sortBy as keyof Product];

      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;

      // Handle different types for comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortOrder === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      // Fallback for other types - convert to string
      const aStr = String(aValue);
      const bStr = String(bValue);
      return sortOrder === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    // Apply pagination
    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const offset = (page - 1) * limit;
    const paginatedProducts = products.slice(offset, offset + limit);

    const response: ApiResponse<Product[]> = {
      success: true,
      data: paginatedProducts,
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(request: NextRequest) {
  try {
    const context: MiddlewareContext = {};

    // Apply auth middleware (admin only)
    const authResult = await validateAuth(request, context);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (authResult.context?.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Validate request body
    const validationResult = await validateRequest([
      { field: 'name', required: true, type: 'string', minLength: 1 },
      { field: 'description', required: true, type: 'string', minLength: 1 },
      { field: 'price', required: true, type: 'number' },
      { field: 'category', required: true, type: 'string' },
      { field: 'brand', required: true, type: 'string' },
      { field: 'stockQuantity', required: true, type: 'number' },
      { field: 'sku', required: true, type: 'string' },
    ])(request, context);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: validationResult.error },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Create product
    const product = await ProductService.createProduct({
      ...body,
      inStock: body.stockQuantity > 0,
      rating: 0,
      reviewCount: 0,
      isActive: true,
      images: body.images || [],
      tags: body.tags || [],
    });

    const response: ApiResponse<Product> = {
      success: true,
      data: product,
      message: 'Product created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/products (bulk update - admin only)
export async function PUT(request: NextRequest) {
  try {
    const context: MiddlewareContext = {};

    // Apply auth middleware (admin only)
    const authResult = await validateAuth(request, context);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: 401 }
      );
    }

    if (authResult.context?.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { productIds, updates } = body;

    if (!Array.isArray(productIds) || !updates) {
      return NextResponse.json(
        { success: false, error: 'Invalid request format' },
        { status: 400 }
      );
    }

    const updatedProducts: Product[] = [];

    for (const productId of productIds) {
      const updated = await ProductService.updateProduct(productId, updates);
      if (updated) {
        updatedProducts.push(updated);
      }
    }

    const response: ApiResponse<Product[]> = {
      success: true,
      data: updatedProducts,
      message: `Updated ${updatedProducts.length} products`,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('PUT /api/products error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
