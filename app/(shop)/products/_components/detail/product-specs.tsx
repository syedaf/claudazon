// app/(shop)/products/_components/detail/product-specs.tsx
'use client';

interface ProductSpecsProps {
  productId: string;
}

interface ProductSpec {
  label: string;
  value: string;
}

export function ProductSpecs({ productId }: ProductSpecsProps) {
  // In a real app, fetch specs based on productId
  const specs: ProductSpec[] = [
    { label: 'Brand', value: 'Premium Tech' },
    { label: 'Model', value: `PT-${productId}` },
    { label: 'Weight', value: '1.2 lbs' },
    { label: 'Dimensions', value: '10" x 8" x 2"' },
    { label: 'Color', value: 'Space Gray' },
    { label: 'Material', value: 'Aluminum' },
    { label: 'Warranty', value: '1 Year Limited' },
    { label: 'Country of Origin', value: 'Designed in California' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Product Specifications
      </h3>

      <div className="space-y-3">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
          >
            <span className="text-gray-600 font-medium">{spec.label}:</span>
            <span className="text-gray-900">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
