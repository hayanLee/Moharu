'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useProfile from '@/hooks/querys/useProfile';
import { Skeleton } from '../ui/skeleton';
import ProfileSkeleton from './ProfileSkeleton';

const VerticalProfile = () => {
  const { data, isPending } = useProfile();
  if (!data || isPending) return <ProfileSkeleton />;
  const {
    data: { nickname, profile_url, description },
  } = data;

  return (
    <div className='flex flex-col items-center'>
      <Avatar className='w-16 h-16'>
        <AvatarImage src={profile_url} />
        <AvatarFallback>
          <Skeleton className='w-full h-full' />
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col items-center p-2'>
        <p className='text-base sm:text-lg'>{nickname}</p>
        <p className='text-sm sm:text-base text-gray-500'>{description || '나를 위한 한마디를 적어보세요'} </p>
      </div>
    </div>
  );
};

export default VerticalProfile;
