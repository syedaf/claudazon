import ProductCardMixed from '@/components/server-components/product-card-mixed';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto p-4">
      <ProductCardMixed productId={id} />
    </div>
  );
}
