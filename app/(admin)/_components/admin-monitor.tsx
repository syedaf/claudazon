// app/(admin)/_components/admin-monitor.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Clock,
  Eye,
  ShoppingCart,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/_shared/components/ui/card';
import { useAdmin } from '@/_shared/lib/admin-context';

interface ActivityMetadata {
  orderId?: string;
  productId?: string;
  amount?: number;
  ipAddress?: string;
  userAgent?: string;
  previousValue?: string;
  newValue?: string;
  adminId?: string;
}

interface ActivityLog {
  id: string;
  type:
    | 'user_login'
    | 'order_created'
    | 'product_updated'
    | 'system_alert'
    | 'admin_action';
  message: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  userId?: string;
  metadata?: ActivityMetadata; // ✅ No more 'any'!
}

interface SystemMetrics {
  activeUsers: number;
  ordersToday: number;
  systemHealth: 'good' | 'warning' | 'critical';
  responseTime: number;
  errorRate: number;
}

export function AdminActivityMonitor() {
  const { addNotification } = useAdmin();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics>({
    activeUsers: 0,
    ordersToday: 0,
    systemHealth: 'good',
    responseTime: 0,
    errorRate: 0,
  });
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    // Start monitoring when component mounts
    startMonitoring();

    // Load initial data
    loadRecentActivities();
    loadSystemMetrics();

    return () => {
      setIsMonitoring(false);
    };
  }, []);

  const startMonitoring = () => {
    setIsMonitoring(true);

    // Simulate real-time activity monitoring
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance of new activity
        generateMockActivity();
      }
      updateSystemMetrics();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  };

  const generateMockActivity = () => {
    const activityTypes: ActivityLog['type'][] = [
      'user_login',
      'order_created',
      'product_updated',
      'system_alert',
      'admin_action',
    ];

    const messages = {
      user_login: 'User logged in from new device',
      order_created: 'New order placed - $127.99',
      product_updated: 'Product inventory updated',
      system_alert: 'High CPU usage detected',
      admin_action: 'Admin updated user permissions',
    };

    const type =
      activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const severity: ActivityLog['severity'] =
      type === 'system_alert'
        ? 'high'
        : type === 'order_created'
          ? 'medium'
          : 'low';

    const newActivity: ActivityLog = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message: messages[type],
      timestamp: new Date(),
      severity,
      userId:
        type === 'user_login'
          ? 'user_' + Math.random().toString(36).substr(2, 5)
          : undefined,
    };

    setActivities(prev => [newActivity, ...prev].slice(0, 20)); // Keep only latest 20

    // Add notification for high severity activities
    if (severity === 'high') {
      addNotification({
        type: 'warning',
        title: 'System Alert',
        message: newActivity.message,
      });
    }
  };

  const loadRecentActivities = () => {
    // Mock recent activities
    const mockActivities: ActivityLog[] = [
      {
        id: '1',
        type: 'user_login',
        message: 'User john@example.com logged in',
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        severity: 'low',
      },
      {
        id: '2',
        type: 'order_created',
        message: 'Order #12345 created - $89.99',
        timestamp: new Date(Date.now() - 600000), // 10 minutes ago
        severity: 'medium',
      },
      {
        id: '3',
        type: 'product_updated',
        message: 'Product "Wireless Headphones" stock updated',
        timestamp: new Date(Date.now() - 900000), // 15 minutes ago
        severity: 'low',
      },
    ];

    setActivities(mockActivities);
  };

  const loadSystemMetrics = () => {
    // Mock system metrics
    setMetrics({
      activeUsers: Math.floor(Math.random() * 500) + 100,
      ordersToday: Math.floor(Math.random() * 200) + 50,
      systemHealth: Math.random() > 0.8 ? 'warning' : 'good',
      responseTime: Math.floor(Math.random() * 200) + 100,
      errorRate: Math.random() * 2,
    });
  };

  const updateSystemMetrics = () => {
    setMetrics(prev => ({
      ...prev,
      activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
      responseTime: Math.max(
        50,
        prev.responseTime + Math.floor(Math.random() * 40) - 20
      ),
      errorRate: Math.max(0, prev.errorRate + (Math.random() - 0.5) * 0.5),
    }));
  };

  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'user_login':
        return <UserCheck className="h-4 w-4" />;
      case 'order_created':
        return <ShoppingCart className="h-4 w-4" />;
      case 'product_updated':
        return <TrendingUp className="h-4 w-4" />;
      case 'system_alert':
        return <AlertTriangle className="h-4 w-4" />;
      case 'admin_action':
        return <Eye className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: ActivityLog['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
    }
  };

  const getHealthColor = (health: SystemMetrics['systemHealth']) => {
    switch (health) {
      case 'critical':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      case 'good':
        return 'text-green-600';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">System Monitor</h3>
            <div className="flex items-center space-x-2">
              <div
                className={`h-2 w-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}
              ></div>
              <span className="text-sm text-gray-500">
                {isMonitoring ? 'Live' : 'Offline'}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Users className="h-6 w-6 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold">{metrics.activeUsers}</div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>

            <div className="text-center">
              <ShoppingCart className="h-6 w-6 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold">{metrics.ordersToday}</div>
              <div className="text-sm text-gray-500">Orders Today</div>
            </div>

            <div className="text-center">
              <Clock className="h-6 w-6 mx-auto text-purple-600 mb-2" />
              <div className="text-2xl font-bold">{metrics.responseTime}ms</div>
              <div className="text-sm text-gray-500">Response Time</div>
            </div>

            <div className="text-center">
              <Activity
                className={`h-6 w-6 mx-auto mb-2 ${getHealthColor(metrics.systemHealth)}`}
              />
              <div
                className={`text-2xl font-bold ${getHealthColor(metrics.systemHealth)}`}
              >
                {metrics.systemHealth.toUpperCase()}
              </div>
              <div className="text-sm text-gray-500">System Health</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {activities.map(activity => (
              <div
                key={activity.id}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div
                  className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}
                >
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTimeAgo(activity.timestamp)}
                  </p>
                </div>

                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(activity.severity)}`}
                >
                  {activity.severity}
                </div>
              </div>
            ))}

            {activities.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
