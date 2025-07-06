;
/* app/(admin)/analytics/page.tsx */
import { AnalyticsDashboard } from '@components/analytics/analytics-dashboard';


export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600">
          View analytics data collected by template routes
        </p>
      </div>

      <AnalyticsDashboard />
    </div>
  );
}
