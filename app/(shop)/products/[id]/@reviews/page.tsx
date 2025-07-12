import { ProductReviews } from '@/(shop)/products/_components/detail';

interface ReviewsSlotProps {
  params: Promise<{ id: string }>; // ✅ Updated to Promise
}

export default async function ReviewsSlot({ params }: ReviewsSlotProps) {
  const { id } = await params; // ✅ Added await

  return (
    <div className="py-6">
      <ProductReviews productId={id} />
    </div>
  );
}
