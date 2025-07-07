;
// app/(shop)/products/not-found.tsx
import { Metadata } from 'next';
import { Package } from 'lucide-react';
import { NotFoundLayout } from '@components/error/not-found-layout';
import { SuggestedProducts } from '@components/error/suggested-products';
import { generateNotFoundMetadata } from '@lib/not-found-utils';
import { SuggestionEngine } from '@lib/suggestions';


export const metadata: Metadata = generateNotFoundMetadata(
  'products',
  'Product Not Found - Claudazon'
);

export default async function ProductsNotFound() {
  const suggestedProducts = await SuggestionEngine.getProductSuggestions();

  return (
    <NotFoundLayout
      icon={<Package className="h-12 w-12 text-gray-400" />}
      title="Product Not Found"
      description="The product you're looking for is not available. It may have been removed or is out of stock."
      section="products"
      suggestions={
        <SuggestedProducts
          products={suggestedProducts}
          title="Popular products you might like"
        />
      }
    />
  );
}
