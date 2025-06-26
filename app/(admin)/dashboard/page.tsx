import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      name: 'Total Products',
      value: '2,451',
      icon: Package,
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Orders Today',
      value: '127',
      icon: ShoppingCart,
      change: '+5%',
      changeType: 'positive',
    },
    {
      name: 'Active Users',
      value: '2,341',
      icon: Users,
      change: '+18%',
      changeType: 'positive',
    },
    {
      name: 'Revenue',
      value: '$12,450',
      icon: DollarSign,
      change: '-3%',
      changeType: 'negative',
    },
  ];

  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      amount: '$129.99',
      status: 'Processing',
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      amount: '$79.50',
      status: 'Shipped',
    },
    {
      id: 'ORD-003',
      customer: 'Bob Johnson',
      amount: '$245.00',
      status: 'Delivered',
    },
    {
      id: 'ORD-004',
      customer: 'Alice Brown',
      amount: '$89.99',
      status: 'Processing',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          {` Welcome back! Here's what's happening with your store today. `}`
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-[#ff9900]" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div
                        className={`ml-2 flex items-baseline text-sm font-semibold ${
                          stat.changeType === 'positive'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentOrders.map(order => (
                  <li key={order.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {order.id}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {order.customer}
                        </p>
                      </div>
                      <div className="text-sm text-gray-900">
                        {order.amount}
                      </div>
                      <div
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-[#ff9900] text-black px-4 py-3 rounded-lg font-medium hover:bg-[#e88900] transition-colors">
                Add Product
              </button>
              <button className="bg-[#007185] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#005a6b] transition-colors">
                View Orders
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Generate Report
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Manage Users
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
