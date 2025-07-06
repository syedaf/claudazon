import { Metadata } from 'next';
import AdminHeader from '@components/layout/admin-header';
import AdminSidebar from '@components/layout/admin-sidebar';

export const metadata: Metadata = {
  title: {
    template: '%s | Admin - Claudazon',
    default: 'Admin Dashboard - Claudazon',
  },
  description: 'Claudazon Admin Panel - Manage your e-commerce platform',
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
