import Providers from '@/providers';
import type { Metadata } from 'next';
import { DynaPuff } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const dynapuff = DynaPuff({
    subsets: ['latin'],
});

const pretendard = localFont({
    src: '../assets/fonts/PretendardVariable.woff2',
    variable: '--font-pretendard',
});

export const metadata: Metadata = {
    title: 'Habit-challenge',
    description: '사용자가 목표를 달성하며 랜덤 스티커를 수집하고 컬렉션을 완성하는 동기부여 어플리케이션',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='ko' className={`${dynapuff.className} ${pretendard.variable}`}>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
