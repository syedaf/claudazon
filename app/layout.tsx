export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          {/* Global header - always visible */}
          <Header />

          {/* Main content area */}
          <main className="flex-1">{children}</main>

          {/* Global footer - always visible */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
