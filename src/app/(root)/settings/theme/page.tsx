'use client';
import { Button } from '@/components/ui/button';
import { SETTINGS } from '@/constant/pathname';
import useSetColor from '@/hooks/mutations/useSetColor';
import useProfile from '@/hooks/querys/useProfile';
import { cn } from '@/lib/utils';
import { Moon, RefreshCcw, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
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
] as const;
export type ColorChip = (typeof COLORCHIPS)[number];

const SettingStyle = () => {
  const { setTheme, themes, systemTheme } = useTheme();
  const { mutate } = useSetColor();
  const { data } = useProfile();
  const [selectedColor, setSelectedColor] = useState<ColorChip>(data?.data.color || '#e9ff27');
  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | 'system'>(systemTheme || 'light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectColor = () => mutate(selectedColor);

  const handleApplyChanges = () => {
    if (selectedTheme) setTheme(selectedTheme);
    handleSelectColor();
  };

  return (
    <div className='flex flex-col h-full gap-3'>
      <div>
        <h3 className='subTitle'>테마 설정</h3>
        <div className='flex flex-col gap-2'>
          {themes.map((mode) => (
            <Button
              key={mode}
              onClick={() => setSelectedTheme(mode as 'dark' | 'light' | 'system')}
              variant={mounted && selectedTheme === mode ? 'default' : 'outline'}
            >
              {mode === 'light' && <Sun />}
              {mode === 'dark' && <Moon />}
              {mode === 'system' && <RefreshCcw />}
              {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
            </Button>
          ))}
        </div>
      </div>

      <div className='border my-3' />

      <h3 className='subTitle'>메인 컬러 설정</h3>
      <div className='grid grid-cols-5 gap-4 px-4 grow auto-rows-min justify-items-center'>
        {COLORCHIPS.map((color) => (
          <Button
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
        <Button onClick={handleApplyChanges}>선택</Button>
      </div>
    </div>
  );
};

export default SettingStyle;
