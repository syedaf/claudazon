/* lib/analytics.ts */
export interface AnalyticsEvent {
  event: string;
  page: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  properties?: Record<string, any>;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  track(event: string, properties: Record<string, any> = {}) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      page: window.location.pathname,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      properties,
    };

    this.events.push(analyticsEvent);
    console.log('📊 Analytics:', analyticsEvent);

    /* In real app, send to analytics service */
    /* this.sendToAnalyticsService(analyticsEvent); */
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const analytics = new Analytics();
