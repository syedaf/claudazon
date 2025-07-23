;
// ✅ Server-only utilities
import { headers } from 'next/headers';


// ✅ Server-side authentication check - FIXED
export async function getServerUser() {
  const headersList = await headers(); // ← FIXED: Added await
  const authorization = headersList.get('authorization');

  if (!authorization) {
    return null;
  }

  // Mock user validation - replace with real auth
  return {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
  };
}


// ✅ Server-side data fetching with caching
export async function fetchProductsServer(category?: string) {
  const url = category
    ? `${process.env.API_BASE_URL}/products?category=${category}`
    : `${process.env.API_BASE_URL}/products`;

  const response = await fetch(url, {
    // ✅ Server-side caching
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
}


// ✅ Server-side analytics - FIXED: No explicit any
export function trackServerEvent(event: string, data?: Record<string, unknown>) {
  console.log(`[SERVER] ${event}:`, data);
  // In real app, send to analytics service
}