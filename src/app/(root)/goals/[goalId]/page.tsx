'use client';
import TrashButton from '@/components/Button/TrashButton';
import { GOAL_EDIT } from '@/constant/pathname';
import useDetailChallenge from '@/hooks/querys/useDetailChallenge';
import dayjs from 'dayjs';
import { PencilLine } from 'lucide-react';
import Link from 'next/link';
import ChallengeDetailSkeleton from './_components/ChallengeDetailSkeleton';
import StickerDrawer from './_components/StickerDrawer';
import StickerGrid from './_components/StickerGrid';

type GoalDetailProps = {
  params: { goalId: string };
};

const GoalDetailPage = ({ params: { goalId } }: GoalDetailProps) => {
  const { data, isPending } = useDetailChallenge(goalId);
  if (!data || isPending) return <ChallengeDetailSkeleton />;

  const {
    data: {
      challenge: { challenge_name, start_day, end_day, period, is_completed, last_updated },
      progress,
    },
  } = data;
  const today = dayjs().format('YYYY-MM-DD');
  const todaySticker = !is_completed && last_updated !== today;

  return (
    <div className='grid grid-rows-[auto_1fr_auto] gap-3 sm:gap-5 h-full mb-3'>
      <div className='flex justify-between items-center overflow-hidden'>
        <div className='min-w-0'>
          <h3 className='text-lg sm:text-xl font-semibold'>{challenge_name}</h3>
          <p className='text-sm sm:text-base text-gray-500'>
            {start_day} ~ {is_completed && end_day}
          </p>
        </div>
        <div className='flex space-x-4'>
          <Link href={GOAL_EDIT(goalId)}>
            <PencilLine />
          </Link>
          <TrashButton goalId={Number(goalId)} />
        </div>
      </div>

      <div className='overflow-y-auto py-3 scrollbar-hide'>
        <StickerGrid period={period} progress={progress} />
      </div>

      {!is_completed && <StickerDrawer goalId={goalId} disabled={!todaySticker} />}
    </div>
  );
};

export default GoalDetailPage;
