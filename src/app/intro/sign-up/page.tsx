'use client';
import { signUp } from '@/app/actions/userActions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HOME, INTRO } from '@/constant/pathname';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(8, '8자리 이상으로 입력하세요.'),
  nickname: z.string().optional(),
});

const AuthPage = () => {
  const { toast } = useToast();
  const router = useRouter();

  // useForm으로 form 객체 생성
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await signUp({ ...values, nickname: values.nickname || undefined });
      if (result.success) {
        toast({
          title: '회원가입 성공',
          description: '회원가입이 정상적으로 완료되었습니다.',
          duration: 2000,
        });
        router.replace(HOME);
      } else {
        toast({
          title: '회원가입 실패',
          description: result.error,
          variant: 'destructive',
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: '회원가입 오류',
        description: '회원가입 실패',
        variant: 'destructive',
        duration: 2000,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-1/2'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email' type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='password' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='nickname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>nickname</FormLabel>
              <FormControl>
                <Input placeholder='미입력 시 랜덤으로 설정됩니다.' {...field} />
              </FormControl>
              <FormDescription>마이페이지에서 수정 가능합니다.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col items-center gap-4'>
          <Button type='submit' className='w-full'>
            회원가입
          </Button>
          <Button variant={'outline'} asChild className='w-full'>
            <Link href={INTRO}>취소</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AuthPage;
