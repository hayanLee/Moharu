'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { INTRO } from '@/constant/pathname';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const adjectives = ['용감한', '침착한', '현명한', '강인한'];
const noun = ['고양이', '강아지', '수달', '거북이'];

const makeRandomNickName = () => {
    let ad = adjectives[Math.floor(Math.random() * adjectives.length)];
    let n = noun[Math.floor(Math.random() * noun.length)];
    return `${ad} ${n}`;
};

const formSchema = z.object({
    id: z.string(),
    password: z.string().min(8, '8자리 이상으로 입력하세요.'),
    nickname: z.string().optional(),
});

const AuthPage = () => {
    // useForm으로 form 객체 생성
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: '',
            password: '',
            nickname: '',
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (!values.nickname || values.nickname.trim()) values.nickname = makeRandomNickName();
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
                        <Button type='submit'>Submit</Button>
                        <Link href={INTRO}>
                            <Button variant={'outline'}>Cancel</Button>
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AuthPage;
