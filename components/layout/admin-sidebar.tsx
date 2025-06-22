'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AlertCircle,
  BarChart3,
  DollarSign,
  FileText,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Inventory', href: '/admin/inventory', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/admin/reports', icon: FileText },
  { name: 'Shipping', href: '/admin/shipping', icon: Truck },
  { name: 'Revenue', href: '/admin/revenue', icon: DollarSign },
  { name: 'Issues', href: '/admin/issues', icon: AlertCircle },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#131921] text-white hidden md:block">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6 text-[#ff9900]">
          Admin Panel
        </h2>
        <nav className="space-y-2">
          {navigation.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#ff9900] text-black'
                    : 'text-gray-300 hover:bg-[#232f3e] hover:text-white'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-[#232f3e] rounded-lg">
          <h3 className="text-sm font-semibold mb-3 text-[#ff9900]">
            Quick Stats
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">{`Today's Orders`}</span>
              <span className="text-white font-bold">127</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Revenue</span>
              <span className="text-white font-bold">$12,450</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Active Users</span>
              <span className="text-white font-bold">2,341</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
