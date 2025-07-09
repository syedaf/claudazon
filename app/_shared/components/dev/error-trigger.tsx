// components/dev/error-trigger.tsx
'use client';

import { useState } from 'react';

export function ErrorTrigger() {
  const [shouldError, setShouldError] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  // Trigger error during render (caught by error boundary)
  if (shouldError) {
    throw new Error('Test product error - triggered by ErrorTrigger component');
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-[9999]">
      <h4 className="text-sm font-semibold mb-2">Dev Error Test</h4>
      <button
        onClick={() => {
          console.log('Triggering error...');
          setShouldError(true); // This will cause a re-render and throw error
        }}
        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
      >
        Trigger Error
      </button>
    </div>
  );
}
