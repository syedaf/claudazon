;
// File 3: app/(shop)/products/[id]/layout.tsx
// Updated layout to include SlotProvider and conditional slot rendering

import { SlotProvider } from '@/_shared/components/slot-context/slot-context';


interface ProductLayoutProps {
  children: React.ReactNode;
  reviews: React.ReactNode;
  specs: React.ReactNode;
  qa: React.ReactNode;
}

export default function ProductLayout({
  children,
  reviews,
  specs,
  qa,
}: ProductLayoutProps) {
  return (
    <SlotProvider>
      <div className="container mx-auto px-4 py-8">
        {/* Main product content */}
        <div className="mb-8">{children}</div>

        {/* Conditional Slot Rendering - Use Case #15 Demo */}
        <div className="grid gap-6">
          {/* Reviews slot - conditionally rendered */}
          <div className="w-full">{reviews}</div>

          {/* Specs slot - always shown */}
          <div className="w-full">{specs}</div>

          {/* Q&A slot - always shown */}
          <div className="w-full">{qa}</div>
        </div>
      </div>
    </SlotProvider>
  );
}
