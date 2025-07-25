export function AdminNav() {
  return (
    <div className="flex space-x-3">
      <a
        href="/dashboard/admin/inventory"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
      >
        Manage Inventory
      </a>
      <a
        href="/dashboard/admin"
        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
      >
        View Analytics
      </a>
    </div>
  );
}
