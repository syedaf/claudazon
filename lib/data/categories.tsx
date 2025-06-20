import { Category } from '@/lib/types';

export const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Cutting-edge technology and electronic devices',
    subcategories: [
      {
        id: 'smartphones',
        name: 'Smartphones',
        slug: 'smartphones',
        description: 'Latest smartphones and mobile devices',
        productCount: 156,
      },
      {
        id: 'laptops',
        name: 'Laptops',
        slug: 'laptops',
        description: 'Powerful laptops for work and gaming',
        productCount: 89,
      },
      {
        id: 'headphones',
        name: 'Headphones',
        slug: 'headphones',
        description: 'Premium audio equipment and accessories',
        productCount: 234,
      },
    ],
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Everything for your home and kitchen needs',
    subcategories: [
      {
        id: 'appliances',
        name: 'Appliances',
        slug: 'appliances',
        description: 'Kitchen and home appliances',
        productCount: 78,
      },
      {
        id: 'furniture',
        name: 'Furniture',
        slug: 'furniture',
        description: 'Stylish furniture for every room',
        productCount: 145,
      },
      {
        id: 'cookware',
        name: 'Cookware',
        slug: 'cookware',
        description: 'Professional cookware and kitchen tools',
        productCount: 67,
      },
    ],
  },
];
