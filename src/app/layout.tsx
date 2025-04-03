import Providers from '@/providers';
import type { Metadata } from 'next';
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
});

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
    <html lang='ko' className={nanumSquareRound.className}>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#ffffff' media='(prefers-color-scheme: light)' />
        <meta name='theme-color' content='#000000' media='(prefers-color-scheme: dark)' />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
