'use client';
import ChallengeCard from '@/components/Card/ChallengeCard';
import { GOAL_DETAIL } from '@/constant/pathname';
import useChallenges from '@/hooks/querys/useChallenges';
import Link from 'next/link';
import ChallengeListSkeleton from './ChallengeListSkeleton';

const ChallengeList = () => {
  const { data, isPending } = useChallenges();
  if (!data || isPending) return <ChallengeListSkeleton />;

  const {
    data: { todayUntillDone, todayDone },
  } = data;

  return (
    <>
      <h3 className='title'>
        Today <span className='text-point brightness-95'>({todayUntillDone?.length})</span>
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
