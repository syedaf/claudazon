import { ProductReviews } from '@/(shop)/products/_components/detail';

interface ReviewsSlotProps {
  params: { id: string };
}

export default function ReviewsSlot({ params }: ReviewsSlotProps) {
  return (
    <div className="py-6">
      <ProductReviews productId={params.id} />
    </div>
  );
}
