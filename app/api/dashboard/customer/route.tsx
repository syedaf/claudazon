import { getUserRoleServer } from '@/_utils/role-detector';
import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@/middleware';

export async function GET(request: NextRequest) {
  try {
    // Verify customer role (or admin)
    const userRole = await getUserRoleServer();

    if (userRole !== UserRole.CUSTOMER && userRole !== UserRole.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Mock customer dashboard data
    const customerData = {
      recentOrders: [
        {
          id: 'ORD-001',
          date: new Date(Date.now() - 86400000).toISOString(),
          status: 'delivered',
          total: 299.99,
          items: [
            {
              productId: '1',
              name: 'AirPods Pro',
              quantity: 1,
              price: 249.99,
            },
          ],
        },
      ],
      wishlistCount: 12,
      recommendations: [
        {
          id: '3',
          name: 'iPhone 15 Pro Case',
          price: 49.99,
          image: '/api/placeholder/150/150',
          rating: 4.6,
        },
      ],
      accountStatus: 'Premium Member',
    };

    return NextResponse.json(customerData);
  } catch (error) {
    console.error('Customer dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
