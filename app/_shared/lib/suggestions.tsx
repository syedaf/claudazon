;
// lib/suggestions.tsx
import { categories } from 'app/_shared/lib/data/categories';
import { products } from 'app/_shared/lib/data/products';


export class SuggestionEngine {
  static async getProductSuggestions(failedId?: string) {
    // In production, use AI/ML for smart suggestions
    // For now, return featured products
    return products.slice(0, 4);
  }

  static async getCategorySuggestions(failedSlug?: string) {
    // Return popular categories
    return categories.slice(0, 3);
  }

  static async getSearchSuggestions(failedQuery?: string) {
    // Return popular search terms
    return [
      'iPhone',
      'Laptop',
      'Headphones',
      'Kitchen Appliances',
      'Smart TV',
      'Gaming Console',
    ];
  }

  static extractIdFromPath(path: string): string | null {
    const match = path.match(/\/products\/([^\/]+)/);
    return match ? match[1] : null;
  }

  static extractCategoryFromPath(path: string): string | null {
    const match = path.match(/\/categories\/([^\/]+)/);
    return match ? match[1] : null;
  }
}
