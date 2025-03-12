import { UserInfo } from '@/app/actions/types/response';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type VerticalProfileProps = {
  userInfo: UserInfo;
};

const VerticalProfile = ({ userInfo }: VerticalProfileProps) => {
  const { nickname, profile_url, description } = userInfo;
  return (
    <div className='flex flex-col items-center'>
      <Avatar className='w-16 h-16'>
        <AvatarImage src={profile_url} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className='flex flex-col items-center'>
        <p className='text-lg'>{nickname}</p>
        <p className='text-gray-500'>{description}</p>
      </div>
    </div>
  );
};

export default VerticalProfile;
