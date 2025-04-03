'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SETTINGS } from '@/constant/pathname';
import useProfile from '@/hooks/querys/useProfile';
import { Settings } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import ProfileSkeleton from './ProfileSkeleton';

const Profile = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const { data, isPending } = useProfile();
  if (!data || isPending) return <ProfileSkeleton />;
  const {
    data: { nickname, profile_url, description },
  } = data;

  return (
    <div className='flex items-center gap-3 py-3 sm:py-5'>
      <div className='w-16 h-16 relative'>
        <Avatar className='w-full h-full'>
          <AvatarImage
            src={`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.supabase.co/storage/v1/object/public/${profile_url}`}
            className={`transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setImageLoading(false)}
          />
          <AvatarFallback delayMs={600}>
            <Skeleton className='w-full h-full' />
          </AvatarFallback>
        </Avatar>
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
