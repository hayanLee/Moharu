import { fetchChallengeById } from '@/app/actions/challengeActions';
import TrashButton from '@/components/Button/TrashButton';
import dayjs from 'dayjs';
import Image from 'next/image';
import StickerDrawer from './_components/StickerDrawer';

type GoalDetailProps = {
  params: { goalId: string };
  searchParams: { [key: string]: string | undefined };
};

// 스티커 경로
// const directoryPath = path.join(process.cwd(), 'public/assets/stickers/test');
// 모든 스티커를 담은 배열로 가져오기
// const images = getImageArray(directoryPath);

const generatePeriodArr = (period: number, progress) => {
  return Array.from({ length: period }, (p, idx) => {
    const progressItem = progress[idx];
    return progressItem ? (
      <div className='day !bg-white relative overflow-hidden' key={progressItem.date}>
        <Image src={''} alt='' fill className='object-cover' />
      </div>
    ) : (
      <div key={idx} className='day'>
        {idx + 1}
      </div>
    );
  });
};
const GoalDetailPage = async ({ params }: GoalDetailProps) => {
  const { goalId } = params;
  const challengeResponse = await fetchChallengeById(Number(goalId));

  if (!challengeResponse.data) return;

  const { challenge_name, start_day, end_day, period, progress, is_completed } = challengeResponse.data;
  const today = dayjs().format('YYYY/MM/DD');
  const todaySticker =
    progress.length === 0 || dayjs(progress[progress.length - 1]['created_at']).format('YYYY/MM/DD') !== today;
  const periodArr = generatePeriodArr(period, progress);
  return (
    <div className='flex flex-col gap-3 bg-blue h-full'>
      <div className='flex justify-between items-center'>
        <div>
          <h3 className='text-xl font-semibold'>{challenge_name}</h3>
          <p className='text-gray-500'>
            {start_day} ~ {is_completed && end_day}
          </p>
        </div>
        <TrashButton goalId={goalId} />
      </div>

      <div className='overflow-y-auto py-3 '>
        <div className='grid grid-cols-5 gap-2 sm:gap-5'>{periodArr}</div>
      </div>

      {!is_completed && (
        <StickerDrawer goalId={Number(goalId)} disabled={!todaySticker} today={dayjs().format('YYYY-MM-DD')} />
      )}
    </div>
  );
};

export default GoalDetailPage;
