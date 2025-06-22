'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingCart } from 'lucide-react';

export default function ShopHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#131921] text-white sticky top-0 z-50">
      <div className="container mx-auto">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-[60px] px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-white hover:text-[#ff9900] transition-colors">
              claudazon
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="flex">
              <select className="bg-[#f3f3f3] text-black px-3 py-2 rounded-l-md border-r">
                <option>All</option>
                <option>Electronics</option>
                <option>Books</option>
                <option>Home</option>
              </select>
              <input
                type="text"
                placeholder="Search Claudazon"
                className="flex-1 px-4 py-2 text-black"
              />
              <button className="bg-[#ff9900] px-4 py-2 rounded-r-md hover:bg-[#e88900] transition-colors">
                <Search className="h-5 w-5 text-black" />
              </button>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Account */}
            <Link
              href="/auth/login"
              className="hidden md:flex flex-col items-center hover:text-[#ff9900] transition-colors"
            >
              <span className="text-xs">Hello, sign in</span>
              <span className="font-bold">Account & Lists</span>
            </Link>

            {/* Returns & Orders */}
            <Link
              href="/account/orders"
              className="hidden md:flex flex-col items-center hover:text-[#ff9900] transition-colors"
            >
              <span className="text-xs">Returns</span>
              <span className="font-bold">& Orders</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center hover:text-[#ff9900] transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="h-8 w-8" />
                <span className="absolute -top-2 -right-2 bg-[#ff9900] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  0
                </span>
              </div>
              <span className="ml-2 hidden md:block font-bold">Cart</span>
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex">
            <input
              type="text"
              placeholder="Search Claudazon"
              className="flex-1 px-4 py-2 text-black rounded-l-md"
            />
            <button className="bg-[#ff9900] px-4 py-2 rounded-r-md">
              <Search className="h-5 w-5 text-black" />
            </button>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="bg-[#232f3e] px-4 py-2 hidden md:block">
          <div className="flex items-center space-x-6 text-sm">
            <button className="flex items-center hover:text-[#ff9900] transition-colors">
              <Menu className="h-4 w-4 mr-2" />
              All
            </button>
            <Link
              href="/products"
              className="hover:text-[#ff9900] transition-colors"
            >
              Today's Deals
            </Link>
            <Link
              href="/categories/electronics"
              className="hover:text-[#ff9900] transition-colors"
            >
              Electronics
            </Link>
            <Link
              href="/categories/books"
              className="hover:text-[#ff9900] transition-colors"
            >
              Books
            </Link>
            <Link
              href="/categories/home"
              className="hover:text-[#ff9900] transition-colors"
            >
              Home & Garden
            </Link>
            <Link
              href="/prime"
              className="hover:text-[#ff9900] transition-colors"
            >
              Prime
            </Link>
            <Link
              href="/fashion"
              className="hover:text-[#ff9900] transition-colors"
            >
              Fashion
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
