import Link from 'next/link';

export function AdminNav() {
  const quickActions = [
    {
      label: 'Add Product',
      href: '/dashboard/admin/inventory/new',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      label: 'View Reports',
      href: '/dashboard/admin/analytics/reports',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      label: 'Manage Users',
      href: '/dashboard/admin/users',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  return (
    <div className="flex space-x-3">
      {quickActions.map(action => (
        <Link
          key={action.href}
          href={action.href}
          className={`px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors ${action.color}`}
        >
          {action.label}
        </Link>
      ))}
    </div>
  );
}
