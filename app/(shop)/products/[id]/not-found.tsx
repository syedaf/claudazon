;
// app/(shop)/products/[id]/not-found.tsx (15 lines)
import { ArrowLeft, Search, ShoppingBag } from 'lucide-react';


export default function ProductNotFound() {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="text-center space-y-6">
        <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto" />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            {`This product may have been removed or doesn't exist.`}
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <a
            href="/products"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </a>
          <a
            href="/search"
            className="bg-gray-100 text-gray-900 px-4 py-2 rounded-md hover:bg-gray-200 flex items-center"
          >
            <Search className="h-4 w-4 mr-2" />
            Search Products
          </a>
        </div>
      </div>
    </div>
  );
}
