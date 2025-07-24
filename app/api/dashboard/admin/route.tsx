import { getUserRoleServer } from '@/_utils/role-detector';
import { NextRequest, NextResponse } from 'next/server';
import { UserRole } from '@/middleware';

export async function GET(request: NextRequest) {
  try {
    // Verify admin role
    const userRole = await getUserRoleServer();

    if (userRole !== UserRole.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Mock admin dashboard data
    const adminData = {
      totalProducts: 1247,
      totalUsers: 8934,
      totalOrders: 2156,
      revenue: 145678.9,
      recentActivity: [
        {
          id: '1',
          type: 'order',
          description: 'New order #ORD-2024-001 received',
          timestamp: new Date().toISOString(),
        },
      ],
    };

    return NextResponse.json(adminData);
  } catch (error) {
    console.error('Admin dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
