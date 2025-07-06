/* components/analytics/analytics-dashboard.tsx */
'use client';

import { useEffect, useState } from 'react';
import { analytics, AnalyticsEvent } from '@lib/analytics';

export function AnalyticsDashboard() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);

  useEffect(() => {
    /* Get analytics data */
    const analyticsData = analytics.getEvents();
    setEvents(analyticsData);
  }, []);

  const eventTypes = [...new Set(events.map(e => e.event))];
  const pageViews = events.filter(e => e.event.includes('page_view'));
  const adminEvents = events.filter(e => e.event.includes('admin'));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Total Events</h3>
          <p className="text-3xl font-bold text-blue-600">{events.length}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Page Views</h3>
          <p className="text-3xl font-bold text-green-600">
            {pageViews.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Admin Events</h3>
          <p className="text-3xl font-bold text-orange-600">
            {adminEvents.length}
          </p>
        </div>
      </div>

      {/* Event Types */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Event Types
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {eventTypes.map(type => (
            <div key={type} className="bg-gray-100 px-3 py-2 rounded text-sm">
              {type}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Events
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Event</th>
                <th className="text-left py-2">Page</th>
                <th className="text-left py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {events
                .slice(-10)
                .reverse()
                .map((event, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-2 text-sm">{event.event}</td>
                    <td className="py-2 text-sm">{event.page}</td>
                    <td className="py-2 text-sm">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
