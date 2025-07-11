import { ProductGallery } from '@/(shop)/products/_components/detail';

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Product Gallery */}
      <div>
        <ProductGallery productId={params.id} />
      </div>

      {/* Right: Basic Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Premium Product {params.id}
          </h1>
          <div className="flex items-center space-x-2 mb-4">
            <div className="flex text-yellow-400">
              {'★'.repeat(4)}
              {'☆'.repeat(1)}
            </div>
            <span className="text-sm text-gray-600">(247 reviews)</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-4">$299.99</p>
          <p className="text-gray-700 mb-6">
            Experience premium quality with this carefully crafted product.
            Perfect for everyday use with exceptional durability and style.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <button className="w-full bg-[#ff9900] text-black font-medium py-3 px-6 rounded-lg hover:bg-[#e88900] transition-colors">
            Add to Cart
          </button>
          <button className="w-full border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
            Add to Wishlist
          </button>
        </div>

        {/* Basic Specs Preview */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-medium text-gray-900 mb-3">Key Features</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Premium materials and construction</li>
            <li>• 1-year manufacturer warranty</li>
            <li>• Free shipping on orders over $25</li>
            <li>• 30-day return policy</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
