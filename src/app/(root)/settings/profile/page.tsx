'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SETTINGS } from '@/constant/pathname';
import useUpdateProfile from '@/hooks/mutations/useUpdateProfile';
import useProfile from '@/hooks/querys/useProfile';
import useStickersQuery from '@/hooks/querys/useStickersQuery';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  nickname: z.string().min(1, '닉네임은 최소 1글자 이상으로 설정해주세요.'),
  profileUrl: z.string().optional().nullable(),
  description: z.string().optional(),
});
const SettingProfile = () => {
  const { data } = useProfile();
  const { data: stickersData } = useStickersQuery();
  const { mutateAsync } = useUpdateProfile();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    defaultValues: {
      nickname: '',
      profileUrl: null,
      description: '',
    },
    values: data?.data,
  });
  if (!stickersData) return;
  const { data: stickers } = stickersData;

  const onSubmit = async (values: FieldValues) => {
    const formData = new FormData();
    for (const key in form.formState.dirtyFields) {
      formData.append(key, values[key]);
    }
    await mutateAsync(formData);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='h-full flex flex-col'>
          <div className='flex flex-col gap-3 py-4 grow'>
            <FormField
              control={form.control}
              name='nickname'
              render={({ field }) => (
                <div className='grid grid-cols-[1fr_4fr] items-center gap-4'>
                  <FormLabel>유저명</FormLabel>
                  <FormControl>
                    <Input placeholder='닉네임을 입력해주세요' {...field} />
                  </FormControl>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <div className='grid grid-cols-[1fr_4fr] items-center gap-4'>
                  <FormLabel>한줄명</FormLabel>
                  <FormControl>
                    <Input placeholder='나를 위한 한마디' {...field} />
                  </FormControl>
                </div>
              )}
            />

            <FormField
              control={form.control}
              name='profileUrl'
              render={({ field: { onChange, value, ...rest } }) => (
                <div className='grid grid-cols-[1fr_4fr] items-center gap-4'>
                  <FormLabel>프로필</FormLabel>
                  <FormControl>
                    <div className='grid grid-cols-3 gap-4 justify-items-center'>
                      {stickers?.map((stickerObj) => {
                        const isSelected = value === stickerObj.name;
                        return (
                          <div
                            key={stickerObj.name}
                            className={cn(
                              'w-[66px] bg-white rounded-full relative aspect-square flex justify-center items-center border overflow-hidden',
                              isSelected && 'border-point border-2 dark:border-blue-400'
                            )}
                            onClick={() => onChange(stickerObj.name)}
                          >
                            <Image
                              src={stickerObj.url as string}
                              alt='Picture of sticker'
                              fill
                              className='cursor-pointer object-cover'
                              unoptimized
                            />
                          </div>
                        );
                      })}
                    </div>
                  </FormControl>
                </div>
              )}
            />
          </div>

          <div className='grid grid-cols-2 gap-2 p-4'>
            <Button variant={'outline'} asChild>
              <Link href={SETTINGS}>취소</Link>
            </Button>
            <Button type='submit' disabled={!Object.keys(form.formState.dirtyFields).length} className='w-full'>
              변경
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SettingProfile;
