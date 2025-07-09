// lib/types.ts - Updated with proper relationships
export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string; // Display name (for UI)
  categoryId: string; // ID for filtering (URL-safe)
  isPrime: boolean;
  description?: string;
}

export interface Category {
  id: string; // URL-safe identifier
  name: string; // Display name
  slug: string; // Explicit URL slug (could be same as ID)
  description: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
}
