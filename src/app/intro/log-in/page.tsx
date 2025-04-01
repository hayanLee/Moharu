'use client';
import { logIn } from '@/app/actions/userActions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HOME, INTRO, SIGNUP } from '@/constant/pathname';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(8, '비밀번호는 최소 8자리 입니다.'),
});

const LoginPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const result = await logIn(values);
    if (result.success) {
      toast({
        title: '로그인 성공',
        description: '로그인이 정상적으로 되었습니다.',
        duration: 2000,
      });
      router.replace(HOME);
    } else {
      return toast({
        title: '로그인 실패',
        description: result.error,
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

        <div className='flex flex-col items-center gap-4 w-full'>
          <Button type='submit' className='w-full'>
            로그인
          </Button>
          <Button asChild className='w-full'>
            <Link href={SIGNUP}>회원가입</Link>
          </Button>
          <Button asChild variant={'outline'} className='w-full'>
            <Link href={INTRO}>Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginPage;
