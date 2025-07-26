import { AdminNav } from '@/_dashboard/_components/admin-nav';
import { AdminDashboardData } from '@/_types/user-roles.types';

// Mock data fetch - replace with real API call
async function getAdminDashboardData(): Promise<AdminDashboardData> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    totalProducts: 1247,
    totalUsers: 8934,
    totalOrders: 2156,
    revenue: 145678.9,
    recentActivity: [
      {
        id: '1',
        type: 'order' as const,
        description: 'New order #ORD-2024-001 received',
        timestamp: new Date(),
      },
      {
        id: '2',
        type: 'user' as const,
        description: 'New user registration: john@example.com',
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: '3',
        type: 'product' as const,
        description: 'Product "iPhone 15 Pro" inventory low',
        timestamp: new Date(Date.now() - 600000),
      },
    ],
  };
}

export default async function AdminDashboardPage() {
  const dashboardData = await getAdminDashboardData();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-gray-600">
            Manage your Claudazon store operations
          </p>
        </div>
        <AdminNav />
      </div>

      {/* Stats Overview */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Admin Stats</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600">Products</p>
            <p className="text-2xl font-bold">{dashboardData.totalProducts}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Users</p>
            <p className="text-2xl font-bold">{dashboardData.totalUsers}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Orders</p>
            <p className="text-2xl font-bold">{dashboardData.totalOrders}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Revenue</p>
            <p className="text-2xl font-bold">${dashboardData.revenue}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {dashboardData.recentActivity.map(activity => (
            <div
              key={activity.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  activity.type === 'order'
                    ? 'bg-green-500'
                    : activity.type === 'user'
                      ? 'bg-blue-500'
                      : 'bg-yellow-500'
                }`}
              />
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-500">
                  {activity.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
