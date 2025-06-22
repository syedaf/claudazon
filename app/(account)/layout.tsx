export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Account sidebar */}
      <aside className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Your Account</h2>
          <nav className="space-y-2">
            <AccountNavLink href="/account/profile">Profile</AccountNavLink>
            <AccountNavLink href="/account/orders">Orders</AccountNavLink>
            <AccountNavLink href="/account/settings">Settings</AccountNavLink>
          </nav>
        </div>
      </aside>

      {/* Account content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
