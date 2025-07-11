'use client';

export default function ReviewsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-6">
      <div className="text-center p-8 border border-red-200 rounded-lg bg-red-50">
        <h3 className="text-lg font-medium text-red-900 mb-2">
          Unable to load reviews
        </h3>
        <p className="text-red-700 mb-4">
          There was a problem loading the product reviews.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
