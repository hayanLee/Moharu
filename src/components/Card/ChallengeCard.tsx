import { HabitType } from '@/app/(root)/page';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { AlarmClockCheck } from 'lucide-react';

const categoryColors: Record<string, string> = {
    Health: 'bg-red-300',
    'Self-care': 'bg-blue-300',
    Learning: 'bg-green-300',
    Hobby: 'bg-purple-300',
    Work: 'bg-yellow-300',
};

const ChallengeCard = ({ habit, hasSucceededToday }: { habit: HabitType; hasSucceededToday?: boolean }) => {
    const isFinished = habit.isFinished;
    const progressPercentage = ((habit.progress.length / habit.period) * 100).toFixed(0);
    const difference = isFinished && dayjs(habit.endDay).diff(dayjs(habit.startDay), 'day') + 1;
    return (
        <div
            className={cn(
                'flex items-end gap-2 border rounded-lg p-4',
                isFinished ? 'bg-gliter animate-glitter my-3' : hasSucceededToday && 'bg-point brightness-125'
            )}
        >
            <div className='grow flex flex-col gap-4'>
                <div>
                    <h4 className='text-lg font-semibold'>{habit.challengeName}</h4>
                    <p className='rounded text-gray-500 text-sm flex items-center'>
                        {habit.startDay} ~ {isFinished && habit.endDay}
                    </p>
                </div>
                <span className={cn('text-sm w-fit rounded px-2', categoryColors[habit.category] || 'text-gray-700')}>
                    #{habit.category}
                </span>
            </div>

            {isFinished ? (
                <p className='text-2xl flex items-center gap-2 text-gray-800'>
                    <AlarmClockCheck size={24} />
                    {difference} day
                </p>
            ) : (
                <p className='text-4xl'>{progressPercentage}%</p>
            )}
        </div>
    );
};

export default ChallengeCard;
