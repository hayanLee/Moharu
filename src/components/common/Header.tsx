import { HOME } from '@/constant/pathname';
import dayjs from 'dayjs';
import Link from 'next/link';
const now = dayjs();

const Header = () => {
  return (
    <header className='text-black dark:text-white font-bold p-4 flex justify-between items-center'>
      <Link href={HOME} className='font-semibold text-xl sm:text-2xl '>
        모하루
      </Link>
      <span className='text-base'>
        {now.format('MM/DD')} {now.format('ddd')}
      </span>
    </header>
  );
};

export default Header;
