import { ProductSpecs } from '@/(shop)/products/_components/detail';

interface SpecsSlotProps {
  params: Promise<{ id: string }>; // ✅ Updated to Promise
}

export default async function SpecsSlot({ params }: SpecsSlotProps) {
  const { id } = await params; // ✅ Added await

  return (
    <div className="py-6">
      <ProductSpecs productId={id} />

      {/* Additional Specs Content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">Technical Details</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Item Weight</span>
              <span className="text-gray-900">1.2 pounds</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Product Dimensions</span>
              <span className="text-gray-900">10 x 8 x 2 inches</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Item model number</span>
              <span className="text-gray-900">PT-{id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Batteries Required?</span>
              <span className="text-gray-900">No</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="font-medium text-gray-900 mb-4">
            Additional Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">ASIN</span>
              <span className="text-gray-900">B0{id.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer Reviews</span>
              <span className="text-gray-900">4.2 out of 5 stars</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Best Sellers Rank</span>
              <span className="text-gray-900">#1,247 in Electronics</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date First Available</span>
              <span className="text-gray-900">January 15, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
