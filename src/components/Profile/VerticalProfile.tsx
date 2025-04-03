'use client';
import useProfile from '@/hooks/querys/useProfile';
import Image from 'next/image';
import ProfileSkeleton from './ProfileSkeleton';

const VerticalProfile = () => {
  const { data, isPending } = useProfile();
  if (!data || isPending) return <ProfileSkeleton vertical />;
  const {
    data: { nickname, profile_url, description },
  } = data;

  return (
    <div className='flex flex-col items-center'>
      <div className='w-16 h-16 relative  border-2 rounded-full border-point'>
        <Image
          src={
            profile_url
              ? `https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/${profile_url}`
              : '/stickers/1.webp'
          }
          alt='유저 프로필 이미지'
          fill
          sizes='128px'
          priority
          className='aspect-square object-cover rounded-full'
        />
      </div>
      <div className='flex flex-col items-center p-2'>
        <p className='text-base sm:text-lg'>{nickname}</p>
        <p className='text-sm sm:text-base text-gray-500'>{description || '나를 위한 한마디를 적어보세요'} </p>
      </div>
    </div>
  );
};

export default VerticalProfile;
