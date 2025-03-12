import { getUserInfo } from '@/app/actions/userActions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MYPAGE } from '@/constant/pathname';
import { ContactRound } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const Profile = async () => {
  const {
    data: { nickname, profile_url, description },
  } = await getUserInfo();
  return (
    <div className='flex items-center gap-3 py-5'>
      <Avatar className='w-16 h-16'>
        <AvatarImage src={profile_url} />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>

      <div className='grow'>
        <p className='text-lg'>{nickname}</p>
        <p className='text-gray-500'>{description}</p>
      </div>

      <Button asChild variant={'ghost'} size={'icon'}>
        <Link href={MYPAGE}>
          <ContactRound size={30} />
        </Link>
      </Button>
    </div>
  );
};

export default Profile;
