import { GOALS_NEW, STICKERS } from '@/constant/pathname';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className='w-full shadow-md flex justify-around bg-background drop-shadow-2xl'>
            <Link href={GOALS_NEW} className='flex flex-col items-center p-1.5 w-full'>
                <span className='text-lg'>➕</span>
                <p>Add</p>
            </Link>
            <Link href={STICKERS} className='flex flex-col items-center p-1.5 w-full'>
                <span className='text-lg'>👻</span>
                <p>Stickers</p>
            </Link>
        </div>
    );
};

export default Footer;
