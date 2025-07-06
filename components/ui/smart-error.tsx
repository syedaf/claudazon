// components/ui/smart-error.tsx
'use client';

import { useEffect, useState } from 'react';
import { AlertTriangle, Home, LogIn, RefreshCw } from 'lucide-react';
import {
  ErrorClassifier,
  ErrorInfo,
  ErrorTracker,
  getRecoveryActions,
} from '@lib/error-utils';

interface SmartErrorProps {
  error: Error & { digest?: string };
  resetAction: () => void;
  context?: string;
  title?: string;
}

export function SmartError({
  error,
  resetAction,
  context = 'general',
  title,
}: SmartErrorProps) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [errorInfo] = useState<ErrorInfo>(() =>
    ErrorClassifier.classify(error, context)
  );

  useEffect(() => {
    // Enterprise analytics tracking
    ErrorTracker.track(error, errorInfo, context);
  }, [error, errorInfo, context]);

  const handleRetry = async () => {
    if (!errorInfo.retryable || isRetrying) return;

    setIsRetrying(true);
    // Add small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    resetAction();
    setIsRetrying(false);
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'retry':
        handleRetry();
        break;
      case 'auth':
        window.location.href = '/auth/login';
        break;
      case 'home':
        window.location.href = '/';
        break;
    }
  };

  const recoveryActions = getRecoveryActions(errorInfo);
  const severityColor = {
    low: 'text-blue-600',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    critical: 'text-red-600',
  }[errorInfo.severity];

  return (
    <div className="min-h-[400px] flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <div className="flex justify-center">
          <AlertTriangle className={`h-12 w-12 ${severityColor}`} />
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">
            {title || 'Something went wrong'}
          </h2>
          <p className="text-gray-600">{errorInfo.userMessage}</p>
        </div>

        {/* Dev Info */}
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left text-xs bg-gray-100 p-3 rounded">
            <summary className="cursor-pointer font-medium">Debug Info</summary>
            <div className="mt-2 space-y-1">
              <div>Error: {error.message}</div>
              <div>Type: {errorInfo.type}</div>
              <div>Severity: {errorInfo.severity}</div>
              <div>Context: {context}</div>
              {error.digest && <div>Digest: {error.digest}</div>}
            </div>
          </details>
        )}

        {/* Recovery Actions */}
        <div className="space-y-3">
          {recoveryActions.map((action, index) => (
            <button
              key={action.action}
              onClick={() => handleAction(action.action)}
              disabled={action.action === 'retry' && isRetrying}
              className={`w-full flex items-center justify-center px-4 py-2 rounded-md transition-colors ${
                action.primary
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              } ${action.action === 'retry' && isRetrying ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {action.action === 'retry' && isRetrying ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  {action.action === 'retry' && (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  {action.action === 'auth' && (
                    <LogIn className="h-4 w-4 mr-2" />
                  )}
                  {action.action === 'home' && (
                    <Home className="h-4 w-4 mr-2" />
                  )}
                  {action.label}
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
