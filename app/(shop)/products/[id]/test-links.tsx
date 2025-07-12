'use client';

import Link from 'next/link';

export function TestLinks() {
  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold mb-3">🧪 Test Intercept Routes</h3>
      <div className="space-y-3 text-sm">
        <div>
          <strong>Modal (Next.js Link - will intercept):</strong>
          <div className="flex gap-2 mt-1">
            <Link
              href="/photo/img001"
              className="text-blue-600 hover:underline"
            >
              Image 1
            </Link>
            <Link
              href="/photo/img002"
              className="text-blue-600 hover:underline"
            >
              Image 2
            </Link>
            <Link
              href="/photo/img003"
              className="text-blue-600 hover:underline"
            >
              Image 3
            </Link>
          </div>
        </div>
        <div>
          <strong>Full Page (window.open - bypasses intercept):</strong>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => window.open('/photo/img001', '_blank')}
              className="text-green-600 hover:underline cursor-pointer"
            >
              Image 1
            </button>
            <button
              onClick={() => window.open('/photo/img002', '_blank')}
              className="text-green-600 hover:underline cursor-pointer"
            >
              Image 2
            </button>
            <button
              onClick={() => window.open('/photo/img003', '_blank')}
              className="text-green-600 hover:underline cursor-pointer"
            >
              Image 3
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2">
          💡 Blue links = Modal via intercept route | Green buttons = Full page
          in new tab
        </div>
      </div>
    </div>
  );
}
