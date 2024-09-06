import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from './header/page';
import logo from '@/images/logo.png';
import Footer from './footer/page';
import CookieConsent from '@/components/Cookie-consent';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  subsets: ['latin'],
  weight: '300',
});

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
        <link href={logo.src} rel='shortcut icon' type='image/x-icon' />
      </head>
      <body className={roboto.className}>
        <Header />
        {children}
        <CookieConsent />
        <Footer />
      </body>
    </html>
  );
}
