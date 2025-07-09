// Create this file: app/(internal)/_components/system-stats.tsx

'use client';

import { useEffect, useState } from 'react';
import {
  Clock,
  Cpu,
  Database,
  HardDrive,
  Server,
  Wifi,
  Zap,
} from 'lucide-react';

interface SystemMetrics {
  uptime: string;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  cpu: {
    usage: number;
    cores: number;
  };
  requests: {
    total: number;
    perSecond: number;
    errors: number;
  };
  database: {
    connections: number;
    queryTime: number;
    status: 'healthy' | 'warning' | 'error';
  };
  cache: {
    hitRate: number;
    size: string;
    status: 'healthy' | 'warning' | 'error';
  };
}

export function SystemStats() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    uptime: '0h 0m',
    memory: { used: 0, total: 0, percentage: 0 },
    cpu: { usage: 0, cores: 0 },
    requests: { total: 0, perSecond: 0, errors: 0 },
    database: { connections: 0, queryTime: 0, status: 'healthy' },
    cache: { hitRate: 0, size: '0MB', status: 'healthy' },
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial metrics
    loadSystemMetrics();

    // Update every 5 seconds
    const interval = setInterval(loadSystemMetrics, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadSystemMetrics = async () => {
    try {
      // In production, this would fetch from a real monitoring API
      // For now, generate mock data
      const mockMetrics: SystemMetrics = {
        uptime: generateUptime(),
        memory: {
          used: Math.floor(Math.random() * 8000) + 2000,
          total: 16000,
          percentage: 0,
        },
        cpu: {
          usage: Math.floor(Math.random() * 30) + 15,
          cores: 8,
        },
        requests: {
          total: Math.floor(Math.random() * 50000) + 10000,
          perSecond: Math.floor(Math.random() * 100) + 20,
          errors: Math.floor(Math.random() * 50),
        },
        database: {
          connections: Math.floor(Math.random() * 50) + 10,
          queryTime: Math.floor(Math.random() * 50) + 5,
          status: Math.random() > 0.8 ? 'warning' : 'healthy',
        },
        cache: {
          hitRate: Math.floor(Math.random() * 20) + 75,
          size: `${Math.floor(Math.random() * 500) + 100}MB`,
          status: 'healthy',
        },
      };

      mockMetrics.memory.percentage = Math.round(
        (mockMetrics.memory.used / mockMetrics.memory.total) * 100
      );

      setMetrics(mockMetrics);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load system metrics:', error);
      setIsLoading(false);
    }
  };

  const generateUptime = (): string => {
    const hours = Math.floor(Math.random() * 24) + 1;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getUsageColor = (percentage: number) => {
    if (percentage > 80) return 'bg-red-500';
    if (percentage > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/3"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Server className="h-5 w-5 mr-2" />
          System Metrics
        </h2>
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm">Live</span>
        </div>
      </div>

      {/* Main metrics grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {/* CPU Usage */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Cpu className="h-5 w-5 text-blue-400" />
            <span className="text-xs text-gray-400">
              {metrics.cpu.cores} cores
            </span>
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics.cpu.usage}%
          </div>
          <div className="text-sm text-gray-400">CPU Usage</div>
          <div className="mt-2 w-full bg-gray-600 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getUsageColor(metrics.cpu.usage)}`}
              style={{ width: `${metrics.cpu.usage}%` }}
            ></div>
          </div>
        </div>

        {/* Memory Usage */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <HardDrive className="h-5 w-5 text-purple-400" />
            <span className="text-xs text-gray-400">
              {metrics.memory.used}MB / {metrics.memory.total}MB
            </span>
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics.memory.percentage}%
          </div>
          <div className="text-sm text-gray-400">Memory</div>
          <div className="mt-2 w-full bg-gray-600 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${getUsageColor(metrics.memory.percentage)}`}
              style={{ width: `${metrics.memory.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Requests */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Wifi className="h-5 w-5 text-green-400" />
            <span className="text-xs text-gray-400">
              {metrics.requests.perSecond}/sec
            </span>
          </div>
          <div className="text-2xl font-bold text-white">
            {metrics.requests.total.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400">Total Requests</div>
          {metrics.requests.errors > 0 && (
            <div className="text-xs text-red-400 mt-1">
              {metrics.requests.errors} errors
            </div>
          )}
        </div>

        {/* Uptime */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-5 w-5 text-yellow-400" />
            <span className="text-xs text-green-400">Healthy</span>
          </div>
          <div className="text-2xl font-bold text-white">{metrics.uptime}</div>
          <div className="text-sm text-gray-400">Uptime</div>
        </div>
      </div>

      {/* Detailed metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Database */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Database className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-white font-medium">Database</span>
            </div>
            <span
              className={`text-sm ${getStatusColor(metrics.database.status)}`}
            >
              {metrics.database.status}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Connections:</span>
              <span className="text-white">{metrics.database.connections}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Avg Query Time:</span>
              <span className="text-white">{metrics.database.queryTime}ms</span>
            </div>
          </div>
        </div>

        {/* Cache */}
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Zap className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-white font-medium">Cache</span>
            </div>
            <span className={`text-sm ${getStatusColor(metrics.cache.status)}`}>
              {metrics.cache.status}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Hit Rate:</span>
              <span className="text-white">{metrics.cache.hitRate}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Size:</span>
              <span className="text-white">{metrics.cache.size}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
