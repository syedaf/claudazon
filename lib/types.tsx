export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number; // Add this optional property
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: string;
  isPrime: boolean;
  description?: string; // Add this optional property
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
