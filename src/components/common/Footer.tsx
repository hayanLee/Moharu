import { GOALS_NEW, HOME, MILESTONE } from '@/constant/pathname';
import { CirclePlus, House, LibraryBig } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const Footer = () => {
  return (
    <div className='w-full bg-white border-t'>
      <div className='flex justify-around items-center'>
        <Button variant={'ghost'} asChild size={'full'}>
          <Link href={GOALS_NEW} className='rounded-none p-4'>
            <CirclePlus size={30} strokeWidth={2} />
          </Link>
        </Button>
        <Button variant={'ghost'} asChild size={'full'}>
          <Link href={HOME} className='rounded-none p-4'>
            <House size={30} strokeWidth={2} />
          </Link>
        </Button>
        <Button variant={'ghost'} asChild size={'full'}>
          <Link href={MILESTONE} className='rounded-none p-4'>
            <LibraryBig size={30} strokeWidth={2} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Footer;
