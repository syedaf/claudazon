;
// app/(shop)/products/[id]/not-found.tsx (enhanced existing)
import { Metadata } from 'next';
import { ShoppingBag } from 'lucide-react';
import { NotFoundLayout } from '@/_shared/components/error/not-found-layout';
import { SuggestedProducts } from '@/_shared/components/error/suggested-products';
import { generateNotFoundMetadata } from '@/_shared/lib/not-found-utils';
import { SuggestionEngine } from '@/_shared/lib/suggestions';


export const metadata: Metadata = generateNotFoundMetadata(
  'product',
  'Product Not Found - Claudazon'
);

export default async function ProductNotFound() {
  const suggestedProducts = await SuggestionEngine.getProductSuggestions();

  return (
    <NotFoundLayout
      icon={<ShoppingBag className="h-12 w-12 text-gray-400" />}
      title="Product Not Found"
      description="This product may have been removed or doesn't exist."
      section="products"
      suggestions={
        <SuggestedProducts
          products={suggestedProducts}
          title="Similar products you might like"
        />
      }
    />
  );
}
