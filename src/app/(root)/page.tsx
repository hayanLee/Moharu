import ChallengeCard from '@/components/Card/ChallengeCard';
import Profile from '@/components/Profile/Profile';
import { GOAL_DETAIL } from '@/constant/pathname';
import { Tables } from '@/types/supabase';
import Link from 'next/link';
import { fetchChallenges } from '../actions/challengeActions';

const MainPage = async () => {
  const { todayUntillDone, todayDone } = await fetchChallenges();
  return (
    <div className='flex flex-col h-full'>
      <Profile />

      <h3 className='title'>
        Goals <span className='text-point'>({todayUntillDone?.length})</span>
      </h3>

      {!todayUntillDone?.length && (
        <div className='text-center font-semibold text-lg text-gray-400'>새로운 챌린지를 시작해보세요 !</div>
      )}

      <div className='flex flex-col grow overflow-y-auto scrollbar-hide gap-2 my-3'>
        {todayUntillDone?.map((habit: Tables<'challenges'>) => (
          <Link href={GOAL_DETAIL(habit.id)} key={habit.id}>
            <ChallengeCard habit={habit} />
          </Link>
        ))}

        <div className='flex items-center my-3'>
          <div className='flex-1 border-t border-dashed border-gray-300'></div>
          <span className='mx-4 font-semibold'>오늘의 한 걸음</span>
          <div className='flex-1 border-t border-dashed border-gray-300'></div>
        </div>

        {todayDone?.map((habit) => (
          <Link href={GOAL_DETAIL(habit.id)} key={habit.id}>
            <ChallengeCard habit={habit} hasSucceededToday={true} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
