'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { INTRO, SIGNUP } from '@/constant/pathname';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    id: z.string(),
    password: z.string(),
});

const LoginPage = () => {
    // useForm으로 form 객체 생성
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values);
    };
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                        control={form.control}
                        name='id'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Id</FormLabel>
                                <FormControl>
                                    <Input placeholder='id' type='email' {...field} />
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
        </div>
    );
};

export default LoginPage;
