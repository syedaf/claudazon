// app/(shop)/products/loading.tsx
export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96" />
      ))}
    </div>
  );
}
