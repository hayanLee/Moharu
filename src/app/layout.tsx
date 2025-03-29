import Providers from '@/providers';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '모하루(Moharu)',
  description: '목표를 달성하며 스티커를 수집하는 습관 형성 도움 어플리케이션',
  icons: {
    icon: '/icons/icon-32x32.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
