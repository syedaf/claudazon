// app/_shared/lib/admin-context.tsx
'use client';

import { createContext, ReactNode, useContext, useReducer } from 'react';

interface AdminState {
  sidebarOpen: boolean;
  notifications: Notification[];
  selectedTenant?: string;
  dashboardFilters: {
    dateRange: string;
    category?: string;
  };
}

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

type AdminAction =
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR_OPEN'; payload: boolean }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SET_TENANT'; payload: string }
  | {
      type: 'UPDATE_FILTERS';
      payload: Partial<AdminState['dashboardFilters']>;
    };

const initialState: AdminState = {
  sidebarOpen: true,
  notifications: [],
  dashboardFilters: {
    dateRange: '7days',
  },
};

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case 'SET_SIDEBAR_OPEN':
      return { ...state, sidebarOpen: action.payload };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };

    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };

    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };

    case 'SET_TENANT':
      return { ...state, selectedTenant: action.payload };

    case 'UPDATE_FILTERS':
      return {
        ...state,
        dashboardFilters: { ...state.dashboardFilters, ...action.payload },
      };

    default:
      return state;
  }
}

interface AdminContextType {
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
  // Helper functions
  toggleSidebar: () => void;
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
  ) => void;
  markNotificationRead: (id: string) => void;
  updateFilters: (filters: Partial<AdminState['dashboardFilters']>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const addNotification = (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
  };

  const markNotificationRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  const updateFilters = (filters: Partial<AdminState['dashboardFilters']>) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: filters });
  };

  const contextValue: AdminContextType = {
    state,
    dispatch,
    toggleSidebar,
    addNotification,
    markNotificationRead,
    updateFilters,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

// Export types for use in components
export type { AdminState, Notification };
