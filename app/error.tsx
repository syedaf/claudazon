// app/error.tsx (10 lines)
'use client';

import { SmartError } from '@components/ui/smart-error';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <SmartError
      error={error}
      resetAction={reset}
      context="global"
      title="Application Error"
    />
  );
}
