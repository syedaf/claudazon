// app/_shared/lib/business-rules/index.ts
export class BusinessRules {
  // Add return type annotation
  static calculateDiscount(price: number, userTier: string): number {
    // Simple discount logic based on user tier
    switch (userTier) {
      case 'premium':
        return price * 0.9; // 10% discount
      case 'gold':
        return price * 0.95; // 5% discount
      case 'admin':
        return price; // No discount for admin view
      default:
        return price;
    }
  }

  // Add return type annotation
  static checkAvailability(productId: string, quantity: number): boolean {
    // Simple availability check - in real app, check database
    return quantity > 0 && quantity <= 100; // Max 100 per order
  }
}
