;
// ✅ Server Component that composes Client Components

import AddToCartClient from '@/components/client-components/add-to-cart-client';


interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

interface ProductCardProps {
  productId: string;
}

// ✅ Server Component - fetches data on server
export default async function ProductCardMixed({
  productId,
}: ProductCardProps) {
  // ✅ Server-side data fetching
  const product = await fetchProductById(productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="border rounded-lg p-4 max-w-sm">
      {/* ✅ Server-rendered static content */}
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover mb-2"
      />

      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="text-2xl font-bold text-green-600">${product.price}</p>

      {/* ✅ Stock status rendered on server */}
      {product.inStock ? (
        <p className="text-green-500 text-sm">✅ In Stock</p>
      ) : (
        <p className="text-red-500 text-sm">❌ Out of Stock</p>
      )}

      {/* ✅ Client Component for interactivity */}
      {product.inStock && (
        <AddToCartClient
          productId={product.id}
          productName={product.name}
          price={product.price}
        />
      )}
    </div>
  );
}

// ✅ Server-side data fetching function - FIXED WITH MORE PRODUCTS
// Update the fetchProductById function with working images:
async function fetchProductById(id: string): Promise<Product | null> {
  const products: Product[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 199.99,
      image: 'https://picsum.photos/300/200?random=1',
      description: 'High-quality wireless headphones',
      inStock: true,
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      image: 'https://picsum.photos/300/200?random=2',
      description: 'Advanced fitness tracking',
      inStock: false,
    },
    {
      id: '3',
      name: 'Premium Smartphone Pro',
      price: 899.99,
      image: 'https://picsum.photos/300/200?random=3',
      description: 'Latest flagship smartphone',
      inStock: true,
    },
    {
      id: '4',
      name: 'Bluetooth Speaker',
      price: 149.99,
      image: 'https://picsum.photos/300/200?random=4',
      description: 'Portable wireless speaker',
      inStock: true,
    },
    {
      id: '5',
      name: 'Gaming Laptop',
      price: 1299.99,
      image: 'https://picsum.photos/300/200?random=5',
      description: 'High-performance gaming laptop',
      inStock: false,
    },
  ];

  return products.find(p => p.id === id) || null;
}
