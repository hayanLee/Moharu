import { getUserInfo } from '@/app/actions/userActions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfileEditDialog from '../Dialog/ProfileEditDialog';
import { Skeleton } from '../ui/skeleton';

const Profile = async () => {
  const {
    data: { nickname, profile_url, description },
  } = await getUserInfo();
  return (
    <div className='flex items-center gap-3 py-5'>
      <Avatar className='w-16 h-16'>
        <AvatarImage src={profile_url} />
        <AvatarFallback>
          <Skeleton className='w-full h-full' />
        </AvatarFallback>
      </Avatar>

      <div className='grow'>
        <p className='text-lg'>{nickname}</p>
        <p className='text-gray-500'>{description || '나를 위한 한마디를 적어보세요'} </p>
      </div>

      <ProfileEditDialog userInfo={{ nickname, profile_url, description }} />
    </div>
  );
};

export default Profile;
