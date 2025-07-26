'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface LayoutContextType {
  activeLayouts: string[];
  registerLayout: (key: string, name: string | null) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [activeLayouts, setActiveLayouts] = useState<string[]>([
    'root',
    'usecase',
  ]);

  const registerLayout = (key: string, name: string | null) => {
    setActiveLayouts(prev => {
      if (name === null) {
        // Remove layout
        return prev.filter(layout => layout !== key);
      } else {
        // Add layout if not already present
        return prev.includes(key) ? prev : [...prev, key];
      }
    });
  };

  return (
    <LayoutContext.Provider value={{ activeLayouts, registerLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayoutTracker() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayoutTracker must be used within a LayoutProvider');
  }
  return context;
}
