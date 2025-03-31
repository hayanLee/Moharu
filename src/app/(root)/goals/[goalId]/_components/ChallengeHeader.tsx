import TrashButton from '@/components/Button/TrashButton';
import { GOAL_EDIT } from '@/constant/pathname';
import { Link, PencilLine } from 'lucide-react';

const ChallengeHeader = ({ challenge_name, start_day, end_day, is_completed, goalId }: any) => {
  return (
    <div className='flex justify-between items-center overflow-hidden'>
      <div>
        <h3 className='text-lg sm:text-xl font-semibold'>{challenge_name}</h3>
        <p className='text-sm sm:text-base text-gray-500'>
          {start_day} ~ {is_completed && end_day}
        </p>
      </div>
      <div className='flex space-x-4'>
        <Link href={GOAL_EDIT(goalId)}>
          <PencilLine />
        </Link>
        <TrashButton goalId={goalId} />
      </div>
    </div>
  );
};

export default ChallengeHeader;
