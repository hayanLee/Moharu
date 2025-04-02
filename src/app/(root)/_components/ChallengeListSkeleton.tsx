import { Skeleton } from '@/components/ui/skeleton';

const ChallengeListSkeleton = () => {
  return (
    <div className='flex flex-col gap-4 mt-3'>
      {Array.from({ length: 4 }).map((_, idx) => (
        <Skeleton key={idx} className='w-full h-24 sm:h-28' />
      ))}
    </div>
  );
};

export default ChallengeListSkeleton;
