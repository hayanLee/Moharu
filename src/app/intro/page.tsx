import { Button } from '@/components/ui/button';
import { LOGIN, SIGNUP } from '@/constant/pathname';
import Link from 'next/link';

const IntroPage = () => {
    return (
        <div className='gap-10'>
            <div className='flex flex-col items-center'>
                <h1 className='text-5xl'>Moharu</h1>
                <p>나를 위한 오늘의 한걸음</p>
            </div>
            <div className='flex flex-col gap-3'>
                <Button asChild>
                    <Link href={LOGIN}>로그인</Link>
                </Button>
                <Button className='bg-yellow-300 text-black'>카카오 로그인</Button>
                <Button asChild>
                    <Link href={SIGNUP}>회원가입</Link>
                </Button>
            </div>
        </div>
    );
};

export default IntroPage;
