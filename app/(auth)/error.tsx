// app/(auth)/error.tsx (8 lines)
'use client';

import { SmartError } from '@/_shared/components/ui/smart-error';

export default function AuthError({
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
      context="auth"
      title="Authentication Error"
    />
  );
}
