import ChallengeCard from '@/components/Card/ChallengeCard';
import Profile from '@/components/Profile/Profile';
import { GOAL_DETAIL } from '@/constant/pathname';
import Link from 'next/link';
import { fetchChallenges } from '../actions/challengeActions';

const MainPage = async () => {
  const {
    data: { todayUntillDone, todayDone },
  } = await fetchChallenges();
  return (
    <div className='flex flex-col h-full gap-2'>
      <Profile />

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
    </div>
  );
};

export default MainPage;
