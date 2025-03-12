'use client';
import { fetchChallengeById, updateChallengeInfo } from '@/app/actions/challengeActions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const PERIODS = [
  { period: 3, icon: '🕒' },
  { period: 7, icon: '📆' },
  { period: 14, icon: '📅' },
  { period: 30, icon: '🗓️' },
];

const CATEGORY = [
  { title: 'Health', color: 'red' },
  { title: 'Self-care', color: 'blue' },
  { title: 'Learning', color: 'green' },
  { title: 'Hobby', color: 'purple' },
  { title: 'Work', color: 'yellow' },
];

const EditPage = () => {
  const { toast } = useToast();
  const { goalId } = useParams();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      period: 3,
      category: 'Work',
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
    const result = await updateChallengeInfo({ id: Number(goalId), category, challenge_name });

    if (result.status === 'success') {
      router.back();
      return toast({
        title: '챌린지 수정 완료',
        description: '챌린지가 수정되었습니다!',
        duration: 2000,
      });
    } else {
      return toast({
        title: '챌린지 수정 실패',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      });
    }
  };

  const goBack = () => router.back();

  return (
    <>
      <Button variant={'ghost'} size={'icon'} asChild>
        <ArrowLeft strokeWidth={1} onClick={goBack} />
      </Button>
      <div className='flex flex-col h-full gap-3'>
        <FormField
          control={form.control}
          name='period'
          render={({ field }) => (
            <div>
              <h3 className='title my-3'>1. Period</h3>
              <div className='grid grid-cols-2 gap-2'>
                {PERIODS.map((value) => (
                  <Button
                    key={value.period}
                    className={cn('p-3 border justify-start', value.period === field.value && 'bg-point')}
                    size={'full'}
                    variant={'outline'}
                    value={value.period}
                    disabled
                  >
                    <span className='border rounded-full p-2 bg-gray-200 w-10 h-10 text-center'>{value.icon}</span>
                    <p className='text-lg'>
                      <span className='font-semibold'>{value.period}</span> 일
                    </p>
                  </Button>
                ))}
              </div>
            </div>
          )}
        />

        <Form {...form}>
          <form className='flex flex-col gap-3' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <h3 className='title my-3'>2. Category</h3>
                  <FormControl>
                    <RadioGroup defaultValue={field.value} onValueChange={field.onChange}>
                      {CATEGORY.map((category) => (
                        <div className='flex items-center space-x-2' key={category.title}>
                          <RadioGroupItem value={category.title} id={category.title} />
                          <FormLabel htmlFor={category.title} className={`bg-${category.color}-300 p-0.5 rounded`}>
                            {category.title}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='challengeName'
              render={({ field }) => (
                <FormItem>
                  <h3 className='title my-3 '>3. Challenge</h3>
                  <FormControl>
                    <Input type='text' placeholder='이름을 입력하세요' required className='py-6' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='text-base mt-10'>
              수정하기
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default EditPage;
