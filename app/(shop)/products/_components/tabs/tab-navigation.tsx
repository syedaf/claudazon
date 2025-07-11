'use client';

import { useState } from 'react';
import { TabContent } from './tab-content';

interface TabNavigationProps {
  productId: string;
  slots: {
    reviews: React.ReactNode;
    specs: React.ReactNode;
    qa: React.ReactNode;
  };
}

type TabType = 'reviews' | 'specs' | 'qa';

export function TabNavigation({ productId, slots }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState<TabType>('reviews');

  const tabs = [
    {
      id: 'reviews' as TabType,
      label: 'Customer Reviews',
      count: '247',
      description: 'See what customers are saying about this product',
    },
    {
      id: 'specs' as TabType,
      label: 'Specifications',
      count: null,
      description: 'Technical details and product specifications',
    },
    {
      id: 'qa' as TabType,
      label: 'Questions & Answers',
      count: '12',
      description: 'Get answers to common customer questions',
    },
  ];

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    // Scroll to tab content for better UX
    setTimeout(() => {
      const element = document.getElementById(`tab-content-${tabId}`);
      if (element) {
        element.focus();
      }
    }, 100);
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" role="tablist">
          {tabs.map(tab => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tab-content-${tab.id}`}
              onClick={() => handleTabChange(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff9900] focus:ring-offset-2 ${
                activeTab === tab.id
                  ? 'border-[#ff9900] text-[#ff9900]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{tab.label}</span>
                {tab.count && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </div>
              {/* Tab Description on Hover */}
              <div className="sr-only">{tab.description}</div>
            </button>
          ))}
        </nav>

        {/* Active Tab Indicator */}
        <div className="mt-2 text-sm text-gray-600">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </div>
      </div>

      {/* Tab Content Areas */}
      <div className="mt-6">
        <TabContent tabId="reviews" isActive={activeTab === 'reviews'}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Customer Reviews
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Sort by: Most Recent</span>
                <select className="border border-gray-300 rounded px-2 py-1">
                  <option>Most Recent</option>
                  <option>Most Helpful</option>
                  <option>Highest Rating</option>
                  <option>Lowest Rating</option>
                </select>
              </div>
            </div>
            {slots.reviews}
          </div>
        </TabContent>

        <TabContent tabId="specs" isActive={activeTab === 'specs'}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Product Specifications
              </h3>
              <button className="text-sm text-[#ff9900] hover:text-[#e88900] font-medium">
                Print Specifications
              </button>
            </div>
            {slots.specs}
          </div>
        </TabContent>

        <TabContent tabId="qa" isActive={activeTab === 'qa'}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Questions & Answers
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>12 answered questions</span>
                <span>•</span>
                <span>3 unanswered</span>
              </div>
            </div>
            {slots.qa}
          </div>
        </TabContent>
      </div>
    </div>
  );
}
