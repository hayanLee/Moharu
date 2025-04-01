import { Skeleton } from '@/components/ui/skeleton';

const ChallengeDetailSkeleton = () => {
  return (
    <div className='grid grid-rows-[auto_1fr_auto] gap-3 sm:gap-5 h-full mb-3'>
      {/* header */}
      <div className='flex justify-between items-center overflow-hidden'>
        <div className='min-w-0'>
          <Skeleton className='w-36 sm:w-48 h-7 rounded-md' />
          <Skeleton className='w-24 sm:w-32 h-6 mt-1 rounded-md' />
        </div>
        <div className='flex space-x-4'>
          <Skeleton className='w-8 h-8 rounded-md' />
          <Skeleton className='w-8 h-8 rounded-md' />
        </div>
      </div>
      {/* grid */}
      <div className='grid grid-cols-5 gap-2 auto-rows-min sm:gap-5'>
        {Array.from({ length: 14 }).map((_, idx) => (
          <Skeleton key={idx} className='rounded-full aspect-square border-2 sm:text-xl' />
        ))}
      </div>
      {/* 제출 버튼 */}
      <Skeleton className='w-1/2 mx-auto h-10 rounded-md mt-2' />
    </div>
  );
};

export default ChallengeDetailSkeleton;
