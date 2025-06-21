;
// app/browse/layout.tsx - Optional: Shared layout for browse section
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: {
    template: '%s | Browse - Claudazon',
    default: 'Browse Categories - Claudazon',
  },
  description:
    'Browse our extensive collection of products organized by category. Find exactly what you need with our flexible navigation system.',
  keywords: ['browse', 'categories', 'shopping', 'products', 'navigation'],
};

interface BrowseLayoutProps {
  children: React.ReactNode;
}

export default function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <>
      {/* You could add browse-specific navigation, filters, or other shared UI here */}
      {children}
    </>
  );
}
