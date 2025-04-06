import Providers from '@/providers';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const nanumSquareRound = localFont({
  src: [
    {
      path: './fonts/nanum-square-round/NanumSquareRoundEB.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/nanum-square-round/NanumSquareRoundB.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/nanum-square-round/NanumSquareRoundR.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/nanum-square-round/NanumSquareRoundL.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: false,
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export const metadata: Metadata = {
  title: '모하루(Moharu)',
  description: '목표를 달성하며 스티커를 수집하는 습관 형성 도움 어플리케이션',
  manifest: `${process.env.NEXT_PUBLIC_BASE_URL}/manifest.json`,
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
    <html lang='ko' className={nanumSquareRound.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
