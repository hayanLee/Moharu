import { Toaster } from '@/components/ui/toaster';
import { PropsWithChildren } from 'react';

const IntroLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='h-screen bg-slate-300'>
      <div className='max-w-full md:max-w-3xl mx-auto h-full bg-background flex flex-col'>
        <main className='flex flex-col items-center justify-center grow bg-white px-4'>{children}</main>
        <Toaster />
      </div>
    </div>
  );
};

export default IntroLayout;
