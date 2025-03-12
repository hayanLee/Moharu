import { cn } from '@/lib/utils';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import { Goal } from 'lucide-react';

const categoryColors: Record<string, string> = {
  Health: 'bg-red-300',
  'Self-care': 'bg-blue-300',
  Learning: 'bg-green-300',
  Hobby: 'bg-purple-300',
  Work: 'bg-yellow-300',
};
const now = dayjs().format('YYYY-MM-DD');

const ChallengeCard = ({ habit }: { habit: Tables<'challenges'> }) => {
  const isFinished = !!habit.end_day;
  const hasSucceededToday = habit.last_updated === now;

  const progressPercentage = ((habit.completed_days / habit.period) * 100).toFixed(0);
  const difference = isFinished && dayjs(habit.end_day).diff(dayjs(habit.start_day), 'day');

  return (
    <div
      className={cn(
        'flex items-end gap-2 border rounded-lg p-4',
        isFinished ? 'bg-gliter animate-glitter my-3' : hasSucceededToday && 'bg-point brightness-125'
      )}
    >
      <div className='grow flex flex-col gap-4'>
        <div>
          <h4 className='text-lg font-semibold'>{habit.challenge_name}</h4>
          <p className='rounded text-gray-500 text-sm flex items-center'>
            {habit.start_day} ~ {isFinished && habit.end_day}
          </p>
        </div>
        <span className={cn('text-sm w-fit rounded px-2', categoryColors[habit.category] || 'text-gray-700')}>
          #{habit.category}
        </span>
      </div>

      {isFinished ? (
        <p className='text-2xl flex items-center gap-2 text-gray-800'>
          <Goal size={24} />
          {difference} Day
        </p>
      ) : (
        <p className='text-4xl'>{progressPercentage}%</p>
      )}
    </div>
  );
};

export default ChallengeCard;
