import { CATEGORY_BG } from '@/app/(root)/goals/[goalId]/_constants/constant';
import { cn } from '@/lib/utils';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import { Goal } from 'lucide-react';

const ChallengeCard = ({ habit, success }: { habit: Tables<'challenges'>; success?: boolean }) => {
  const isFinished = !!habit.end_day;
  const progressPercentage = ((habit.completed_days / habit.period) * 100).toFixed(0);
  const difference = isFinished && dayjs(habit.end_day).diff(dayjs(habit.start_day), 'day'); // 모두 완료 시

  return (
    <div
      className={cn(
        'flex items-end gap-2 border border-slate-200 rounded-md shadow-md p-2.5 sm:p-4 cursor-pointer',
        isFinished ? 'bg-gliter animate-glitter my-3' : success && 'bg-point'
      )}
    >
      <div className='grow flex flex-col gap-4 min-w-0'>
        <div>
          <h4 className='sm:text-lg font-semibold text-ellipsis text-nowrap overflow-hidden'>{habit.challenge_name}</h4>
          <p className='rounded text-gray-500 text-xs sm:text-sm flex items-center'>
            {habit.start_day} ~ {isFinished && habit.end_day}
          </p>
        </div>

        <span
          className={cn('text-xs sm:text-sm w-fit rounded py-1 px-2', CATEGORY_BG[habit.category] || 'text-gray-700')}
        >
          #{habit.category}
        </span>
      </div>

      {isFinished ? (
        <p className='text-xl sm:text-2xl flex items-center gap-2 text-gray-800'>
          <Goal size={24} />
          {difference} Day
        </p>
      ) : (
        <p className='text-2xl sm:text-4xl'>{progressPercentage}%</p>
      )}
    </div>
  );
};

export default ChallengeCard;
