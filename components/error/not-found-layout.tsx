// components/error/not-found-layout.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@components/ui/button';
import { NotFoundTracker } from '@lib/not-found-utils';

interface NotFoundLayoutProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  section: string;
  children?: React.ReactNode;
  suggestions?: React.ReactNode;
}

export function NotFoundLayout({
  icon,
  title,
  description,
  section,
  children,
  suggestions,
}: NotFoundLayoutProps) {
  const pathname = usePathname();

  useEffect(() => {
    NotFoundTracker.track({
      section,
      path: pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
    });
  }, [section, pathname]);

  const recoveryActions = NotFoundTracker.getRecoveryActions(section);

  return (
    <div className="min-h-[500px] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="flex justify-center">{icon}</div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            {description}
          </p>
        </div>

        {/* Recovery Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {recoveryActions.map((action, index) => (
            <Link key={action.href} href={action.href}>
              <Button
                variant={action.primary ? 'default' : 'outline'}
                size="lg"
                className="w-full sm:w-auto"
              >
                {action.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* Custom Content */}
        {children && (
          <div className="pt-8 border-t border-gray-200">{children}</div>
        )}

        {/* Suggestions */}
        {suggestions && <div className="pt-8">{suggestions}</div>}
      </div>
    </div>
  );
}
