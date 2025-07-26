export function ProductSummary() {
  return (
    <div className="flex items-center space-x-4">
      {/* Product Image */}
      <div className="w-16 h-16 bg-slate-200 rounded-lg flex items-center justify-center">
        <svg
          className="w-8 h-8 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">Wireless Headphones Pro</h3>
        <p className="text-sm text-slate-600">SKU: WHP-2024-001</p>
        <div className="flex items-center space-x-4 mt-1">
          <span className="text-sm text-slate-600">$299.99</span>
          <span className="text-sm text-green-600">In Stock</span>
          <span className="text-sm text-slate-600">1,247 Reviews</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-2">
        <button className="bg-slate-200 text-slate-700 px-3 py-1 rounded-md text-sm hover:bg-slate-300">
          Edit Product
        </button>
        <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700">
          View Live
        </button>
      </div>
    </div>
  );
}
