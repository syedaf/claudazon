;
// lib/data/products.ts
import { Product } from '@/lib/types';


export const products: Product[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max - 256GB',
    price: 1199.99,
    rating: 4.7,
    reviewCount: 1284,
    imageUrl:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    category: 'Electronics',
    isPrime: true,
  },
  {
    id: '2',
    title: 'Sony WH-1000XM5 Headphones',
    price: 349.99,
    rating: 4.6,
    reviewCount: 892,
    imageUrl:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
    category: 'Electronics',
    isPrime: true,
  },
  {
    id: '3',
    title: 'KitchenAid Stand Mixer',
    price: 429.99,
    rating: 4.8,
    reviewCount: 567,
    imageUrl:
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop',
    category: 'Home & Kitchen',
    isPrime: true,
  },
];
