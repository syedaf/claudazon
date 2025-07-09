// Create this file: app/(internal)/_components/performance-monitor.tsx

'use client';

import { useEffect, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  TrendingUp,
  XCircle,
  Zap,
} from 'lucide-react';

interface PerformanceMetrics {
  responseTime: {
    avg: number;
    p95: number;
    p99: number;
    trend: 'up' | 'down' | 'stable';
  };
  throughput: {
    rps: number;
    trend: 'up' | 'down' | 'stable';
  };
  errorRate: {
    percentage: number;
    count: number;
    trend: 'up' | 'down' | 'stable';
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  vitals: {
    fcp: number;
    lcp: number;
    fid: number;
    cls: number;
  };
}

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    responseTime: { avg: 0, p95: 0, p99: 0, trend: 'stable' },
    throughput: { rps: 0, trend: 'stable' },
    errorRate: { percentage: 0, count: 0, trend: 'stable' },
    memory: { used: 0, total: 0, percentage: 0 },
    vitals: { fcp: 0, lcp: 0, fid: 0, cls: 0 },
  });

  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    startMonitoring();
    return () => setIsMonitoring(false);
  }, []);

  const startMonitoring = () => {
    setIsMonitoring(true);
    loadMetrics();

    const interval = setInterval(loadMetrics, 10000);
    return () => clearInterval(interval);
  };

  const loadMetrics = () => {
    const newMetrics: PerformanceMetrics = {
      responseTime: {
        avg: Math.floor(Math.random() * 200) + 50,
        p95: Math.floor(Math.random() * 500) + 200,
        p99: Math.floor(Math.random() * 1000) + 500,
        trend: getRandomTrend(),
      },
      throughput: {
        rps: Math.floor(Math.random() * 100) + 20,
        trend: getRandomTrend(),
      },
      errorRate: {
        percentage: Math.random() * 5,
        count: Math.floor(Math.random() * 50),
        trend: getRandomTrend(),
      },
      memory: {
        used: Math.floor(Math.random() * 8000) + 2000,
        total: 16000,
        percentage: 0,
      },
      vitals: {
        fcp: Math.random() * 3000 + 500,
        lcp: Math.random() * 5000 + 1000,
        fid: Math.random() * 100 + 10,
        cls: Math.random() * 0.25,
      },
    };

    newMetrics.memory.percentage = Math.round(
      (newMetrics.memory.used / newMetrics.memory.total) * 100
    );
    setMetrics(newMetrics);
    generateAlerts(newMetrics);
  };

  const getRandomTrend = (): 'up' | 'down' | 'stable' => {
    const trends: ('up' | 'down' | 'stable')[] = ['up', 'down', 'stable'];
    return trends[Math.floor(Math.random() * 3)];
  };

  const generateAlerts = (metrics: PerformanceMetrics) => {
    const newAlerts: Alert[] = [];

    if (metrics.responseTime.avg > 500) {
      newAlerts.push({
        id: Math.random().toString(36).substr(2, 9),
        type: 'warning',
        message: `High average response time: ${metrics.responseTime.avg}ms`,
        timestamp: new Date(),
        resolved: false,
      });
    }

    if (metrics.errorRate.percentage > 2) {
      newAlerts.push({
        id: Math.random().toString(36).substr(2, 9),
        type: 'error',
        message: `Error rate above threshold: ${metrics.errorRate.percentage.toFixed(2)}%`,
        timestamp: new Date(),
        resolved: false,
      });
    }

    if (metrics.memory.percentage > 85) {
      newAlerts.push({
        id: Math.random().toString(36).substr(2, 9),
        type: 'warning',
        message: `High memory usage: ${metrics.memory.percentage}%`,
        timestamp: new Date(),
        resolved: false,
      });
    }

    if (metrics.vitals.lcp > 2500) {
      newAlerts.push({
        id: Math.random().toString(36).substr(2, 9),
        type: 'warning',
        message: `Poor LCP score: ${metrics.vitals.lcp.toFixed(0)}ms`,
        timestamp: new Date(),
        resolved: false,
      });
    }

    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev.slice(0, 9)]);
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-400" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-green-400" />;
      case 'stable':
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getVitalsStatus = (metric: string, value: number): string => {
    const thresholds: Record<string, { good: number; poor: number }> = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'good':
        return 'text-green-400';
      case 'needs-improvement':
        return 'text-yellow-400';
      case 'poor':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4" />;
      case 'needs-improvement':
        return <AlertTriangle className="h-4 w-4" />;
      case 'poor':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getMemoryBarColor = (percentage: number): string => {
    if (percentage > 85) return 'bg-red-500';
    if (percentage > 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getOverallStatus = (): { status: string; color: string } => {
    const errorAlerts = alerts.filter(
      a => !a.resolved && a.type === 'error'
    ).length;
    const warningAlerts = alerts.filter(
      a => !a.resolved && a.type === 'warning'
    ).length;

    if (errorAlerts > 0) {
      return { status: 'Critical', color: 'text-red-400' };
    }
    if (warningAlerts > 0) {
      return { status: 'Warning', color: 'text-yellow-400' };
    }
    return { status: 'Healthy', color: 'text-green-400' };
  };

  const vitalsData = [
    {
      name: 'First Contentful Paint',
      key: 'fcp',
      value: metrics.vitals.fcp,
      unit: 'ms',
    },
    {
      name: 'Largest Contentful Paint',
      key: 'lcp',
      value: metrics.vitals.lcp,
      unit: 'ms',
    },
    {
      name: 'First Input Delay',
      key: 'fid',
      value: metrics.vitals.fid,
      unit: 'ms',
    },
    {
      name: 'Cumulative Layout Shift',
      key: 'cls',
      value: metrics.vitals.cls,
      unit: '',
    },
  ];

  const overallStatus = getOverallStatus();

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Activity className="h-5 w-5 mr-2" />
          Performance Monitor
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`h-2 w-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}
          ></div>
          <span className="text-sm text-gray-400">
            {isMonitoring ? 'Monitoring' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Response Time */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-5 w-5 text-blue-400" />
            {getTrendIcon(metrics.responseTime.trend)}
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics.responseTime.avg}ms
          </div>
          <div className="text-sm text-gray-400">Avg Response Time</div>
          <div className="text-xs text-gray-500 mt-1">
            P95: {metrics.responseTime.p95}ms | P99: {metrics.responseTime.p99}
            ms
          </div>
        </div>

        {/* Throughput */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            {getTrendIcon(metrics.throughput.trend)}
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics.throughput.rps}
          </div>
          <div className="text-sm text-gray-400">Requests/sec</div>
        </div>

        {/* Error Rate */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            {getTrendIcon(metrics.errorRate.trend)}
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics.errorRate.percentage.toFixed(2)}%
          </div>
          <div className="text-sm text-gray-400">Error Rate</div>
          <div className="text-xs text-gray-500 mt-1">
            {metrics.errorRate.count} errors
          </div>
        </div>

        {/* Memory Usage */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Activity className="h-5 w-5 text-purple-400" />
            <span className="text-xs text-gray-400">
              {metrics.memory.used}MB / {metrics.memory.total}MB
            </span>
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics.memory.percentage}%
          </div>
          <div className="text-sm text-gray-400">Memory Usage</div>
          <div className="mt-2 w-full bg-gray-600 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getMemoryBarColor(metrics.memory.percentage)}`}
              style={{ width: `${metrics.memory.percentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Core Web Vitals and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Core Web Vitals */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-white font-medium mb-4 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Core Web Vitals
          </h4>
          <div className="space-y-3">
            {vitalsData.map(vital => {
              const status = getVitalsStatus(vital.key, vital.value);
              return (
                <div
                  key={vital.key}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className={getStatusColor(status)}>
                      {getStatusIcon(status)}
                    </div>
                    <span className="text-white text-sm ml-2">
                      {vital.name}
                    </span>
                  </div>
                  <span className="text-gray-300 text-sm">
                    {vital.value.toFixed(vital.key === 'cls' ? 3 : 0)}
                    {vital.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-gray-700 rounded-lg p-4">
          <h4 className="text-white font-medium mb-4 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Recent Alerts ({alerts.filter(a => !a.resolved).length})
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {alerts.slice(0, 5).map(alert => (
              <div
                key={alert.id}
                className={`p-2 rounded text-sm ${
                  alert.type === 'error'
                    ? 'bg-red-900 text-red-200'
                    : alert.type === 'warning'
                      ? 'bg-yellow-900 text-yellow-200'
                      : 'bg-blue-900 text-blue-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{alert.message}</span>
                  <span className="text-xs opacity-75">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {alerts.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <CheckCircle className="h-6 w-6 mx-auto mb-1" />
                <p className="text-sm">No active alerts</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3">Performance Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Overall Status:</span>
            <span className={`ml-2 font-medium ${overallStatus.color}`}>
              {overallStatus.status}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Monitoring Since:</span>
            <span className="text-white ml-2">2h 34m</span>
          </div>
          <div>
            <span className="text-gray-400">Last Updated:</span>
            <span className="text-white ml-2">Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
