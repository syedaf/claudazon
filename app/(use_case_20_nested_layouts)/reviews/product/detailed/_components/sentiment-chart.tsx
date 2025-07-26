export function SentimentChart() {
  const sentimentData = [
    { month: 'Jan', positive: 85, neutral: 12, negative: 3 },
    { month: 'Feb', positive: 88, neutral: 9, negative: 3 },
    { month: 'Mar', positive: 92, neutral: 6, negative: 2 },
    { month: 'Apr', positive: 89, neutral: 8, negative: 3 },
    { month: 'May', positive: 94, neutral: 4, negative: 2 },
    { month: 'Jun', positive: 91, neutral: 7, negative: 2 },
  ];

  return (
    <div className="space-y-4">
      {/* Chart Header */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Positive</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Neutral</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Negative</span>
          </div>
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="space-y-3">
        {sentimentData.map(data => (
          <div key={data.month} className="flex items-center space-x-3">
            <div className="w-8 text-sm text-slate-600">{data.month}</div>
            <div className="flex-1 flex bg-slate-200 rounded-full h-6 overflow-hidden">
              <div
                className="bg-green-500 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${data.positive}%` }}
              >
                {data.positive > 15 && `${data.positive}%`}
              </div>
              <div
                className="bg-yellow-500 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${data.neutral}%` }}
              >
                {data.neutral > 8 && `${data.neutral}%`}
              </div>
              <div
                className="bg-red-500 flex items-center justify-center text-xs text-white font-medium"
                style={{ width: `${data.negative}%` }}
              >
                {data.negative > 5 && `${data.negative}%`}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trend Indicator */}
      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
        <div className="flex items-center space-x-2">
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
          <span className="text-sm text-green-700 font-medium">
            Positive sentiment trending up 6% this quarter
          </span>
        </div>
      </div>
    </div>
  );
}
