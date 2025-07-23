'use client'; // ✅ Client-only utilities

// ✅ Cart item type definition - FIXED: Interface defined
interface CartItem {
  productId: string;
  quantity: number;
}

// ✅ Client-side local storage - FIXED: No explicit any
export function saveToLocalStorage(key: string, value: unknown) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getFromLocalStorage(key: string): unknown {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
}

// ✅ Client-side cart management - FIXED: Proper typing
export function addToCart(productId: string, quantity: number = 1) {
  const cartData = getFromLocalStorage('cart') as CartItem[] | null;
  const cart: CartItem[] = cartData || [];
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  saveToLocalStorage('cart', cart);

  // ✅ Trigger custom event for cart updates
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
}

// ✅ Client-side analytics - FIXED: No explicit any
export function trackClientEvent(
  event: string,
  data?: Record<string, unknown>
) {
  console.log(`[CLIENT] ${event}:`, data);
  // In real app, send to Google Analytics, etc.
}
