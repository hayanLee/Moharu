'use client';
import { addStickerToChallenge } from '@/app/actions/challengeActions';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import useStickersQuery from '@/hooks/querys/useStickersQuery';
import { cn } from '@/lib/utils';
import supabaseLoader from '@/supabase/supabaseLoader';
import Image from 'next/image';
import React, { useState } from 'react';

interface StickerDrawerProps {
  goalId: number;
  disabled: boolean;
  today: string;
}

const StickerDrawer = ({ goalId, disabled, today }: StickerDrawerProps) => {
  const [selectedSticker, setSelectedSticker] = useState<string>('');
  const { data } = useStickersQuery();
  const stickers = data?.data;

  const handleClick = (signedUrl: string) => setSelectedSticker(signedUrl);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addStickerToChallenge(goalId, selectedSticker);
  };

  return (
    <Drawer>
      <DrawerTrigger disabled={disabled} asChild>
        <Button size={'lg'} className='mx-auto' disabled={disabled}>
          {disabled ? '오늘은 스티커를 붙였어요!' : '오늘 날짜에 스티커 붙이기'}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='max-h-[80vh]'>
          <DrawerHeader className='justify-center py-8'>
            <DrawerTitle className='font-medium'>✨ 오늘의 스티커를 선택해 주세요 ✨</DrawerTitle>
          </DrawerHeader>

          <div className='rounded-md max-w-md mx-auto max-h-[50vh] px-2 overflow-y-auto scrollbar-hide'>
            <div className='grid grid-cols-3 sm:grid-cols-4 gap-4'>
              {stickers?.map((sticker) => (
                <div
                  key={sticker}
                  className={cn(
                    'bg-white rounded-full relative aspect-square flex justify-center items-center border overflow-hidden',
                    selectedSticker === sticker && 'border-point border-2'
                  )}
                  onClick={() => handleClick(sticker)}
                >
                  <Image
                    src={`stickers/${sticker}`}
                    alt='Picture of sticker'
                    fill
                    className='cursor-pointer object-cover'
                    sizes='(max-width: 640px) 25vw, (max-width: 1024px) 33vw, 25vw'
                    loader={supabaseLoader}
                  />
                </div>
              ))}
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose>
              <form onSubmit={handleSubmit}>
                <Button type='submit' size={'lg'} disabled={!selectedSticker}>
                  제출
                </Button>
              </form>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default StickerDrawer;
