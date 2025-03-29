import { getUserInfo } from '@/app/actions/userActions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SETTINGS } from '@/constant/pathname';
import { ContactRound } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

const Profile = async () => {
  const {
    data: { nickname, profile_url, description },
  } = await getUserInfo();
  return (
    <div className='flex items-center gap-3 py-3 sm:py-5'>
      <Avatar className='w-16 h-16'>
        <AvatarImage src={profile_url} />
        <AvatarFallback>
          <Skeleton className='w-full h-full' />
        </AvatarFallback>
      </Avatar>

      <div className='grow'>
        <p className='text-base sm:text-lg'>{nickname}</p>
        <p className='text-sm sm:text-base text-gray-500'>{description || '나를 위한 한마디를 적어보세요'} </p>
      </div>

      <Link href={SETTINGS}>
        <Button variant={'ghost'} size={'icon'}>
          <ContactRound />
        </Button>
      </Link>
    </div>
  );
};

export default Profile;
