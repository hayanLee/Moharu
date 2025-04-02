'use client';
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
import useAddSticker from '@/hooks/mutations/useAddSticker';
import useStickersQuery from '@/hooks/querys/useStickersQuery';
import { cn } from '@/lib/utils';
import supabaseLoader from '@/supabase/supabaseLoader';
import Image from 'next/image';
import { useState } from 'react';

interface StickerDrawerProps {
  goalId: string;
  disabled: boolean;
}

const StickerDrawer = ({ goalId, disabled }: StickerDrawerProps) => {
  const [selectedSticker, setSelectedSticker] = useState<string>('');
  const { data } = useStickersQuery();
  const { mutate, isPending } = useAddSticker();

  if (!data) return;
  const { data: stickers } = data;

  const handleClick = (signedUrl: string) => setSelectedSticker(signedUrl);
  const handleSubmit = () => mutate({ goalId, selectedSticker });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={'lg'} className='mx-auto' disabled={disabled || isPending}>
          {disabled ? '오늘 성공했어요! 👍' : isPending ? '전송중...' : '오늘 날짜에 스티커 붙이기'}
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
              <Button type='submit' size={'lg'} disabled={!selectedSticker || isPending} onClick={handleSubmit}>
                {isPending ? '제출 중...' : '제출'}
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default StickerDrawer;
