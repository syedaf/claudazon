'use client';

// ✅ Client Component directive
import { useState } from 'react';

interface AddToCartProps {
  productId: string;
  productName: string;
  price: number;
}

// ✅ Client Component - runs in browser, can use hooks and events
export default function AddToCartClient({
  productId,
  productName,
  price,
}: AddToCartProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // ✅ Can use event handlers in Client Components
  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      // ✅ Can make API calls from Client Components
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (response.ok) {
        setCartCount(prev => prev + 1);
        // ✅ Can show client-side notifications
        alert(`${productName} added to cart!`);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className="bg-amazon-orange text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
      >
        {isAdding ? 'Adding...' : `Add to Cart - $${price}`}
      </button>

      {cartCount > 0 && (
        <p className="text-green-600 text-sm">✅ {cartCount} item(s) in cart</p>
      )}
    </div>
  );
}
