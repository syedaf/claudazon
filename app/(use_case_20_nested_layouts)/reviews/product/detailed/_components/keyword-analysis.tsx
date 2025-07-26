export function KeywordAnalysis() {
  const keywords = [
    { word: 'sound quality', mentions: 456, sentiment: 'positive' },
    { word: 'battery life', mentions: 342, sentiment: 'positive' },
    { word: 'comfortable', mentions: 289, sentiment: 'positive' },
    { word: 'noise cancellation', mentions: 267, sentiment: 'positive' },
    { word: 'value for money', mentions: 198, sentiment: 'positive' },
    { word: 'case design', mentions: 87, sentiment: 'negative' },
    { word: 'bluetooth connection', mentions: 76, sentiment: 'neutral' },
    { word: 'build quality', mentions: 65, sentiment: 'positive' },
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'negative':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'neutral':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-4">
      {/* Keywords List */}
      <div className="space-y-2">
        {keywords.map((keyword, index) => (
          <div
            key={keyword.word}
            className="flex items-center justify-between p-3 rounded-lg border border-slate-200"
          >
            <div className="flex items-center space-x-3">
              <div className="text-sm font-medium text-slate-900">
                #{index + 1}
              </div>
              <div>
                <div className="font-medium text-gray-900">{keyword.word}</div>
                <div className="text-sm text-slate-600">
                  {keyword.mentions} mentions
                </div>
              </div>
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getSentimentColor(keyword.sentiment)}`}
            >
              {keyword.sentiment}
            </div>
          </div>
        ))}
      </div>

      {/* Key Insights */}
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <h5 className="font-medium text-blue-900 mb-2">Key Insights</h5>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• "Sound quality" is the most mentioned positive attribute</li>
          <li>
            • "Case design" needs attention - only negative keyword in top 8
          </li>
          <li>• Battery-related keywords show strong positive sentiment</li>
        </ul>
      </div>
    </div>
  );
}
