'use client';

import React from 'react';
import { BreadcrumbNav } from './_components/breadcrumb-nav';
import { LayoutIndicator } from './_components/layout-indicator';
import { LayoutProvider } from './_utils/layout-tracker';

interface UseCase20LayoutProps {
  children: React.ReactNode;
}

export default function UseCase20Layout({ children }: UseCase20LayoutProps) {
  return (
    <LayoutProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Use Case Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                  Use Case #20
                </div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Nested Layouts Demo
                </h1>
              </div>
              <LayoutIndicator />
            </div>
          </div>
        </header>

        {/* Breadcrumb Navigation */}
        <BreadcrumbNav />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Layout Level Indicator */}
        <div className="fixed bottom-4 left-4 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
          Layout Level 2: Use Case Root
        </div>
      </div>
    </LayoutProvider>
  );
}
