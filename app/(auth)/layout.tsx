import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    template: '%s | Auth - Claudazon',
    default: 'Sign In - Claudazon',
  },
  description: 'Sign in to your Claudazon account',
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <span className="text-3xl font-bold text-[#131921]">claudazon</span>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="text-xs text-gray-500 space-x-4">
          <Link href="/conditions" className="hover:text-[#007185]">
            Conditions of Use
          </Link>
          <Link href="/privacy" className="hover:text-[#007185]">
            Privacy Notice
          </Link>
          <Link href="/help" className="hover:text-[#007185]">
            Help
          </Link>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          © 1996-2025, Claudazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}
