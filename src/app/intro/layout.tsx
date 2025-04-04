import { Toaster } from '@/components/ui/toaster';
import { PropsWithChildren } from 'react';

const IntroLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='h-dvh'>
      <div className='max-w-full md:max-w-2xl mx-auto h-full bg-background flex flex-col'>
        <main className='flex flex-col items-center justify-center grow bg-background px-4'>{children}</main>
        <Toaster />
      </div>
    </div>
  );
};

export default IntroLayout;
