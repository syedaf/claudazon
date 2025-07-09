// app/(admin)/_components/admin-stats.tsx
'use client';

import { useEffect, useState } from 'react';
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { Card } from '@/_shared/components/ui/card';

interface StatData {
  name: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  change: string;
  changeType: 'positive' | 'negative';
}

export function AdminStats() {
  const [stats, setStats] = useState<StatData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get admin stats
    const fetchStats = async () => {
      try {
        // In real app, this would call /api/admin/analytics
        const mockStats: StatData[] = [
          {
            name: 'Total Revenue',
            value: '$45,231.89',
            icon: DollarSign,
            change: '+20.1%',
            changeType: 'positive',
          },
          {
            name: 'Products',
            value: '2,451',
            icon: Package,
            change: '+12%',
            changeType: 'positive',
          },
          {
            name: 'Orders',
            value: '127',
            icon: ShoppingCart,
            change: '+5%',
            changeType: 'positive',
          },
          {
            name: 'Active Users',
            value: '2,341',
            icon: Users,
            change: '-3%',
            changeType: 'negative',
          },
        ];

        setStats(mockStats);
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(stat => {
        const Icon = stat.icon;
        return (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon className="h-8 w-8 text-blue-600" />
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
          </Card>
        );
      })}
    </div>
  );
}
