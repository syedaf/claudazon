'use client';

import { createContext, ReactNode, useContext } from 'react';
import { UserRole } from '@/middleware';

interface RoleContextType {
  role: UserRole;
  setRole?: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType>({
  role: UserRole.GUEST,
});

interface RoleProviderProps {
  children: ReactNode;
  initialRole: UserRole;
}

export function RoleProvider({ children, initialRole }: RoleProviderProps) {
  return (
    <RoleContext.Provider value={{ role: initialRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
