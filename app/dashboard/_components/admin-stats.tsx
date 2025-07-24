import { AdminDashboardData } from '@/_types/user-roles.types';

interface AdminStatsProps {
  data: AdminDashboardData;
}

export function AdminStats({ data }: AdminStatsProps) {
  const stats = [
    {
      label: 'Total Products',
      value: data.totalProducts.toLocaleString(),
      icon: '📦',
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      label: 'Total Users',
      value: data.totalUsers.toLocaleString(),
      icon: '👥',
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      label: 'Total Orders',
      value: data.totalOrders.toLocaleString(),
      icon: '📋',
      change: '+15%',
      changeType: 'positive' as const,
    },
    {
      label: 'Revenue',
      value: `$${data.revenue.toLocaleString()}`,
      icon: '💰',
      change: '+23%',
      changeType: 'positive' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(stat => (
        <div key={stat.label} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
          <div className="mt-4 flex items-center">
            <span
              className={`text-sm font-medium ${
                stat.changeType === 'positive'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
