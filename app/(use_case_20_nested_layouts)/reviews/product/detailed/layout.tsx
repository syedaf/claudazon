'use client';

import React from 'react';
import { useLayoutTracker } from '../../../_utils/layout-tracker';

interface DetailedLayoutProps {
  children: React.ReactNode;
}

export default function DetailedLayout({ children }: DetailedLayoutProps) {
  const { registerLayout } = useLayoutTracker();

  React.useEffect(() => {
    registerLayout('detailed', 'Detailed Analysis');
    return () => registerLayout('detailed', null);
  }, [registerLayout]);

  return (
    <div className="space-y-6">
      {/* Detailed Analysis Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-purple-600 text-white p-2 rounded-lg">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Advanced Review Analytics
          </h3>
        </div>
        <p className="text-slate-600">
          Deep dive into review sentiment, keywords, and patterns with
          AI-powered insights.
        </p>
      </div>

      {/* Analysis Tools */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-medium text-gray-900">Analysis Tools</h4>
          <div className="flex space-x-2">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700">
              Export Data
            </button>
            <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-300">
              Settings
            </button>
          </div>
        </div>

        {children}
      </div>

      {/* Layout Level Indicator */}
      <div className="fixed bottom-4 left-52 bg-pink-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
        Layout Level 5: Detailed Analysis
      </div>
    </div>
  );
}
