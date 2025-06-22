import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Claudazon',
    default: 'Claudazon - Your Everything Store',
  },
  description:
    'Amazon clone built with Next.js 14 showcasing advanced routing patterns',
  keywords: ['e-commerce', 'next.js', 'react', 'typescript', 'amazon clone'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
