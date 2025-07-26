import { AdminDashboardData } from '@/_types/user-roles.types';

interface AdminStatsProps {
  data: AdminDashboardData;
}

export default function AdminStats({ data }: AdminStatsProps) {
  const stats = [
    {
      label: 'Total Products',
      value: data.totalProducts.toLocaleString(),
      icon: '📦',
    },
    {
      label: 'Total Users',
      value: data.totalUsers.toLocaleString(),
      icon: '👥',
    },
    {
      label: 'Total Orders',
      value: data.totalOrders.toLocaleString(),
      icon: '📋',
    },
    {
      label: 'Revenue',
      value: `$${data.revenue.toLocaleString()}`,
      icon: '💰',
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
        </div>
      ))}
    </div>
  );
}
