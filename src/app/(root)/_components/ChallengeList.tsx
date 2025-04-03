'use client';
import ChallengeCard from '@/components/Card/ChallengeCard';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { GOAL_DETAIL } from '@/constant/pathname';
import useChallenges from '@/hooks/querys/useChallenges';
import Link from 'next/link';
import ChallengeListSkeleton from './ChallengeListSkeleton';

const ChallengeList = () => {
  const { data, isPending } = useChallenges();
  if (!data || isPending)
    return (
      <>
        <h3 className='title flex items-center gap-2 text-lg font-semibold'>
          Today
          <span className='relative flex items-center w-24 h-[16px] rounded-full overflow-hidden'>
            <Skeleton className='absolute left-0 top-0 h-full w-full animate-pulse' />
          </span>
        </h3>
        <ChallengeListSkeleton />
      </>
    );

  const {
    data: { todayUntillDone, todayDone, total },
  } = data;

  return (
    <>
      <h3 className='title flex items-center gap-2 text-lg font-semibold'>
        Today
        <div className='relative'>
          <Progress value={((total - todayUntillDone?.length) / total) * 100} className='w-24 h-4' />
          <span className='absolute inset-0 flex items-center justify-center text-sm font-semibold text-black'>
            {total - todayUntillDone?.length} / {total}
          </span>
        </div>
      </h3>

      <div className='overflow-y-auto scrollbar-hide'>
        {!todayUntillDone?.length && (
          <div className='text-center sm:text-lg text-gray-400'>새로운 챌린지를 시작해보세요 !</div>
        )}

        <div className='flex flex-col grow overflow-y-auto scrollbar-hide gap-2 my-3'>
          {todayUntillDone?.map((habit) => (
            <Link href={GOAL_DETAIL(habit.id)} key={habit.id}>
              <ChallengeCard habit={habit} />
            </Link>
          ))}

          {/* 구분선 */}
          <div className='flex items-center my-3'>
            <div className='flex-1 border-t border-dashed border-gray-300' />
            <span className='mx-4 font-semibold'>오늘의 한 걸음</span>
            <div className='flex-1 border-t border-dashed border-gray-300' />
          </div>

          {todayDone?.map((habit) => (
            <Link href={GOAL_DETAIL(habit.id)} key={habit.id}>
              <ChallengeCard habit={habit} success />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChallengeList;
