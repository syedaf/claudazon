;
// _shared/components/ui/page-header.tsx
import { ReactNode } from 'react';


interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  variant?: 'admin' | 'shop' | 'auth' | 'internal' | 'public';
}

export function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
  variant = 'shop',
}: PageHeaderProps) {
  const variantStyles = {
    admin: 'bg-gray-900 text-white border-b border-gray-700',
    shop: 'bg-white text-gray-900 border-b border-gray-200',
    auth: 'bg-blue-50 text-blue-900 border-b border-blue-200',
    internal: 'bg-gray-800 text-green-400 border-b border-gray-700',
    public: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
  };

  return (
    <header className={`p-6 ${variantStyles[variant]}`}>
      {breadcrumbs && (
        <nav className="mb-4">
          <ol className="flex space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:underline opacity-75">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="font-medium">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="mt-1 opacity-75">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
