'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useAddChallenge from '@/hooks/mutations/useAddChallenge';
import { cn } from '@/lib/utils';
import { NewChallenge } from '@/types/challenge.type';
import dayjs from 'dayjs';
import { FieldValues, useForm } from 'react-hook-form';
import { CATEGORY, PERIODS } from '../[goalId]/_constants/constant';

const now = dayjs();
const CreateGoalPage = () => {
  const { mutate } = useAddChallenge();
  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      challengeName: '',
      period: null,
      category: 'Health',
    },
  });

  const onSubmit = async (values: FieldValues) => {
    const newChallenge: NewChallenge = {
      category: form.getValues('category'),
      challenge_name: form.getValues('challengeName'),
      start_day: now.format('YYYY-MM-DD'),
      period: Number(form.getValues('period')),
    };
    mutate(newChallenge);
  };

  return (
    <Form {...form}>
      <form className='flex flex-col h-full gap-2' onSubmit={form.handleSubmit(onSubmit)}>
        <h3 className='text-lg font-semibold sm:text-xl my-3'>챌린지명</h3>
        <FormField
          control={form.control}
          name='challengeName'
          rules={{
            required: '챌린지명은 필수입니다.',
            maxLength: { value: 20, message: '최대 20자 이내로 작성해주세요' },
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='text' placeholder='이름을 입력하세요' className='py-6' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3 className='text-lg font-semibold sm:text-xl my-3'>기간</h3>
        <FormField
          control={form.control}
          name='period'
          rules={{
            required: '기간 설정은 필수입니다.',
          }}
          render={({ field }) => (
            <div className='grid grid-cols-2 gap-2'>
              {PERIODS.map((value) => (
                <Button
                  type='button'
                  key={value.period}
                  className={cn('sm:p-3 p-1 border justify-start', field.value === value.period && 'bg-point')}
                  size={'full'}
                  variant={'outline'}
                  value={value.period}
                  onClick={() => field.onChange(value.period)}
                >
                  <span className='border rounded-full p-2 bg-gray-200 w-10 h-10 text-center'>{value.icon}</span>
                  <p className='text-base sm:text-lg'>
                    <span className='font-semibold'>D-{value.period} </span>
                  </p>
                </Button>
              ))}
              <FormMessage />
            </div>
          )}
        />

        <h3 className='text-lg font-semibold sm:text-xl my-3'>카테고리</h3>
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <RadioGroup value={field.value} onValueChange={field.onChange} name='category'>
              {CATEGORY.map((category) => (
                <div className='flex items-center space-x-2' key={category.title}>
                  <RadioGroupItem value={category.title} id={category.title} />
                  <Label htmlFor={category.title} className={`bg-${category.color}-300 px-2 py-1 rounded`}>
                    {category.title}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />

        <Button type='submit' className='text-base my-10' disabled={!!Object.keys(form.formState.errors).length}>
          새로운 도전 시작하기 🚩
        </Button>
      </form>
    </Form>
  );
};

export default CreateGoalPage;
