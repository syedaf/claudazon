export default function QALoading() {
  return (
    <div className="py-6">
      <div className="animate-pulse space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded w-24"></div>
        </div>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-6 space-y-4"
          >
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
