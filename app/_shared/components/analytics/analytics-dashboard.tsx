// Replace your analytics-dashboard.tsx with this:

'use client';

import { useEffect, useState } from 'react';


// Define types locally to avoid import issues
interface AnalyticsEvent {
  id: string;
  name: string;
  properties?: Record<string, string | number | boolean>;
  userId?: string;
  timestamp: number;
  page?: string;
  event: string;
}

interface AnalyticsDashboardData {
  totalEvents: number;
  uniqueUsers: number;
  pageViews: number;
  averageSessionDuration: number;
  topPages: Array<{
    page: string;
    views: number;
    uniqueUsers: number;
  }>;
  topEvents: Array<{
    name: string;
    count: number;
    percentage: number;
  }>;
  recentEvents: AnalyticsEvent[];
  timeSeriesData: Array<{
    timestamp: number;
    events: number;
    users: number;
  }>;
}

export function AnalyticsDashboard() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [dashboardData, setDashboardData] =
    useState<AnalyticsDashboardData | null>(null);

  useEffect(() => {
    // Get analytics data
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = () => {
    // Mock analytics data for demonstration
    const mockEvents: AnalyticsEvent[] = [
      {
        id: '1',
        name: 'page_view',
        event: 'navigation',
        page: '/dashboard',
        timestamp: Date.now() - 3600000,
        userId: 'user1',
        properties: { page: '/dashboard', source: 'direct' },
      },
      {
        id: '2',
        name: 'button_click',
        event: 'interaction',
        page: '/products',
        timestamp: Date.now() - 1800000,
        userId: 'user2',
        properties: { button: 'add_to_cart', productId: '123' },
      },
      {
        id: '3',
        name: 'user_login',
        event: 'auth',
        page: '/login',
        timestamp: Date.now() - 900000,
        userId: 'user3',
        properties: { method: 'email', success: true },
      },
    ];

    const mockDashboardData: AnalyticsDashboardData = {
      totalEvents: 1247,
      uniqueUsers: 89,
      pageViews: 756,
      averageSessionDuration: 234000, // 3m 54s
      topPages: [
        { page: '/dashboard', views: 245, uniqueUsers: 67 },
        { page: '/products', views: 189, uniqueUsers: 45 },
        { page: '/analytics', views: 123, uniqueUsers: 23 },
      ],
      topEvents: [
        { name: 'page_view', count: 756, percentage: 60.6 },
        { name: 'button_click', count: 312, percentage: 25.0 },
        { name: 'user_login', count: 89, percentage: 7.1 },
        { name: 'form_submit', count: 90, percentage: 7.3 },
      ],
      recentEvents: mockEvents,
      timeSeriesData: generateTimeSeriesData(),
    };

    setEvents(mockEvents);
    setDashboardData(mockDashboardData);
  };

  const generateTimeSeriesData = () => {
    const data = [];
    const now = Date.now();

    for (let i = 23; i >= 0; i--) {
      const timestamp = now - i * 3600000; // Last 24 hours
      data.push({
        timestamp,
        events: Math.floor(Math.random() * 50) + 10,
        users: Math.floor(Math.random() * 25) + 5,
      });
    }

    return data;
  };

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const formatTimestamp = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString();
  };

  if (!dashboardData) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-700 rounded w-1/3"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-gray-300">
          Track user behavior and application performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-2xl font-bold text-white">
            {dashboardData.totalEvents.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Total Events</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-2xl font-bold text-white">
            {dashboardData.uniqueUsers}
          </div>
          <div className="text-gray-400 text-sm">Unique Users</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-2xl font-bold text-white">
            {dashboardData.pageViews.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm">Page Views</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="text-2xl font-bold text-white">
            {formatDuration(dashboardData.averageSessionDuration)}
          </div>
          <div className="text-gray-400 text-sm">Avg Session</div>
        </div>
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Pages</h3>
          <div className="space-y-3">
            {dashboardData.topPages.map((pageData, index) => (
              <div
                key={pageData.page}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="text-white font-medium">{pageData.page}</div>
                  <div className="text-gray-400 text-sm">
                    {pageData.uniqueUsers} unique users
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{pageData.views}</div>
                  <div className="text-gray-400 text-sm">views</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Events */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Top Events</h3>
          <div className="space-y-3">
            {dashboardData.topEvents.map((eventData, index) => (
              <div
                key={eventData.name}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="text-white font-medium">{eventData.name}</div>
                  <div className="text-gray-400 text-sm">
                    {eventData.percentage.toFixed(1)}% of total
                  </div>
                </div>
                <div className="text-white font-bold">{eventData.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Events</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {events.map(event => (
            <div
              key={event.id}
              className="flex items-center justify-between p-3 bg-gray-700 rounded"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    event.event === 'navigation'
                      ? 'bg-blue-500'
                      : event.event === 'interaction'
                        ? 'bg-green-500'
                        : event.event === 'auth'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                  }`}
                ></div>
                <div>
                  <div className="text-white text-sm font-medium">
                    {event.name}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {event.page} • User: {event.userId}
                  </div>
                </div>
              </div>
              <div className="text-gray-400 text-xs">
                {formatTimestamp(event.timestamp)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Series Chart Placeholder */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Events Over Time (Last 24 Hours)
        </h3>
        <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-sm">Chart placeholder</div>
            <div className="text-xs mt-1">
              {dashboardData.timeSeriesData.length} data points
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
