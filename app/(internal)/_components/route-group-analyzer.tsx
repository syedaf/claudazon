// app/(internal)/_components/route-group-analyzer.tsx
'use client';

import { useEffect, useState } from 'react';

interface RouteGroupInfo {
  name: string;
  routes: string[];
  components: number;
  privateComponents: number;
  apiEndpoints: number;
}

export function RouteGroupAnalyzer() {
  const [groups, setGroups] = useState<RouteGroupInfo[]>([]);

  useEffect(() => {
    // In a real implementation, this would analyze the file system
    // or use a build-time analysis tool
    const mockGroups: RouteGroupInfo[] = [
      {
        name: 'admin',
        routes: ['/dashboard', '/inventory', '/analytics'],
        components: 8,
        privateComponents: 3,
        apiEndpoints: 2,
      },
      {
        name: 'auth',
        routes: ['/login', '/register', '/forgot-password'],
        components: 5,
        privateComponents: 3,
        apiEndpoints: 2,
      },
      {
        name: 'shop',
        routes: ['/products', '/categories', '/search'],
        components: 12,
        privateComponents: 3,
        apiEndpoints: 3,
      },
      {
        name: 'api',
        routes: [],
        components: 0,
        privateComponents: 0,
        apiEndpoints: 7,
      },
      {
        name: 'internal',
        routes: ['/dev-tools', '/api-explorer', '/health-check'],
        components: 6,
        privateComponents: 4,
        apiEndpoints: 0,
      },
      {
        name: 'public',
        routes: ['/about', '/contact', '/careers'],
        components: 4,
        privateComponents: 3,
        apiEndpoints: 0,
      },
    ];

    setGroups(mockGroups);
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 font-semibold text-white">
                Route Group
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white">
                Routes
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white">
                Components
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white">
                Private Components
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white">
                API Endpoints
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map(group => (
              <tr key={group.name} className="border-b border-gray-700">
                <td className="py-3 px-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                    ({group.name})
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-300">
                  {group.routes.length > 0 ? (
                    <div className="space-y-1">
                      {group.routes.map(route => (
                        <div key={route} className="text-sm">
                          {route}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500">No public routes</span>
                  )}
                </td>
                <td className="py-3 px-4 text-gray-300">{group.components}</td>
                <td className="py-3 px-4 text-gray-300">
                  {group.privateComponents}
                </td>
                <td className="py-3 px-4 text-gray-300">
                  {group.apiEndpoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700 rounded p-4">
          <h4 className="font-semibold text-white mb-2">Total Route Groups</h4>
          <div className="text-2xl font-bold text-blue-400">
            {groups.length}
          </div>
        </div>
        <div className="bg-gray-700 rounded p-4">
          <h4 className="font-semibold text-white mb-2">Total Routes</h4>
          <div className="text-2xl font-bold text-green-400">
            {groups.reduce((sum, group) => sum + group.routes.length, 0)}
          </div>
        </div>
        <div className="bg-gray-700 rounded p-4">
          <h4 className="font-semibold text-white mb-2">Total API Endpoints</h4>
          <div className="text-2xl font-bold text-purple-400">
            {groups.reduce((sum, group) => sum + group.apiEndpoints, 0)}
          </div>
        </div>
      </div>
    </div>
  );
}
