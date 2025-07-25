import { DashboardHeader } from '@/_dashboard/_components/dashboard-header';
import { getUserRoleServer } from '@/_utils/role-detector';
import { RoleNav } from '@/shared/components/navigation/role-nav';
import { RoleProvider } from '@/shared/providers/role-provider';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const userRole = await getUserRoleServer();

  return (
    <RoleProvider initialRole={userRole}>
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Header */}
        <DashboardHeader userRole={userRole} />

        <div className="flex">
          {/* Role-based Navigation */}
          <aside className="w-64 bg-white shadow-sm">
            <RoleNav userRole={userRole} />
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </RoleProvider>
  );
}
