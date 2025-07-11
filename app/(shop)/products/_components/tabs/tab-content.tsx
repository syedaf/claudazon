'use client';

import { ReactNode } from 'react';

interface TabContentProps {
  children: ReactNode;
  tabId: string;
  isActive: boolean;
  className?: string;
}

export function TabContent({
  children,
  tabId,
  isActive,
  className = '',
}: TabContentProps) {
  return (
    <div
      id={`tab-content-${tabId}`}
      role="tabpanel"
      aria-labelledby={`tab-${tabId}`}
      hidden={!isActive}
      className={`focus:outline-none ${className}`}
      tabIndex={0}
    >
      {isActive && <div className="animate-fadeIn">{children}</div>}
    </div>
  );
}
