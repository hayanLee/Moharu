'use client';
import ChallengeCard from '@/components/Card/ChallengeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { GOAL_DETAIL } from '@/constant/pathname';
import useMileStones from '@/hooks/querys/useMileStones';
import Link from 'next/link';
import ChallengeListSkeleton from '../../_components/ChallengeListSkeleton';

const FinishedChallengeList = () => {
  const { data, isPending } = useMileStones();
  if (!data || isPending)
    return (
      <>
        <h3 className='mx-auto flex items-center gap-2'>
          🏆 완료한 챌린지 수 : <Skeleton className='w-4 h-4' />
        </h3>
        <ChallengeListSkeleton />
      </>
    );
  const { data: finishedGoals } = data;

  return (
    <>
      <h3 className='mx-auto'>
        🏆 완료한 챌린지 수 : <span className='font-bold'>{finishedGoals.length}</span>
      </h3>
      <section className='overflow-y-auto scrollbar-hide'>
        {finishedGoals.map((habit) => (
          <Link href={GOAL_DETAIL(habit.id)} key={habit.id}>
            <ChallengeCard habit={habit} />
          </Link>
        ))}
      </section>
    </>
  );
};

export default FinishedChallengeList;
