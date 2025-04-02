'use client';
import { getStickersAction } from '@/app/actions/getStickersAction';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import useAddSticker from '@/hooks/mutations/useAddSticker';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface StickerDrawerProps {
  goalId: string;
  disabled: boolean;
}

const StickerDrawer = ({ goalId, disabled }: StickerDrawerProps) => {
  const [selectedSticker, setSelectedSticker] = useState<string>('');
  const [stickers, setStickers] = useState<string[]>([]);
  const { mutate, isPending } = useAddSticker();

  useEffect(() => {
    const getStickers = async () => {
      const result = await getStickersAction();
      setStickers(result);
    };
    getStickers();
  }, []);

  const handleClick = (signedUrl: string) => setSelectedSticker(signedUrl);
  const handleSubmit = () => mutate({ goalId, selectedSticker });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={'lg'} className='mx-auto' disabled={disabled || isPending} variant={'point'}>
          {disabled ? '오늘 성공했어요! 👍' : isPending ? '전송중...' : '오늘 날짜에 스티커 붙이기'}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='max-h-[80vh]'>
          <DrawerHeader className='justify-center py-8'>
            <DrawerTitle className='font-medium'>✨ 오늘의 스티커를 선택해 주세요 ✨</DrawerTitle>
            <DrawerDescription>아래에서 원하는 스티커를 클릭하세요.</DrawerDescription>
          </DrawerHeader>

          <div className='rounded-md max-w-md mx-auto max-h-[50vh] px-4 overflow-y-auto scrollbar-hide'>
            <div className='grid grid-cols-3 sm:grid-cols-4 gap-4'>
              {stickers?.map((stickerUrl) => (
                <div
                  key={stickerUrl}
                  className={cn(
                    'bg-white rounded-full relative aspect-square flex justify-center items-center border overflow-hidden',
                    selectedSticker === stickerUrl && 'border-point border-2 dark:border-blue-400 dark:border-4'
                  )}
                  onClick={() => handleClick(stickerUrl)}
                >
                  <Image
                    src={stickerUrl}
                    alt='Picture of sticker'
                    fill
                    className='cursor-pointer object-cover'
                    unoptimized
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
