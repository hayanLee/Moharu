'use client';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { Toaster } from '@/components/ui/toaster';
import useProfile from '@/hooks/querys/useProfile';
import { PropsWithChildren, useEffect } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  const { data } = useProfile();
  useEffect(() => {
    if (data?.data.color) {
      document.documentElement.style.setProperty('--point', data.data.color);
    }
  }, [data?.data.color]);

  return (
    <div className='h-dvh'>
      <div className='max-w-full md:max-w-2xl mx-auto h-full bg-background flex flex-col'>
        <Header />
        <main className='flex-grow min-h-0 px-4'>{children}</main>
        <Footer />
        <Toaster />
      </div>
    </div>
  );
};

export default MainLayout;
