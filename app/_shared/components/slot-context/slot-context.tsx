'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface SlotContextType {
  isLoggedIn: boolean;
  toggleLogin: () => void;
  userRole: 'guest' | 'customer' | 'admin';
}

const SlotContext = createContext<SlotContextType | undefined>(undefined);

export function SlotProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const userRole = isLoggedIn ? 'customer' : 'guest';

  return (
    <SlotContext.Provider value={{ isLoggedIn, toggleLogin, userRole }}>
      {children}
    </SlotContext.Provider>
  );
}

export function useSlotContext() {
  const context = useContext(SlotContext);
  if (context === undefined) {
    throw new Error('useSlotContext must be used within a SlotProvider');
  }
  return context;
}
