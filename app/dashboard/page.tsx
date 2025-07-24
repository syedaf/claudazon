import { getUserRoleServer } from '@/_utils/role-detector';
import { redirect } from 'next/navigation';
import { UserRole } from '@/middleware';

// This component should never actually render due to middleware redirect
// But we include it as a fallback
export default async function DashboardPage() {
  const userRole = await getUserRoleServer();

  // Fallback routing if middleware didn't catch it
  switch (userRole) {
    case UserRole.ADMIN:
      redirect('/dashboard/admin');
    case UserRole.CUSTOMER:
      redirect('/dashboard/customer');
    default:
      redirect('/login?redirect=/dashboard');
  }
}
