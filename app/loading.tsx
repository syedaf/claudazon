// app/loading.tsx
export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff9900] mx-auto"></div>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-[#131921]">Claudazon</div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    </div>
  );
}
