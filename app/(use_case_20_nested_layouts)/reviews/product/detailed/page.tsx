import { KeywordAnalysis } from './_components/keyword-analysis';
import { SentimentChart } from './_components/sentiment-chart';

export default function DetailedAnalysisPage() {
  return (
    <div className="space-y-8">
      {/* Analysis Overview */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Advanced Review Analytics
        </h2>
        <p className="text-slate-600">
          AI-powered insights and sentiment analysis for Wireless Headphones Pro
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">92%</div>
          <div className="text-sm text-blue-700">Positive Sentiment</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">4.6</div>
          <div className="text-sm text-green-700">Sentiment Score</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">87%</div>
          <div className="text-sm text-purple-700">Recommend Rate</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-600">156</div>
          <div className="text-sm text-orange-700">Key Themes</div>
        </div>
      </div>

      {/* Analysis Components */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Sentiment Analysis */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Sentiment Over Time
          </h3>
          <SentimentChart />
        </div>

        {/* Keyword Analysis */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Keyword Analysis
          </h3>
          <KeywordAnalysis />
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          AI-Generated Insights
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">
              🎯 Top Positive Theme: Sound Quality
            </h4>
            <p className="text-green-700 text-sm">
              Users consistently praise the audio quality, with 89% of positive
              reviews mentioning "crystal clear", "excellent sound", or "amazing
              audio".
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">
              📈 Trending Positive: Battery Life
            </h4>
            <p className="text-blue-700 text-sm">
              Battery performance mentions have increased 34% this month, with
              average satisfaction rating of 4.7/5.
            </p>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-medium text-yellow-800 mb-2">
              ⚠️ Area for Improvement: Case Design
            </h4>
            <p className="text-yellow-700 text-sm">
              12% of reviews mention case quality concerns. Consider
              highlighting case improvements in product updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
