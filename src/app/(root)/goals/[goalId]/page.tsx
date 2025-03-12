import { fetchChallengeById } from '@/app/actions/challengeActions';
import TrashButton from '@/components/Button/TrashButton';
import dayjs from 'dayjs';
import StickerDrawer from './_components/StickerDrawer';
import StickerGrid from './_components/StickerGrid';

type GoalDetailProps = {
  params: { goalId: string };
};

const GoalDetailPage = async ({ params: { goalId } }: GoalDetailProps) => {
  const numericGoalId = Number(goalId);
  const singleChallenge = await fetchChallengeById(numericGoalId);

  if (singleChallenge.status === 'error') {
    return <div className='text-red-500'>챌린지 데이터를 가져오는 데 실패했습니다.</div>;
  }

  const { challenge, progress } = singleChallenge.data || {};
  if (!challenge) {
    return <div className='text-red-500'>챌린지를 찾을 수 없습니다.</div>;
  }

  const { challenge_name, start_day, end_day, period, is_completed, last_updated } = challenge;
  const today = dayjs().format('YYYY-MM-DD');
  const todaySticker = !is_completed && last_updated !== today;

  return (
    <div className='grid grid-rows-[auto_1fr_auto] gap-3 sm:gap-5 h-full mb-3'>
      <div className='flex justify-between items-center'>
        <div>
          <h3 className='text-xl font-semibold'>{challenge_name}</h3>
          <p className='text-gray-500'>
            {start_day} ~ {is_completed && end_day}
          </p>
        </div>
        <TrashButton goalId={numericGoalId} />
      </div>

      <div className='overflow-y-auto py-3 scrollbar-hide'>
        <StickerGrid period={period} progress={progress} />
      </div>

      {!is_completed && <StickerDrawer goalId={numericGoalId} disabled={!todaySticker} today={today} />}
    </div>
  );
};

export default GoalDetailPage;
