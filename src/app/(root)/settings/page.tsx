'use client';
import { getUserInfo } from '@/app/actions/userActions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useLogOut from '@/hooks/mutations/useLogOut';
import useUpdateProfile from '@/hooks/mutations/useUpdateProfile';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  nickname: z.string().min(1, '닉네임은 최소 1글자 이상으로 설정해주세요.'),
  profileUrl: z.instanceof(File).nullable().optional(),
  description: z.string().optional(),
});
const SettingsPage = () => {
  const { mutate } = useUpdateProfile();
  const { mutate: logoutMuate } = useLogOut();

  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    defaultValues: {
      nickname: '',
      profileUrl: null,
      description: '',
    },
  });

  const onClickLogOut = () => logoutMuate();

  useEffect(() => {
    const getUserPrevInfo = async () => {
      const {
        data: { nickname, description },
      } = await getUserInfo();
      form.setValue('nickname', nickname);
      form.setValue('description', description);
    };
    getUserPrevInfo();
  }, []);

  const onSubmit = async (values: FieldValues) => {
    const formData = new FormData();
    for (const key in form.formState.dirtyFields) {
      formData.append(key, values[key]);
    }
    mutate(formData);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-3 py-4'>
          <FormField
            control={form.control}
            name='nickname'
            render={({ field }) => (
              <div className='grid grid-cols-[1fr_4fr] items-center gap-4'>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input placeholder='닉네임을 입력해주세요' {...field} />
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
                  <Input
                    type='file'
                    accept='image/*'
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file ?? null);
                    }}
                    {...rest}
                  />
                </FormControl>
              </div>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <div className='grid grid-cols-[1fr_4fr] items-center gap-4'>
                <FormLabel>한마디</FormLabel>
                <FormControl>
                  <Input placeholder='나를 위한 한마디' {...field} />
                </FormControl>
              </div>
            )}
          />

          <Button type='submit' disabled={!Object.keys(form.formState.dirtyFields).length}>
            변경
          </Button>
        </form>
      </Form>
      <Button onClick={onClickLogOut}>로그아웃</Button>
    </>
  );
};

export default SettingsPage;
