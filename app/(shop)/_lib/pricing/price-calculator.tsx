;
// app/(shop)/_lib/pricing/price-calculator.ts
import { BusinessRules } from '@/_shared/lib/business-rules';
import { products } from '@/_shared/lib/data/products';


export class PriceCalculator {
  static getDisplayPrice(productId: string, userTier: string): number {
    const basePrice = this.getBasePrice(productId);
    return BusinessRules.calculateDiscount(basePrice, userTier);
  }

  // Add the missing getBasePrice method
  static getBasePrice(productId: string): number {
    const product = products.find(p => p.id === productId);
    return product?.price || 0;
  }
}
