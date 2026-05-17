import './globals.css';

export const metadata = {
  title: 'Service Request Board',
  description: 'Manage and track service requests easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 min-h-screen font-sans text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        <div className="py-12">
          {children}
        </div>
      </body>
    </html>
  );
}