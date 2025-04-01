'use client';
import { fetchChallengeById } from '@/app/actions/challengeActions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useUpdateChallenge from '@/hooks/mutations/useUpdateChallenge';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { CATEGORY, PERIODS } from '../_constants/constant';

const EditPage = () => {
  const { goalId } = useParams();
  const router = useRouter();
  const { mutate } = useUpdateChallenge();

  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      period: 3,
      category: 'Health',
      challengeName: '',
    },
  });

  useEffect(() => {
    const getChallenge = async () => {
      const {
        data: { challenge },
      } = await fetchChallengeById(Number(goalId));

      form.setValue('period', challenge?.period as number);
      form.setValue('category', challenge?.category || 'Work');
      form.setValue('challengeName', challenge?.challenge_name || '');
    };
    getChallenge();
  }, []);

  const onSubmit = async (values: FieldValues) => {
    const { category, challengeName: challenge_name } = values;
    const updateChallegeInfo = { id: Number(goalId), category, challenge_name };
    mutate(updateChallegeInfo);
  };

  const goBack = () => router.back();

  return (
    <>
      <Button variant={'ghost'} size={'icon'} asChild>
        <ArrowLeft onClick={goBack} />
      </Button>

      <Form {...form}>
        <form className='flex flex-col h-full gap-3' onSubmit={form.handleSubmit(onSubmit)}>
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
                  <Input type='text' placeholder='이름을 입력하세요' required className='py-6' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h3 className='text-lg font-semibold sm:text-xl my-3'>기간</h3>
          <FormField
            control={form.control}
            name='period'
            render={({ field }) => (
              <div>
                <div className='grid grid-cols-2 gap-2'>
                  {PERIODS.map((value) => (
                    <Button
                      type='button'
                      key={value.period}
                      className={cn('sm:p-3 p-1 border justify-start', value.period === field.value && 'bg-point')}
                      size={'full'}
                      variant={'outline'}
                      value={value.period}
                      disabled
                    >
                      <span className='border rounded-full p-2 bg-gray-200 w-10 h-10 text-center'>{value.icon}</span>
                      <p className='text-base sm:text-lg'>
                        <span className='font-semibold'>D-{value.period} </span>
                      </p>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          />

          <h3 className='text-lg font-semibold sm:text-xl my-3'>카테고리</h3>
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <RadioGroup value={field.value} onValueChange={field.onChange}>
                {CATEGORY.map((category) => (
                  <div className='flex items-center space-x-2' key={category.title}>
                    <RadioGroupItem value={category.title} id={category.title} />
                    <FormLabel htmlFor={category.title} className={`bg-${category.color}-300 px-2 py-1 rounded`}>
                      {category.title}
                    </FormLabel>
                  </div>
                ))}
              </RadioGroup>
            )}
          />

          <Button type='submit' className='text-base mt-10'>
            수정하기
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditPage;
