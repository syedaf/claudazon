;
// ✅ Server Component - runs on server, can fetch data

import Link from 'next/link';


interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

// This is a Server Component (no 'use client' directive)
export default async function ProductListServer() {
  // ✅ Can fetch data directly in Server Components
  const products = await fetchProducts();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <h2 className="col-span-full text-2xl font-bold mb-4">
        Featured Products
      </h2>
      {products.map(product => (
        <Link key={product.id} href={`/products/${product.id}`}>
          {' '}
          {/* ← Add Link wrapper */}
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

  // ✅ Server-side data fetching
  async function fetchProducts(): Promise<Product[]> {
    return [
      {
        id: '1',
        name: 'Wireless Headphones',
        price: 199.99,
        image: 'https://picsum.photos/300/200?random=1', // ← Fixed
      },
      {
        id: '2',
        name: 'Smart Watch',
        price: 299.99,
        image: 'https://picsum.photos/300/200?random=2', // ← Fixed
      },
      {
        id: '3',
        name: 'Premium Smartphone Pro',
        price: 899.99,
        image: 'https://picsum.photos/300/200?random=3', // ← Fixed
      },
      {
        id: '4',
        name: 'Bluetooth Speaker',
        price: 149.99,
        image: 'https://picsum.photos/300/200?random=4', // ← Fixed
      },
      {
        id: '5',
        name: 'Gaming Laptop',
        price: 1299.99,
        image: 'https://picsum.photos/300/200?random=5', // ← Fixed
      },
    ];
  }
}
