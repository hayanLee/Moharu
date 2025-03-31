import { Skeleton } from '@/components/ui/skeleton';

const ChallengeListSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='w-full h-20' />
      <Skeleton className='w-full h-20' />
      <Skeleton className='w-full h-20' />
      <Skeleton className='w-full h-20' />
    </div>
  );
};

export default ChallengeListSkeleton;
