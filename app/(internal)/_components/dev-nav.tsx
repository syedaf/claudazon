// Create this file: app/(internal)/_components/dev-nav.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  Bug,
  Code,
  Database,
  FileText,
  Monitor,
  Settings,
  TestTube,
} from 'lucide-react';

const navigation = [
  {
    name: 'Dev Tools',
    href: '/dev-tools',
    icon: Code,
    description: 'Development dashboard and tools',
  },
  {
    name: 'API Explorer',
    href: '/dev-tools/api',
    icon: Database,
    description: 'Test API endpoints',
  },
  {
    name: 'Performance',
    href: '/dev-tools/performance',
    icon: Activity,
    description: 'Performance monitoring',
  },
  {
    name: 'Error Logs',
    href: '/dev-tools/errors',
    icon: Bug,
    description: 'Error tracking and logs',
  },
  {
    name: 'Testing',
    href: '/dev-tools/testing',
    icon: TestTube,
    description: 'Test runners and results',
  },
  {
    name: 'System Info',
    href: '/dev-tools/system',
    icon: Monitor,
    description: 'System information',
  },
  {
    name: 'Documentation',
    href: '/dev-tools/docs',
    icon: FileText,
    description: 'API documentation',
  },
  {
    name: 'Settings',
    href: '/dev-tools/settings',
    icon: Settings,
    description: 'Development settings',
  },
];

export function DevNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Internal Tools</h1>
            <p className="text-gray-300 text-sm">
              Development and debugging utilities
            </p>
          </div>

          {/* Environment indicator */}
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="text-yellow-400 text-sm font-medium">
              {process.env.NODE_ENV?.toUpperCase() || 'DEVELOPMENT'}
            </span>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {navigation.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative p-4 rounded-lg border transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <Icon
                    className={`h-6 w-6 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-gray-300'
                    }`}
                  />
                  <div>
                    <div
                      className={`text-sm font-medium ${
                        isActive ? 'text-white' : 'text-gray-300'
                      }`}
                    >
                      {item.name}
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        isActive ? 'text-blue-200' : 'text-gray-500'
                      }`}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 rounded-lg ring-2 ring-blue-400 ring-opacity-50"></div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick actions */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-400">Quick Actions:</div>
            <div className="flex space-x-4">
              <button className="text-blue-400 hover:text-blue-300 transition-colors">
                Clear Cache
              </button>
              <button className="text-green-400 hover:text-green-300 transition-colors">
                Refresh Data
              </button>
              <button className="text-red-400 hover:text-red-300 transition-colors">
                Reset Session
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Export both names to match different import patterns
export { DevNav as DevHeader };
