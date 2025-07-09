;
// lib/not-found-utils.tsx

import { analytics } from '@/lib/analytics';


export interface NotFoundContext {
  section: string;
  path: string;
  referrer?: string;
  userAgent?: string;
}

export class NotFoundTracker {
  static track(context: NotFoundContext) {
    analytics.track('404_error', {
      section: context.section,
      path: context.path,
      referrer: context.referrer || '',
      timestamp: Date.now(),
      userAgent: context.userAgent || '',
    });

    // In production, send to error tracking service
    console.log('📊 404 Error Tracked:', context);
  }

  static getRecoveryActions(section: string) {
    const actions = [{ label: 'Go Home', href: '/', primary: false }];

    switch (section) {
      case 'products':
        actions.unshift(
          { label: 'Browse Products', href: '/products', primary: true },
          { label: 'Search Products', href: '/search', primary: false }
        );
        break;
      case 'categories':
        actions.unshift({
          label: 'View Categories',
          href: '/browse',
          primary: true,
        });
        break;
      case 'admin':
        actions.unshift({
          label: 'Admin Dashboard',
          href: '/admin',
          primary: true,
        });
        break;
      case 'auth':
        actions.unshift({
          label: 'Sign In',
          href: '/auth/login',
          primary: true,
        });
        break;
    }

    return actions;
  }
}

export function generateNotFoundMetadata(section: string, title?: string) {
  return {
    title: title || `Page Not Found - Claudazon`,
    description: `The ${section} page you're looking for doesn't exist.`,
    robots: 'noindex, nofollow',
  };
}
