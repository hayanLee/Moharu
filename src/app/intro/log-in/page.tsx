'use client';
import { logIn } from '@/app/actions/userActions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { HOME, INTRO, SIGNUP } from '@/constant/pathname';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string(),
  password: z.string().min(8, '비밀번호는 최소 8자리 입니다.'),
});

const LoginPage = () => {
  const { toast } = useToast();
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    mode: 'onBlur',
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
      });
      router.replace(HOME);
    } else {
      return toast({
        title: '로그인 실패',
        description: result.error,
        variant: 'destructive',
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
                <div className='relative'>
                  <Input placeholder='password' type={isShow ? 'text' : 'password'} {...field} className='pr-10' />
                  <button
                    type='button'
                    onClick={() => setIsShow((prev) => !prev)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                  >
                    {isShow ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>
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
