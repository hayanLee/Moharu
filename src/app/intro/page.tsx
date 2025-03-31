'use client';
import { Button } from '@/components/ui/button';
import { LOGIN, SIGNUP } from '@/constant/pathname';
import useOAuthLogIn from '@/hooks/mutations/useOAuthLogin';
import Link from 'next/link';

const IntroPage = () => {
  const { mutate } = useOAuthLogIn();
  const handleLoginClick = () => mutate('kakao');
  return (
    <div className='flex flex-col gap-10 w-1/2'>
      <div className='flex flex-col items-center gap-5'>
        <h1 className='sm:text-5xl text-4xl font-bold'>모하루</h1>
        <p className='sm:text-xl text-lg'>나를 위한 오늘의 한걸음</p>
      </div>
      <div className='flex flex-col gap-3'>
        <Button asChild>
          <Link href={LOGIN}>로그인</Link>
        </Button>
        <Button asChild>
          <Link href={SIGNUP}>회원가입</Link>
        </Button>
        <Button className='bg-yellow-300 text-black' onClick={handleLoginClick}>
          카카오 로그인
        </Button>
      </div>
    </div>
  );
};

export default IntroPage;
