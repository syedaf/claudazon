import ProductListClient from '@/components/client-components/product-list-client';


// Use Case #17
export default function ProductsClientPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Our Products (Client-Side Rendering)
      </h1>
      <ProductListClient />
    </div>
  );
}
