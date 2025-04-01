'use client';
import ChallengeCard from '@/components/Card/ChallengeCard';
import { GOAL_DETAIL } from '@/constant/pathname';
import useMileStones from '@/hooks/querys/useMileStones';
import Link from 'next/link';
import ChallengeListSkeleton from '../../_components/ChallengeListSkeleton';

const FinishedChallengeList = () => {
  const { data, isPending } = useMileStones();
  if (!data || isPending) return <ChallengeListSkeleton />;
  const { data: finishedGoals } = data;

  return (
    <section className='overflow-y-auto scrollbar-hide'>
      {finishedGoals.map((habit) => (
        <Link href={GOAL_DETAIL(habit.id)} key={habit.id}>
          <ChallengeCard habit={habit} />
        </Link>
      ))}
    </section>
  );
};

export default FinishedChallengeList;
