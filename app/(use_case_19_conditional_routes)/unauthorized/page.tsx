'use client';

import { useUserRole } from '../_utils/role-detector';

export default function UnauthorizedPage() {
  const userRole = useUserRole();

  const handleSetRole = (role: string) => {
    document.cookie = `test-role=${role}; path=/`;
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Required
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to access the dashboard.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Current role: <span className="font-medium">{userRole}</span>
          </p>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">
              Demo: Set Role
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => handleSetRole('customer')}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login as Customer
              </button>
              <button
                onClick={() => handleSetRole('admin')}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Login as Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
