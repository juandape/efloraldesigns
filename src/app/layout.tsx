import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './header/page';
import logo from '@/images/logo.png';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E Floral Designs',
  description: 'Your local florist for all occasions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link
          href={logo.src}
          rel='shortcut icon'
          type='image/x-icon'
        />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
