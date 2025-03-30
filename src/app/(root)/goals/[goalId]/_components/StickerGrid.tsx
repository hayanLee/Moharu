'use client';
import supabaseLoader from '@/supabase/supabaseLoader';
import { Tables } from '@/types/supabase';
import Image from 'next/image';

interface StickerGridProps {
  period: number;
  progress: Tables<'progress'>[];
}

const StickerGrid = ({ period, progress }: StickerGridProps) => {
  return (
    <div className='grid grid-cols-5 gap-2 sm:gap-5'>
      {Array.from({ length: period }, (_, idx) => {
        const sticker = progress?.[idx];
        return sticker ? (
          <div className='day border-point !bg-white relative overflow-hidden' key={idx}>
            <Image
              src={`stickers/${sticker.sticker_img}`}
              alt='Picture of Sticker'
              fill
              className='object-cover'
              loader={supabaseLoader}
            />
          </div>
        ) : (
          <div key={idx} className='day'>
            {idx + 1}
          </div>
        );
      })}
    </div>
  );
};

export default StickerGrid;
