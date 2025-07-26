export default function ReviewsPage() {
  const mockReviews = [
    { id: 1, product: 'Wireless Headphones', rating: 4.5, count: 1247 },
    { id: 2, product: 'Smart Watch', rating: 4.2, count: 892 },
    { id: 3, product: 'Bluetooth Speaker', rating: 4.7, count: 2156 },
    { id: 4, product: 'Phone Case', rating: 4.1, count: 567 },
  ];

  return (
    <div className="space-y-6">
      {/* Reviews Overview Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Reviews Overview</h2>
        <p className="text-slate-600">
          Browse all product reviews and manage review responses
        </p>
      </div>

      {/* Reviews Summary */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">4,862</div>
          <div className="text-sm text-blue-700">Total Reviews</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">4.4</div>
          <div className="text-sm text-green-700">Average Rating</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">127</div>
          <div className="text-sm text-yellow-700">Pending Response</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">89%</div>
          <div className="text-sm text-purple-700">Positive Sentiment</div>
        </div>
      </div>

      {/* Product Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Product Reviews</h3>
        <div className="space-y-3">
          {mockReviews.map(review => (
            <div
              key={review.id}
              className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">
                    {review.product}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(review.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">
                      {review.rating} ({review.count} reviews)
                    </span>
                  </div>
                </div>
                <a
                  href="/reviews/product"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
