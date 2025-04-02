import { cn } from '@/lib/utils';
import supabaseLoader from '@/supabase/supabaseLoader';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import Image from 'next/image';

interface StickerGridProps {
  period: number;
  progress: Tables<'progress'>[];
}

const formatDate = (dateString: string) => dayjs(dateString).format('YY/MM/DD');
const StickerGrid = ({ period, progress }: StickerGridProps) => {
  return (
    <div className='grid grid-cols-5 gap-2 sm:gap-5'>
      {Array.from({ length: period }, (_, idx) => {
        const sticker = progress?.[idx];
        const formattedDate = sticker?.created_at ? formatDate(sticker.created_at) : '';

        return (
          <div
            key={idx}
            className={cn(
              'day relative overflow-hidden flex items-center justify-center group',
              sticker && 'border-point !bg-white'
            )}
          >
            {sticker && (
              <>
                <Image
                  src={`stickers/${sticker.sticker_img}`}
                  alt='Picture of Sticker'
                  fill
                  className='object-cover'
                  loader={supabaseLoader}
                />
                <span
                  className='absolute text-white font-semibold text-xs sm:text-sm opacity-0 group-hover:opacity-100 
  transition-opacity duration-300 bg-black/50 sm:px-2 sm:py-1 p-0.5 rounded-md'
                >
                  {formattedDate}
                </span>
              </>
            )}

            {!sticker && <span className='absolute text-gray-500 font-bold'>{idx + 1}</span>}
          </div>
        );
      })}
    </div>
  );
};

export default StickerGrid;
