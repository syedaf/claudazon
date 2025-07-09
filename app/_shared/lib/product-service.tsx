;
// Create this file: app/_shared/lib/product-service.ts

import { Product } from '@/_shared/types/api';


// Mock product data for development
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 99.99,
    category: 'Electronics',
    brand: 'TechPro',
    images: ['/products/headphones-1.jpg', '/products/headphones-2.jpg'],
    inStock: true,
    stockQuantity: 25,
    sku: 'WBH-001',
    tags: ['wireless', 'bluetooth', 'noise-canceling'],
    rating: 4.5,
    reviewCount: 128,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-03-01'),
    isActive: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 299.99,
    category: 'Wearables',
    brand: 'FitTech',
    images: ['/products/watch-1.jpg', '/products/watch-2.jpg'],
    inStock: true,
    stockQuantity: 15,
    sku: 'SFW-002',
    tags: ['fitness', 'smartwatch', 'gps', 'health'],
    rating: 4.8,
    reviewCount: 89,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-03-05'),
    isActive: true,
  },
  {
    id: '3',
    name: 'USB-C Charging Hub',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and fast charging',
    price: 79.99,
    category: 'Accessories',
    brand: 'ConnectPro',
    images: ['/products/hub-1.jpg'],
    inStock: true,
    stockQuantity: 40,
    sku: 'UCH-003',
    tags: ['usb-c', 'hub', 'charging', 'hdmi'],
    rating: 4.3,
    reviewCount: 67,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-28'),
    isActive: true,
  },
];

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    // In production, this would query a database
    return mockProducts.filter(product => product.isActive);
  }

  static async getProductById(id: string): Promise<Product | null> {
    const product = mockProducts.find(p => p.id === id && p.isActive);
    return product || null;
  }

  static async createProduct(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Product> {
    const newProduct: Product = {
      ...productData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockProducts.push(newProduct);
    return newProduct;
  }

  static async updateProduct(
    id: string,
    updates: Partial<Product>
  ): Promise<Product | null> {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProduct = {
      ...mockProducts[index],
      ...updates,
      updatedAt: new Date(),
    };

    mockProducts[index] = updatedProduct;
    return updatedProduct;
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index === -1) return false;

    // Soft delete - mark as inactive
    mockProducts[index].isActive = false;
    mockProducts[index].updatedAt = new Date();
    return true;
  }

  static async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return mockProducts.filter(
      product =>
        product.isActive &&
        (product.name.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.category.toLowerCase().includes(lowercaseQuery) ||
          product.brand.toLowerCase().includes(lowercaseQuery) ||
          product.tags.some((tag: string) =>
            tag.toLowerCase().includes(lowercaseQuery)
          ))
    );
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    return mockProducts.filter(
      product =>
        product.isActive &&
        product.category.toLowerCase() === category.toLowerCase()
    );
  }

  static async updateStock(
    id: string,
    quantity: number
  ): Promise<Product | null> {
    const product = await this.getProductById(id);
    if (!product) return null;

    return this.updateProduct(id, {
      stockQuantity: quantity,
      inStock: quantity > 0,
    });
  }
}
