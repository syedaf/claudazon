export default function SpecsLoading() {
  return (
    <div className="py-6">
      <div className="animate-pulse space-y-6">
        <div className="bg-gray-200 rounded-lg h-64"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-200 rounded-lg h-48"></div>
          <div className="bg-gray-200 rounded-lg h-48"></div>
        </div>
      </div>
    </div>
  );
}
