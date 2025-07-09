interface BaseLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function BaseLayout({
  children,
  header,
  sidebar,
  footer,
  className = '',
}: BaseLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {header && <header className="sticky top-0 z-50">{header}</header>}

      <div className="flex flex-1">
        {sidebar && <aside className="flex-shrink-0">{sidebar}</aside>}

        <main className="flex-1">{children}</main>
      </div>

      {footer && <footer>{footer}</footer>}
    </div>
  );
}
