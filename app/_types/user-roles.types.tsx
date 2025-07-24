// User role definitions
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  GUEST = 'guest',
}

// User permissions interface
export interface UserPermissions {
  canViewInventory: boolean;
  canViewAnalytics: boolean;
  canManageUsers: boolean;
  canViewOrders: boolean;
  canManageWishlist: boolean;
  canViewRecommendations: boolean;
}

// User context interface
export interface UserContext {
  id: string;
  email: string;
  role: UserRole;
  permissions: UserPermissions;
  isAuthenticated: boolean;
}

// Dashboard data interfaces
export interface AdminDashboardData {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  revenue: number;
  recentActivity: ActivityItem[];
}

export interface CustomerDashboardData {
  recentOrders: Order[];
  wishlistCount: number;
  recommendations: Product[];
  accountStatus: string;
}

export interface ActivityItem {
  id: string;
  type: 'order' | 'user' | 'product';
  description: string;
  timestamp: Date;
}

export interface Order {
  id: string;
  date: Date;
  status: 'pending' | 'shipped' | 'delivered';
  total: number;
  items: OrderItem[];
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

// CRITICAL: Product interface with REQUIRED image property
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string; // THIS IS REQUIRED - DO NOT REMOVE
  rating: number;
  description?: string;
  category?: string;
  inStock?: boolean;
  sku?: string;
  images?: string[]; // Optional additional images
}
