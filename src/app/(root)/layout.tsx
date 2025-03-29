import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { Toaster } from '@/components/ui/toaster';
import { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='h-screen bg-slate-300'>
      <div className='max-w-full md:max-w-3xl mx-auto h-full bg-background flex flex-col'>
        <Header />
        <main className='flex-grow min-h-0 px-4'>{children}</main>
        <Footer />
        <Toaster />
      </div>
    </div>
  );
};

export default MainLayout;
