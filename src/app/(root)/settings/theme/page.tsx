'use client';
import { Button } from '@/components/ui/button';
import { SETTINGS } from '@/constant/pathname';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const COLORCHIPS = [
  '#e9ff27',
  '#FF4552',
  '#005397',
  '#FDF06F',
  '#77EEDF',
  '#9C9CDD',
  '#F1D3D3',
  '#FFFDE7',
  '#CE7182',
  '#FF6090',
  '#A6CFE2',
];

const SettingStyle = () => {
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [initialColor, setInitialColor] = useState<string | null>(null); // 초기 색상 저장

  useEffect(() => {
    const initial = getComputedStyle(document.documentElement).getPropertyValue('--point');
    setInitialColor(initial.trim() || '#FF4552'); // 기본 색상 설정
  }, []);

  const handleSelectColor = () => {
    if (selectedColor) {
      document.documentElement.style.setProperty('--point', selectedColor);
    }
    toast({
      title: '변경 성공',
      description: '메인 컬러가 변경되었습니다.',
      duration: 2000,
    });
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='grid grid-cols-5 gap-4 p-4 grow auto-rows-min justify-items-center'>
        {COLORCHIPS.map((color) => (
          <button
            key={color}
            className={cn(
              'w-16 h-16 rounded-full border-2 hover:scale-110 transition-transform',
              selectedColor === color ? 'border-black' : 'border-transparent'
            )}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>

      <div className='grid grid-cols-2 gap-2 p-4'>
        <Button variant={'outline'} asChild>
          <Link href={SETTINGS}>취소</Link>
        </Button>
        <Button onClick={handleSelectColor}>선택</Button>
      </div>
    </div>
  );
};

export default SettingStyle;
