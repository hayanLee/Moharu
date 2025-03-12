import { getEndedChallenge } from '@/app/actions/challengeActions';
import ChallengeCard from '@/components/Card/ChallengeCard';
import { GOAL_DETAIL } from '@/constant/pathname';
import Link from 'next/link';

const StickersPage = async () => {
  const { data: finishedGoals } = await getEndedChallenge();
  console.log(finishedGoals);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-col items-center mb-3'>
        <h1 className='title text-center my-3'>🏆 Milestone 🏆</h1>
        <p className='text-center text-lg'>
          작은 도전들이 모여 더 큰 변화를 만들어갑니다. <br />
          다음 목표도 도전해볼까요?
        </p>
      </div>
      <section className='overflow-y-auto scrollbar-hide'>
        {finishedGoals.map((habit) => (
          <Link href={GOAL_DETAIL(habit.id)} key={habit.id}>
            <ChallengeCard habit={habit} />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default StickersPage;
