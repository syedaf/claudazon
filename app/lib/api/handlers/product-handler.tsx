import { products } from '@/lib/data/products.json';
import {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from '@/lib/types/product-types';

// In-memory storage for demo
const productData: Product[] = [...products];

export class ProductHandler {
  static async getAllProducts(page: number = 1, limit: number = 20) {
    const start = (page - 1) * limit;
    return {
      products: productData.slice(start, start + limit),
      total: productData.length,
    };
  }

  static async getProductById(id: string): Promise<Product | null> {
    return productData.find(p => p.id === id) || null;
  }

  static async createProduct(data: CreateProductRequest): Promise<Product> {
    const newProduct: Product = {
      id: `prod_${Date.now()}`,
      ...data,
      rating: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    productData.push(newProduct);
    return newProduct;
  }

  static async updateProduct(
    id: string,
    data: UpdateProductRequest
  ): Promise<Product | null> {
    const index = productData.findIndex(p => p.id === id);
    if (index === -1) return null;

    productData[index] = {
      ...productData[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return productData[index];
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const index = productData.findIndex(p => p.id === id);
    if (index === -1) return false;

    productData.splice(index, 1);
    return true;
  }
}
