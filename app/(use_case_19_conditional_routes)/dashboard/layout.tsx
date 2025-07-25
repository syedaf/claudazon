import { DashboardHeader } from '@/_dashboard/_components/dashboard-header';
import { getUserRoleServer } from '../_utils/role-detector';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const userRole = await getUserRoleServer();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userRole={userRole} />
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
