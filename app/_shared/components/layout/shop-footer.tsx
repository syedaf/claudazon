'use client';

import Link from 'next/link';

export default function ShopFooter() {
  return (
    <footer className="bg-[#232f3e] text-white mt-8">
      <div className="container mx-auto">
        {/* Back to Top */}
        <div className="bg-[#37475a] py-4 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white hover:text-[#ff9900] transition-colors text-sm"
          >
            Back to top
          </button>
        </div>

        {/* Main Footer Content */}
        <div className="px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Get to Know Us */}
            <div>
              <h3 className="font-bold mb-4">Get to Know Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    About Claudazon
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Press Releases
                  </Link>
                </li>
                <li>
                  <Link
                    href="/investor-relations"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Investor Relations
                  </Link>
                </li>
              </ul>
            </div>

            {/* Make Money with Us */}
            <div>
              <h3 className="font-bold mb-4">Make Money with Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/sell"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Sell products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/affiliate"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Become an Affiliate
                  </Link>
                </li>
                <li>
                  <Link
                    href="/advertising"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Advertise Your Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/self-publish"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Self-Publish with Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Payment Products */}
            <div>
              <h3 className="font-bold mb-4">Claudazon Payment Products</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/credit-card"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Claudazon Business Card
                  </Link>
                </li>
                <li>
                  <Link
                    href="/points"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Shop with Points
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reload"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Reload Your Balance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/currency"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Currency Converter
                  </Link>
                </li>
              </ul>
            </div>

            {/* Let Us Help You */}
            <div>
              <h3 className="font-bold mb-4">Let Us Help You</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/account"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Your Account
                  </Link>
                </li>
                <li>
                  <Link
                    href="/orders"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Your Orders
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Shipping Rates & Policies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/help"
                    className="hover:text-[#ff9900] transition-colors"
                  >
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Logo and Language */}
        <div className="border-t border-[#3a4553] px-4 py-6 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <Link
              href="/public"
              className="text-2xl font-bold hover:text-[#ff9900] transition-colors"
            >
              claudazon
            </Link>
            <div className="flex space-x-4">
              <button className="border border-gray-600 px-3 py-1 rounded text-sm hover:border-[#ff9900] transition-colors">
                🌐 English
              </button>
              <button className="border border-gray-600 px-3 py-1 rounded text-sm hover:border-[#ff9900] transition-colors">
                💲 USD
              </button>
              <button className="border border-gray-600 px-3 py-1 rounded text-sm hover:border-[#ff9900] transition-colors">
                🇺🇸 United States
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="bg-[#131921] px-4 py-4">
          <div className="text-center">
            <div className="flex flex-wrap justify-center space-x-4 mb-4 text-xs">
              <Link
                href="/conditions"
                className="hover:text-[#ff9900] transition-colors"
              >
                Conditions of Use
              </Link>
              <Link
                href="/privacy"
                className="hover:text-[#ff9900] transition-colors"
              >
                Privacy Notice
              </Link>
              <Link
                href="/interest-ads"
                className="hover:text-[#ff9900] transition-colors"
              >
                Interest-Based Ads
              </Link>
            </div>
            <p className="text-xs text-gray-400">
              © 1996-2025, Claudazon.com, Inc. or its affiliates
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
