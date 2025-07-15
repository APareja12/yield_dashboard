import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // ← Make sure this line exists

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DeFi Yield Dashboard',
  description: 'Track the best yield opportunities across DeFi protocols',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
