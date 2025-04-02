'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { HOME } from '@/constant/pathname';
import useUpdateChallenge from '@/hooks/mutations/useUpdateChallenge';
import useDetailChallenge from '@/hooks/querys/useDetailChallenge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { CATEGORY, PERIODS } from '../_constants/constant';

interface EditPageProps {
  params: { goalId: string };
}

const EditPage = ({ params: { goalId } }: EditPageProps) => {
  const { mutate } = useUpdateChallenge();
  const { data } = useDetailChallenge(goalId);
  const form = useForm({
    mode: 'onBlur',
    defaultValues: {
      period: 3,
      category: 'Health',
      challenge_name: '',
    },
    values: data?.data,
  });

  const onSubmit = async (values: FieldValues) => {
    const { category, challenge_name } = values;
    const updateChallegeInfo = { id: Number(goalId), category, challenge_name };
    mutate(updateChallegeInfo);
  };

  return (
    <>
      <Form {...form}>
        <form className='flex flex-col h-full' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2 grow px-2'>
            <h3 className='subTitle'>챌린지명</h3>
            <FormField
              control={form.control}
              name='challenge_name'
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

            <h3 className='subTitle'>기간</h3>
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
                        className={cn(
                          'sm:p-3 p-1 border justify-start',
                          value.period === field.value && 'bg-point dark:text-black'
                        )}
                        size={'full'}
                        variant={'outline'}
                        value={value.period}
                        disabled
                      >
                        <span className='border rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center text-base'>
                          {value.icon}
                        </span>
                        <p className='text-base sm:text-lg'>
                          <span className='font-semibold'>D-{value.period} </span>
                        </p>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            />

            <h3 className='subTitle'>카테고리</h3>
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  {CATEGORY.map((category) => (
                    <div className='flex items-center space-x-2' key={category.title}>
                      <RadioGroupItem value={category.title} id={category.title} />
                      <FormLabel
                        htmlFor={category.title}
                        className={`bg-${category.color}-300 px-2 py-1 rounded font-semibold text-black`}
                      >
                        {category.title}
                      </FormLabel>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </div>

          <div className='grid grid-cols-2 gap-2 p-4'>
            <Button variant={'outline'} asChild>
              <Link href={HOME}>취소</Link>
            </Button>
            <Button type='submit' disabled={!Object.keys(form.formState.dirtyFields).length}>
              수정
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditPage;
