import LogOutButton from '@/components/Button/LogOutButton';
import VerticalProfile from '@/components/Profile/VerticalProfile';
import { SETTINGS_ALARM, SETTINGS_PROFILE, SETTINGS_THEME } from '@/constant/pathname';
import { BellRing, Palette, UserRoundPen } from 'lucide-react';
import Link from 'next/link';

const Settings = () => {
  return (
    <div>
      <VerticalProfile />
      <div className='py-3'>
        <ul className='flex flex-col gap-2'>
          <li className='p-2 border rounded-sm bg-background hover:brightness-95'>
            <Link href={SETTINGS_PROFILE} className='flex items-center gap-2 '>
              <UserRoundPen size={16} />
              프로필 설정
            </Link>
          </li>
          <li className='p-2 border rounded-sm bg-background hover:brightness-95'>
            <Link href={SETTINGS_THEME} className='flex items-center gap-2 '>
              <Palette size={16} />
              테마 설정
            </Link>
          </li>
          <li className='p-2 border rounded-sm bg-background hover:brightness-95'>
            <Link href={SETTINGS_ALARM} className='flex items-center gap-2 '>
              <BellRing size={16} />
              알림 설정
            </Link>
          </li>
        </ul>
      </div>
      <LogOutButton />
    </div>
  );
};

export default Settings;
