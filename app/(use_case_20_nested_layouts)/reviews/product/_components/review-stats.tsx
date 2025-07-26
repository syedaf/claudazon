export function ReviewStats() {
  const ratingBreakdown = [
    { stars: 5, count: 847, percentage: 68 },
    { stars: 4, count: 289, percentage: 23 },
    { stars: 3, count: 87, percentage: 7 },
    { stars: 2, count: 18, percentage: 1 },
    { stars: 1, count: 6, percentage: 1 },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Review Statistics
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Rating Breakdown */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Rating Breakdown</h4>
          <div className="space-y-2">
            {ratingBreakdown.map(rating => (
              <div key={rating.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm text-slate-600">{rating.stars}</span>
                  <svg
                    className="w-3 h-3 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${rating.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-slate-600 w-12">
                  {rating.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Quick Stats</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Average Rating:</span>
              <span className="font-medium">4.5 / 5</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Total Reviews:</span>
              <span className="font-medium">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Verified Purchases:</span>
              <span className="font-medium">89%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Response Rate:</span>
              <span className="font-medium">76%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
