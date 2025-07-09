// Replace your auth-form.tsx with this:

'use client';

import { useState } from 'react';
import { Button } from '@/_shared/components/ui/button';
import { Analytics } from '@/_shared/lib/analytics';

interface AuthFormProps {
  type: 'login' | 'register' | 'forgot-password';
  onSubmitAction: (data: Record<string, string>) => Promise<void>;
}

export function AuthForm({ type, onSubmitAction }: AuthFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    Analytics.track('auth_attempt', {
      type,
      email: formData.email || 'unknown',
    });

    try {
      await onSubmitAction(formData);
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fieldConfig = {
    'login': [
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'password', label: 'Password', type: 'password' },
    ],
    'register': [
      { name: 'name', label: 'Full Name', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'password', label: 'Password', type: 'password' },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
    ],
    'forgot-password': [{ name: 'email', label: 'Email', type: 'email' }],
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fieldConfig[type].map(field => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          <input
            type={field.type}
            value={formData[field.name] || ''}
            onChange={e =>
              setFormData(prev => ({
                ...prev,
                [field.name]: e.target.value,
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      ))}

      <Button variant="default" size="lg" type="submit" disabled={isLoading}>
        {isLoading
          ? 'Processing...'
          : type.charAt(0).toUpperCase() + type.slice(1)}
      </Button>
    </form>
  );
}
