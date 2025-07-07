;
// app/not-found.tsx (enhanced)
import { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { NotFoundLayout } from '@components/error/not-found-layout';
import { RecoveryActions } from '@components/error/recovery-actions';
import { generateNotFoundMetadata } from '@lib/not-found-utils';


export const metadata: Metadata = generateNotFoundMetadata(
  'page',
  '404 - Page Not Found - Claudazon'
);

export default function GlobalNotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Claudazon</h1>
        </div>
      </header>

      <NotFoundLayout
        icon={<AlertTriangle className="h-16 w-16 text-gray-400" />}
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have been moved."
        section="global"
      >
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">
            What can you do?
          </h3>
          <RecoveryActions section="global" />
        </div>
      </NotFoundLayout>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            © 2025 Claudazon. Built with Next.js App Router - Pattern #10: Not
            Found Pages
          </p>
        </div>
      </footer>
    </div>
  );
}
