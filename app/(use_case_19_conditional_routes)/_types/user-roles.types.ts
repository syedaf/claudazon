// User role definitions
export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  GUEST = 'guest',
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

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  description?: string;
  category?: string;
}
