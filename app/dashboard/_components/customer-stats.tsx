import { CustomerDashboardData } from '@/_types/user-roles.types';

interface CustomerStatsProps {
  data: CustomerDashboardData;
}

export function CustomerStats({ data }: CustomerStatsProps) {
  const stats = [
    {
      label: 'Recent Orders',
      value: data.recentOrders.length.toString(),
      icon: '📦',
      description: 'Orders this month',
    },
    {
      label: 'Wishlist Items',
      value: data.wishlistCount.toString(),
      icon: '❤️',
      description: 'Items saved',
    },
    {
      label: 'Account Status',
      value: data.accountStatus,
      icon: '⭐',
      description: 'Membership level',
    },
    {
      label: 'Recommendations',
      value: data.recommendations.length.toString(),
      icon: '✨',
      description: 'New suggestions',
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
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
