// app/_shared/lib/analytics.tsx

'use client';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
  userId?: string;
}

export class Analytics {
  private static events: AnalyticsEvent[] = [];

  static track(
    name: string,
    properties?: Record<string, string | number | boolean>,
    userId?: string
  ): void {
    const event: AnalyticsEvent = {
      name,
      properties,
      userId,
    };

    // Store the event
    this.events.push(event);

    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
      return;
    }

    // Production analytics implementation
    this.sendToAnalyticsService(event);
  }


  // Helper methods for common events
  static trackPageView(page: string, userId?: string): void {
    this.track('page_viewed', { page }, userId);
  }


  static trackUserAction(
    action: string,
    properties?: Record<string, string | number | boolean>,
    userId?: string
  ): void {
    this.track('user_action', { action, ...properties }, userId);
  }


  static trackError(error: string, context?: string, userId?: string): void {
    this.track(
      'error_occurred',
      {
        error,
        ...(context && { context }),
      },
      userId
    );
  }


  // Get all events (for dashboard)
  static getEvents(): AnalyticsEvent[] {
    return this.events;
  }


  // Clear events (for testing/cleanup)
  static clearEvents(): void {
    this.events = [];
  }


  private static sendToAnalyticsService(event: AnalyticsEvent): void {
    // Implementation for production analytics service
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    }).catch(error => {
      console.error('Analytics tracking failed:', error);
    });
  }
}

// Also export an instance for those who prefer that pattern
export const analytics = {
  track: Analytics.track.bind(Analytics),
  trackPageView: Analytics.trackPageView.bind(Analytics),
  trackUserAction: Analytics.trackUserAction.bind(Analytics),
  trackError: Analytics.trackError.bind(Analytics),
  getEvents: Analytics.getEvents.bind(Analytics),
  clearEvents: Analytics.clearEvents.bind(Analytics),
};

// Export the interface for type checking
export type { AnalyticsEvent };
