;
// Mock data fetch
import { CustomerStats } from '@/_dashboard/_components/customer-stats';
import { RecentOrders } from '@/_dashboard/_components/recent-orders';
import { Recommendations } from '@/_dashboard/_components/recommendations';
import { CustomerDashboardData } from '@/_types/user-roles.types';


async function getCustomerDashboardData(): Promise<CustomerDashboardData> {
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    recentOrders: [
      {
        id: 'ORD-001',
        date: new Date(Date.now() - 86400000),
        status: 'delivered' as const,
        total: 299.99,
        items: [
          {
            productId: '1',
            name: 'AirPods Pro',
            quantity: 1,
            price: 249.99,
          },
        ],
      },
    ],
    wishlistCount: 12,
    recommendations: [
      {
        id: '3',
        name: 'iPhone 15 Pro Case',
        price: 49.99,
        image: '/api/placeholder/150/150',
        rating: 4.6,
        description: 'Protective case for iPhone 15 Pro',
        category: 'Accessories',
      },
    ],
    accountStatus: 'Premium Member',
  };
}

export default async function CustomerDashboardPage() {
  const dashboardData = await getCustomerDashboardData();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="mt-2 text-blue-100">
          Use Case #19: Conditional Routes - Customer View
        </p>
        <p className="mt-1 text-blue-100">
          {dashboardData.accountStatus} • {dashboardData.wishlistCount} items in
          wishlist
        </p>
      </div>

      {/* Quick Stats */}
      <CustomerStats data={dashboardData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <RecentOrders orders={dashboardData.recentOrders} />

        {/* Recommendations */}
        <Recommendations products={dashboardData.recommendations} />
      </div>
    </div>
  );
}
