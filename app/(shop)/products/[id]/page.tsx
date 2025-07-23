import ProductCardMixed from '@/components/server-components/product-card-mixed';

interface ProductDetailPageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <div className="container mx-auto p-4">
      <ProductCardMixed productId={params.id} />
    </div>
  );
}
