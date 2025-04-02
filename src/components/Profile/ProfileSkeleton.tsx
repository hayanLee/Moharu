import { Skeleton } from '../ui/skeleton';

const ProfileSkeleton = ({ vertical }: { vertical?: boolean }) => {
  return vertical ? (
    <div className='flex flex-col items-center'>
      <Skeleton className='w-16 h-16 rounded-full' />
      <div className='flex flex-col items-center p-2'>
        <Skeleton className='w-24 h-5 mb-2' />
        <Skeleton className='w-32 h-4' />
      </div>
    </div>
  ) : (
    <div className='flex items-center gap-3 py-3 sm:py-5'>
      <Skeleton className='w-16 h-16 rounded-full' />
      <div className='grow space-y-2'>
        <Skeleton className='w-32 h-6' />
        <Skeleton className='w-48 h-5' />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
