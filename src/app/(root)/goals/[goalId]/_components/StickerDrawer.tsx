'use client';
import { updateChallengeWithSticker } from '@/app/actions/challengeActions';
import { getAllSticker } from '@/app/actions/stickerAction';
import { SignedUrlObj } from '@/app/actions/types/response';
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
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface StickerDrawerProps {
  goalId: number;
  disabled: boolean;
  today: string;
}

const StickerDrawer = ({ goalId, disabled, today }: StickerDrawerProps) => {
  const [stickers, setStickers] = useState<SignedUrlObj[]>([]); //SignedUrlObj
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const handleClick = (signedUrl: string) => setSelectedSticker(signedUrl);

  useEffect(() => {
    async function fetchStickers() {
      const fetchedStickers = await getAllSticker();
      if (fetchedStickers.success && fetchedStickers.signedUrls) setStickers(fetchedStickers.signedUrls);
    }

    fetchStickers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSticker) await updateChallengeWithSticker(goalId, selectedSticker, today);
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
              {stickers.map((sticker) => (
                <div
                  key={sticker.path}
                  className={cn(
                    'bg-white rounded-full relative aspect-square flex justify-center items-center border overflow-hidden',
                    selectedSticker === sticker.path && 'border-point border-2'
                  )}
                  onClick={() => handleClick(sticker.path)}
                >
                  <Image
                    src={sticker.signedUrlObj}
                    alt='dog-sticker'
                    fill
                    className='cursor-pointer object-cover'
                    sizes='(max-width: 640px) 25vw, (max-width: 1024px) 33vw, 25vw'
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
