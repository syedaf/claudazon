;
// app/(admin)/layout.tsx
import { Metadata } from 'next';
import { AuthGuard } from '@/_shared/components/auth/auth-guard';
import { AdminProvider } from '@/_shared/lib/admin-context';
import { AdminBreadcrumbs } from './_components/admin-breadcrumbs';
import { AdminHeader } from './_components/admin-nav';


export const metadata: Metadata = {
  title: {
    template: '%s | Admin - Claudazon',
    default: 'Admin Dashboard - Claudazon',
  },
  description: 'Claudazon Admin Panel - Enterprise Management',
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthGuard requiredRole="admin" redirectTo="/auth/login">
      <AdminProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Uses group-specific component */}
          <AdminHeader />

          <div className="flex">
            <aside className="w-64 bg-gray-900">
              {/* Admin-specific sidebar content */}
            </aside>

            <main className="flex-1">
              {/* Uses group-specific component */}
              <AdminBreadcrumbs />

              <div className="p-6">{children}</div>
            </main>
          </div>
        </div>
      </AdminProvider>
    </AuthGuard>
  );
}
