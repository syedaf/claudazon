'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function ProductListClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate slow API call
    const fetchProducts = async () => {
      setLoading(true);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay

      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Wireless Headphones',
          price: 199.99,
          image: 'https://picsum.photos/300/200?random=1',
        },
        {
          id: '2',
          name: 'Smart Watch',
          price: 299.99,
          image: 'https://picsum.photos/300/200?random=2',
        },
        {
          id: '3',
          name: 'Premium Smartphone Pro',
          price: 899.99,
          image: 'https://picsum.photos/300/200?random=3',
        },
        {
          id: '4',
          name: 'Bluetooth Speaker',
          price: 149.99,
          image: 'https://picsum.photos/300/200?random=4',
        },
        {
          id: '5',
          name: 'Gaming Laptop',
          price: 1299.99,
          image: 'https://picsum.photos/300/200?random=5',
        },
      ];

      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Featured Products (Client-Side)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 mb-2"></div>
              <div className="h-4 bg-gray-200 mb-2"></div>
              <div className="h-4 bg-gray-200 w-1/2"></div>
            </div>
          ))}
        </div>
        <p className="text-center mt-4 text-blue-500">
          ⏳ Loading products (Client-Side)...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <h2 className="col-span-full text-2xl font-bold mb-4">
        Featured Products (Client-Side)
      </h2>
      {products.map(product => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <div className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-2"
            />
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-green-600 font-bold">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
