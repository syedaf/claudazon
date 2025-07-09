;
// app/(internal)/layout.tsx
import { Metadata } from 'next';
import { DevHeader } from './_components/dev-nav';
import { SystemStats } from './_components/system-stats';


export const metadata: Metadata = {
  title: {
    template: '%s | Dev Tools - Claudazon',
    default: 'Development Tools - Claudazon',
  },
  description: 'Internal development and debugging tools',
  robots: 'noindex, nofollow', // Don't index internal tools
};

interface InternalLayoutProps {
  children: React.ReactNode;
}

export default function InternalLayout({ children }: InternalLayoutProps) {
  // Only show in development environment
  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Internal Tools</h1>
          <p className="text-gray-400">
            Available only in development environment
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DevHeader />
      <div className="flex">
        <aside className="w-64 bg-gray-800 p-4">
          <SystemStats />
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
