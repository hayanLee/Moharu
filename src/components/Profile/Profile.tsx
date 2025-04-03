'use client';
import { SETTINGS } from '@/constant/pathname';
import useProfile from '@/hooks/querys/useProfile';
import { Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import ProfileSkeleton from './ProfileSkeleton';

const Profile = () => {
  const { data, isPending } = useProfile();
  if (!data || isPending) return <ProfileSkeleton />;
  const {
    data: { nickname, profile_url, description },
  } = data;

  return (
    <div className='flex items-center gap-3 py-3 sm:py-5'>
      <div className='w-16 h-16 relative'>
        <Image
          src={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/${profile_url}`}
          alt='유저 프로필 이미지'
          fill
          priority
          className='aspect-square object-cover rounded-full'
        />
      </div>

      <div className='grow'>
        <p className='text-base sm:text-lg'>{nickname}</p>
        <p className='text-sm sm:text-base text-gray-500'>{description || '나를 위한 한마디를 적어보세요'} </p>
      </div>

      <Link href={SETTINGS}>
        <Button variant={'ghost'} size={'icon'}>
          <Settings />
        </Button>
      </Link>
    </div>
  );
};

export default Profile;
