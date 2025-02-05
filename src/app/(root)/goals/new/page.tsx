'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HOME } from '@/constant/pathname';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const PERIODS = [
    { period: 3, icon: '🕒' },
    { period: 7, icon: '📆' },
    { period: 14, icon: '📅' },
    { period: 30, icon: '🗓️' },
];

const CreateGoalPage = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [period, setPeriod] = useState<number | null>(null);

    const now = dayjs();

    const handlePeriodClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setPeriod(Number(e.currentTarget.value));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!period) {
            toast({
                title: '챌린지 등록 실패',
                description: '기간을 선택해주세요',
                variant: 'warn',
            });
            return;
        }
        const formData = new FormData(e.currentTarget);
        const startDay = now.format('YYYY/MM/DD');

        try {
            const res = await fetch('http://localhost:8000/challenges', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    period,
                    challengeName: formData.get('challengeName'),
                    isFinished: false,
                    startDay,
                    endDay: '',
                    category: formData.get('category'),
                    progress: [],
                }),
            });

            if (!res.ok) throw new Error('챌린지 추가 실패');

            toast({
                title: '등록 완료',
                description: '새로운 챌린지가 등록되었습니다!',
                duration: 2000,
            });

            router.replace(HOME);
        } catch (e) {
            toast({
                title: '챌린지 추가 실패',
                description: '문제가 발생했습니다. 다시 시도해주세요.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className='flex flex-col h-full my-3 gap-3'>
            <div>
                <h3 className='title my-3 '>Quick Selection</h3>
                <div className='grid grid-cols-2 gap-2'>
                    {PERIODS.map((value) => (
                        <Button
                            key={value.period}
                            className={cn('p-3 border justify-start', period === value.period && 'bg-point')}
                            size={'full'}
                            variant={'outline'}
                            value={value.period}
                            onClick={handlePeriodClick}
                        >
                            <span className='border rounded-full p-2 bg-gray-200 w-10 h-10 text-center'>
                                {value.icon}
                            </span>
                            <p className='text-lg'>
                                <span className='font-semibold'>{value.period}</span> 일
                            </p>
                        </Button>
                    ))}
                </div>
            </div>

            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                <div>
                    <h3 className='title my-3'>Category</h3>
                    <RadioGroup defaultValue='Health' name='category'>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Health' id='Health' />
                            <Label htmlFor='Health' className='bg-red-300 p-0.5 rounded'>
                                Health
                            </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Self-care' id='Self-care' />
                            <Label htmlFor='Self-care' className='bg-blue-300 p-0.5 rounded'>
                                Self-care
                            </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Learning' id='Learning' />
                            <Label htmlFor='Learning' className='bg-green-300 p-0.5 rounded'>
                                Learning
                            </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Hobby' id='Hobby' />
                            <Label htmlFor='Hobby' className='bg-purple-300 p-0.5 rounded'>
                                Hobby
                            </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Work' id='Work' />
                            <Label htmlFor='Work' className='bg-yellow-300 p-0.5 rounded'>
                                Work
                            </Label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <RadioGroupItem value='Trevel' id='Trevel' />
                            <Label htmlFor='Trevel' className='bg-orange-300 p-0.5 rounded'>
                                Trevel
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                <div>
                    <h3 className='title my-3 '>New Challenge name</h3>
                    <Input type='text' placeholder='이름을 입력하세요' name='challengeName' required />
                </div>

                <Button type='submit' className='text-base mt-10'>
                    Add New Habit
                </Button>
            </form>
        </div>
    );
};

export default CreateGoalPage;
