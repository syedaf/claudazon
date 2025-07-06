// lib/error-utils.tsx
export enum ErrorType {
  CLIENT = 'client_error',
  NETWORK = 'network_error',
  AUTH = 'auth_error',
  BUSINESS = 'business_error',
}

export interface ErrorInfo {
  type: ErrorType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userMessage: string;
  recoverable: boolean;
  retryable: boolean;
}

// Smart error classification utility
export const ErrorClassifier = {
  classify: (error: Error, context?: string): ErrorInfo => {
    const msg = error.message.toLowerCase();

    // Network errors
    if (msg.includes('fetch') || msg.includes('network')) {
      return {
        type: ErrorType.NETWORK,
        severity: 'high',
        userMessage:
          'Connection issue. Please check your internet and try again.',
        recoverable: true,
        retryable: true,
      };
    }

    // Auth errors
    if (msg.includes('unauthorized') || msg.includes('forbidden')) {
      return {
        type: ErrorType.AUTH,
        severity: 'high',
        userMessage: 'Please sign in to continue.',
        recoverable: true,
        retryable: false,
      };
    }

    // Context-specific messages
    if (context === 'product' && msg.includes('404')) {
      return {
        type: ErrorType.BUSINESS,
        severity: 'medium',
        userMessage: 'Product not found. It may have been removed.',
        recoverable: true,
        retryable: false,
      };
    }

    // Default client error
    return {
      type: ErrorType.CLIENT,
      severity: 'medium',
      userMessage: 'Something went wrong. Please try again.',
      recoverable: true,
      retryable: true,
    };
  },
};

// Analytics utility (enterprise-ready)
export const ErrorTracker = {
  track: (error: Error, errorInfo: ErrorInfo, context: string) => {
    // Ready for enterprise analytics
    console.log('🚨 Error tracked:', {
      error: error.message,
      ...errorInfo,
      context,
    });

    // TODO: In enterprise version, send to analytics service
    // analytics.track('error_boundary_triggered', { ... })
  },

  trackRecovery: (errorId: string, method: string, success: boolean) => {
    console.log('🔄 Recovery tracked:', { errorId, method, success });
    // TODO: Track recovery attempts
  },
};

// Recovery strategies
export const getRecoveryActions = (errorInfo: ErrorInfo) => {
  const actions = [];

  if (errorInfo.retryable) {
    actions.push({ label: 'Try Again', action: 'retry', primary: true });
  }

  if (errorInfo.type === ErrorType.AUTH) {
    actions.push({
      label: 'Sign In',
      action: 'auth',
      primary: !errorInfo.retryable,
    });
  }

  actions.push({ label: 'Go Home', action: 'home' });

  return actions;
};
