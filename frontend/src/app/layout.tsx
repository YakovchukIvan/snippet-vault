import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Snippet Vault',
  description: 'Save and manage your snippets',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-zinc-950 text-zinc-100">
        <div className="mx-auto max-w-7xl min-h-screen border-x border-zinc-800">{children}</div>
      </body>
    </html>
  );
}
