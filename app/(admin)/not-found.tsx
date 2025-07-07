;
// app/(admin)/not-found.tsx
import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import { NotFoundLayout } from '@components/error/not-found-layout';
import { generateNotFoundMetadata } from '@lib/not-found-utils';


export const metadata: Metadata = generateNotFoundMetadata(
  'admin',
  'Admin Page Not Found - Claudazon'
);

export default function AdminNotFound() {
  return (
    <NotFoundLayout
      icon={<Shield className="h-12 w-12 text-orange-400" />}
      title="Admin Page Not Found"
      description="The admin page you're looking for doesn't exist."
      section="admin"
    />
  );
}
