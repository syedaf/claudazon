import { UserRole } from './user-roles.types';


// Route configuration interface
export interface RouteConfig {
  path: string;
  component: string;
  requiredRole: UserRole;
  permissions?: string[];
}

// Conditional routing props
export interface ConditionalRouteProps {
  userRole: UserRole;
  allowedRoles: UserRole[];
  fallbackRoute?: string;
  children: React.ReactNode;
}

// Route guard props
export interface RouteGuardProps {
  requiredRole: UserRole;
  fallbackComponent?: React.ComponentType;
  children: React.ReactNode;
}

// Navigation item interface
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  requiredRole?: UserRole;
  badge?: string | number;
}
