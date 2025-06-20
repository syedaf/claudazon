// lib/types.ts
export interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  isPrime: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
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
