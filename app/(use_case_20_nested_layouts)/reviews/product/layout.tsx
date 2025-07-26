'use client';

import React from 'react';
import { useLayoutTracker } from '../../_utils/layout-tracker';
import { ProductSummary } from './_components/product-summary';
import { ReviewStats } from './_components/review-stats';

interface ProductLayoutProps {
  children: React.ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
  const { registerLayout } = useLayoutTracker();

  React.useEffect(() => {
    registerLayout('product', 'Product Reviews');
    return () => registerLayout('product', null);
  }, [registerLayout]);

  return (
    <div className="space-y-6">
      {/* Product Context Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Product Review Context
          </h2>
        </div>
        <ProductSummary />
      </div>

      {/* Product Review Stats */}
      <ReviewStats />

      {/* Product Review Navigation */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 px-6 py-4">
          <nav className="flex space-x-6">
            <a
              href="#"
              className="text-indigo-600 font-medium border-b-2 border-indigo-600 pb-2"
            >
              Overview
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 pb-2">
              Detailed Analysis
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 pb-2">
              Sentiment Trends
            </a>
          </nav>
        </div>

        <div className="p-6">{children}</div>
      </div>

      {/* Layout Level Indicator */}
      <div className="fixed bottom-4 left-36 bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
        Layout Level 4: Product Context
      </div>
    </div>
  );
}
