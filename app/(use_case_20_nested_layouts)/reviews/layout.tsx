import React from 'react';
import { ReviewFilters } from '@/(use_case_20_nested_layouts)/reviews/components/review-filters';
import { ReviewHeader } from '@/(use_case_20_nested_layouts)/reviews/components/review-header';
import { useLayoutTracker } from '../_utils/layout-tracker';

interface ReviewsLayoutProps {
  children: React.ReactNode;
}

export default function ReviewsLayout({ children }: ReviewsLayoutProps) {
  const { registerLayout } = useLayoutTracker();

  React.useEffect(() => {
    registerLayout('reviews', 'Reviews Section');
    return () => registerLayout('reviews', null);
  }, [registerLayout]);

  return (
    <div className="space-y-6">
      {/* Reviews Section Header */}
      <ReviewHeader />

      {/* Reviews Layout Container */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        {/* Reviews Navigation */}
        <div className="border-b border-slate-200 px-6 py-4">
          <nav className="flex space-x-6">
            <a
              href="#"
              className="text-blue-600 font-medium border-b-2 border-blue-600 pb-2"
            >
              All Reviews
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 pb-2">
              Product Reviews
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900 pb-2">
              Detailed Analysis
            </a>
          </nav>
        </div>

        {/* Review Filters */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <ReviewFilters />
        </div>

        {/* Reviews Content */}
        <div className="p-6">{children}</div>
      </div>

      {/* Layout Level Indicator */}
      <div className="fixed bottom-4 left-20 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
        Layout Level 3: Reviews Section
      </div>
    </div>
  );
}
