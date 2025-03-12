'use client';
import { addStickerToChallenge } from '@/app/actions/challengeActions';
import { getAllStickers } from '@/app/actions/stickerAction';
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
import { cn } from '@/lib/utils';
import supabaseLoader from '@/supabase/supabaseLoader';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface StickerDrawerProps {
  goalId: number;
  disabled: boolean;
  today: string;
}

const StickerDrawer = ({ goalId, disabled, today }: StickerDrawerProps) => {
  const [selectedSticker, setSelectedSticker] = useState<string>('');
  const [stickers, setStickers] = useState<string[]>([]);
  useEffect(() => {
    const getStickers = async () => {
      const { status, data } = await getAllStickers();
      if (status === 'success') setStickers(data);
    };
    getStickers();
  }, []);

  const handleClick = (signedUrl: string) => setSelectedSticker(signedUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addStickerToChallenge(goalId, selectedSticker);
  };

  return (
    <Drawer>
      <DrawerTrigger disabled={disabled} asChild>
        <Button size={'lg'} className='mx-auto' disabled={disabled}>
          {disabled ? '오늘은 스티커를 붙였어요!' : 'Add Sticker'}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='max-h-[80vh]'>
          <DrawerHeader className='justify-center py-8'>
            <DrawerTitle>✨ 오늘 붙일 스티커를 선택해 주세요 ✨</DrawerTitle>
          </DrawerHeader>

          <div className='rounded-md max-w-md mx-auto max-h-[50vh] overflow-y-auto scrollbar-hide'>
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
                  Submit
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
