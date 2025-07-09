// _shared/types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
  category?: string;
  search?: string;
}

export type UserRole = 'admin' | 'user' | 'moderator' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
  preferences?: UserPreferences;
  profile?: UserProfile;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  emailUpdates: {
    newsletter: boolean;
    productUpdates: boolean;
    orderUpdates: boolean;
  };
}

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  address?: Address;
  company?: string;
  jobTitle?: string;
  bio?: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

// Authentication related types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface PasswordResetData {
  email: string;
}

export interface PasswordUpdateData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// User session types
export interface UserSession {
  user: AuthUser;
  token: string;
  refreshToken?: string;
  expiresAt: Date;
}

// Admin specific user types
export interface AdminUserView extends User {
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: Date;
  accountStatus: 'active' | 'suspended' | 'pending' | 'deleted';
  verificationStatus: {
    email: boolean;
    phone: boolean;
    identity: boolean;
  };
}

// User creation/update types for forms
export interface CreateUserData {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  isActive?: boolean;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
  preferences?: Partial<UserPreferences>;
  profile?: Partial<UserProfile>;
}

// Type guards
export function isAdmin(user: User | AuthUser): boolean {
  return user.role === 'admin';
}

export function isModerator(user: User | AuthUser): boolean {
  return user.role === 'moderator';
}

export function hasAdminAccess(user: User | AuthUser): boolean {
  return user.role === 'admin' || user.role === 'moderator';
}

// Constants
export const USER_ROLES: Record<UserRole, string> = {
  admin: 'Administrator',
  moderator: 'Moderator',
  user: 'User',
  guest: 'Guest',
} as const;

export const ACCOUNT_STATUSES = {
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
  DELETED: 'deleted',
} as const;
