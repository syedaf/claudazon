;
// lib/data/products.ts
// lib/data/products.ts
import { Product } from '@lib/types';


export const products: Product[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max - 256GB',
    price: 1199.99,
    originalPrice: 1299.99,
    rating: 4.7,
    reviewCount: 1284,
    imageUrl:
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    category: 'Electronics',
    categoryId: 'electronics',
    isPrime: true,
    description:
      'The most advanced iPhone yet with titanium design, A17 Pro chip, and professional camera system featuring 5x telephoto zoom.',
  },
  {
    id: '2',
    title: 'Sony WH-1000XM5 Headphones',
    price: 349.99,
    originalPrice: 399.99,
    rating: 4.6,
    reviewCount: 892,
    imageUrl:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop',
    category: 'Electronics',
    categoryId: 'electronics',
    isPrime: true,
    description:
      'Industry-leading noise canceling headphones with exceptional sound quality, 30-hour battery life, and premium comfort.',
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
    categoryId: 'home-kitchen',
    isPrime: true,
    description:
      'Professional-grade stand mixer with 5-quart capacity, 10 speeds, and durable all-metal construction. Perfect for baking enthusiasts.',
  },
  {
    id: '4',
    title: 'MacBook Pro 14" M3 Pro',
    price: 1999.99,
    originalPrice: 2199.99,
    rating: 4.9,
    reviewCount: 743,
    imageUrl:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    category: 'Electronics',
    categoryId: 'electronics',
    isPrime: true,
    description:
      'Supercharged for pros with M3 Pro chip, up to 18 hours of battery life, and stunning Liquid Retina XDR display.',
  },
  {
    id: '5',
    title: 'Ninja Foodi Air Fryer Oven',
    price: 199.99,
    rating: 4.5,
    reviewCount: 1156,
    imageUrl:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    category: 'Home & Kitchen',
    categoryId: 'home-kitchen',
    isPrime: true,
    description:
      '8-in-1 countertop convection oven that air fries, bakes, roasts, and more. Large capacity fits a 13" pizza or 9 slices of toast.',
  },
  {
    id: '6',
    title: 'Samsung 65" QLED 4K TV',
    price: 1299.99,
    originalPrice: 1599.99,
    rating: 4.4,
    reviewCount: 892,
    imageUrl:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    category: 'Electronics',
    categoryId: 'electronics',
    isPrime: true,
    description:
      'Quantum Dot technology delivers 100% Color Volume for brilliant colors and exceptional detail in 4K resolution.',
  },
];
