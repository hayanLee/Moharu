import { GOALS_NEW, HOME, MILESTONE } from '@/constant/pathname';
import { CirclePlus, House, LibraryBig } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const Footer = () => {
  return (
    <div className='w-full bg-white'>
      <div className='flex justify-around items-center'>
        <Button variant={'ghost'} asChild size={'full'} className='p-4'>
          <Link href={GOALS_NEW} className='rounded-none'>
            <CirclePlus size={30} strokeWidth={2} />
          </Link>
        </Button>
        <Button variant={'ghost'} asChild size={'full'} className='p-4'>
          <Link href={HOME} className='rounded-none'>
            <House size={30} strokeWidth={2} />
          </Link>
        </Button>
        <Button variant={'ghost'} asChild size={'full'} className='p-4'>
          <Link href={MILESTONE} className='rounded-none'>
            <LibraryBig size={30} strokeWidth={2} />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Footer;
