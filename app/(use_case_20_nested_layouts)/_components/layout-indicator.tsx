'use client';

import { useLayoutTracker } from '../_utils/layout-tracker';

export function LayoutIndicator() {
  const { activeLayouts } = useLayoutTracker();

  const layoutLevels = [
    { key: 'root', name: 'Root', color: 'bg-gray-500' },
    { key: 'usecase', name: 'Use Case', color: 'bg-blue-600' },
    { key: 'reviews', name: 'Reviews', color: 'bg-green-600' },
    { key: 'product', name: 'Product', color: 'bg-purple-600' },
    { key: 'detailed', name: 'Detailed', color: 'bg-pink-600' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-slate-600">Active Layouts:</span>
      <div className="flex space-x-1">
        {layoutLevels.map(level => (
          <div
            key={level.key}
            className={`w-3 h-3 rounded ${
              activeLayouts.includes(level.key) ? level.color : 'bg-slate-200'
            }`}
            title={`${level.name} Layout ${activeLayouts.includes(level.key) ? 'Active' : 'Inactive'}`}
          />
        ))}
      </div>
    </div>
  );
}
