/* lib/session.ts */
export interface UserSession {
  id: string;
  userId?: string;
  startTime: number;
  lastActivity: number;
  isAdmin: boolean;
}

class SessionManager {
  private session: UserSession;

  constructor() {
    this.session = this.createSession();
  }

  getSession(): UserSession {
    return { ...this.session };
  }

  updateActivity() {
    this.session.lastActivity = Date.now();
  }

  validateAdminAccess(): boolean {
    /* In real app, validate against backend */
    return this.session.isAdmin;
  }

  private createSession(): UserSession {
    return {
      id: `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      startTime: Date.now(),
      lastActivity: Date.now(),
      isAdmin: true /* For demo purposes */,
    };
  }
}

export const sessionManager = new SessionManager();
