export default function ProductReviewsPage() {
  const mockReviews = [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: '2 days ago',
      title: 'Excellent sound quality!',
      content:
        'These headphones exceeded my expectations. The noise cancellation is fantastic and the battery life is amazing.',
      helpful: 23,
      verified: true,
    },
    {
      id: 2,
      author: 'Mike D.',
      rating: 4,
      date: '1 week ago',
      title: 'Great value for money',
      content:
        'Good headphones for the price. Comfortable to wear for long periods. Only minor complaint is the case could be better.',
      helpful: 15,
      verified: true,
    },
    {
      id: 3,
      author: 'Jennifer K.',
      rating: 5,
      date: '2 weeks ago',
      title: 'Perfect for work from home',
      content:
        'Crystal clear audio for video calls. The microphone quality is excellent and colleagues say I sound much clearer.',
      helpful: 31,
      verified: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Product Reviews Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Product Reviews Analysis
        </h2>
        <p className="text-slate-600">
          Detailed review insights for Wireless Headphones Pro
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
            Sort by Recent
          </button>
          <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-300">
            Filter by Rating
          </button>
        </div>
        <a
          href="/reviews/product/detailed"
          className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700"
        >
          Detailed Analysis →
        </a>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {mockReviews.map(review => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-lg border border-slate-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-gray-900">{review.author}</h4>
                  {review.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
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
                  <span className="text-sm text-slate-500">{review.date}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="font-medium text-gray-900">{review.title}</h5>
              <p className="text-slate-600">{review.content}</p>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <button className="text-sm text-slate-600 hover:text-slate-900">
                  👍 Helpful ({review.helpful})
                </button>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
