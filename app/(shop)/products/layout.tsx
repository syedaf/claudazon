export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Product-specific breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <Breadcrumbs />
        </div>
      </div>

      {/* Products content with enhanced spacing */}
      <div className="bg-slate-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </div>
    </>
  );
}
