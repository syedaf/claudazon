import { UserRole } from '@/middleware';

interface DashboardHeaderProps {
  userRole: UserRole;
}

export function DashboardHeader({ userRole }: DashboardHeaderProps) {
  const getRoleDisplay = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'Administrator';
      case UserRole.CUSTOMER:
        return 'Customer';
      default:
        return 'Guest';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Claudazon Dashboard
            </h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {getRoleDisplay(userRole)}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              🔔
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              ⚙️
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
