'use client';
import { UserInfo } from '@/app/actions/types/response';
import { getUserInfo, updateUserProfile } from '@/app/actions/userActions';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { DialogDescription } from '@radix-ui/react-dialog';
import { ContactRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormLabel } from '../ui/form';
import { Input } from '../ui/input';

interface ProfileEditDialogProps {
  userInfo: UserInfo;
}
const formSchema = z.object({
  nickname: z.string().min(1, '닉네임은 최소 1글자 이상으로 설정해주세요.'),
  profileUrl: z.instanceof(File).nullable().optional(),
  description: z.string().optional(),
});

const ProfileEditDialog = ({ userInfo }: ProfileEditDialogProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
    defaultValues: {
      nickname: '',
      profileUrl: null,
      description: '',
    },
  });

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

    if (!Object.keys(form.formState.dirtyFields).length) {
      return toast({
        title: '변경사항 없음',
        description: '변경사항이 없습니다.',
      });
    }

    for (const key in form.formState.dirtyFields) {
      formData.append(key, values[key]);
    }
    const { success } = await updateUserProfile(formData);
    if (success) {
      toast({
        title: '프로필 변경 성공',
        description: '프로필이 정상적으로 변경되었습니다.',
      });
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <ContactRound />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
          <DialogDescription>미입력시 기존 데이터가 유지됩니다.</DialogDescription>
        </DialogHeader>

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

            <DialogFooter>
              <Button type='submit'>변경</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
