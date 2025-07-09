'use client';

import Link from 'next/link';
import { Bell, LogOut, Settings, User } from 'lucide-react';

export default function AdminHeader() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/admin" className="flex items-center">
            <span className="text-2xl font-bold text-[#131921]">claudazon</span>
            <span className="ml-2 text-sm bg-[#ff9900] text-black px-2 py-1 rounded">
              Admin
            </span>
          </Link>

          {/* Admin Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/admin/dashboard"
              className="text-gray-700 hover:text-[#007185] font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/inventory"
              className="text-gray-700 hover:text-[#007185] font-medium"
            >
              Inventory
            </Link>
            <Link
              href="/admin/orders"
              className="text-gray-700 hover:text-[#007185] font-medium"
            >
              Orders
            </Link>
            <Link
              href="/admin/customers"
              className="text-gray-700 hover:text-[#007185] font-medium"
            >
              Customers
            </Link>
            <Link
              href="/admin/analytics"
              className="text-gray-700 hover:text-[#007185] font-medium"
            >
              Analytics
            </Link>
          </nav>

          {/* Admin Actions */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-[#007185] transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>
            <button className="p-2 text-gray-600 hover:text-[#007185] transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#ff9900] rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-black" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                Admin User
              </span>
            </div>
            <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
