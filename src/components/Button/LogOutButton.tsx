'use client';
import useLogOut from '@/hooks/mutations/useLogOut';
import { Button } from '../ui/button';

const LogOutButton = () => {
  const { mutate: logoutMuate } = useLogOut();
  const onClickLogOut = () => logoutMuate();
  return (
    <div className='flex justify-end'>
      <Button onClick={onClickLogOut}>로그아웃</Button>
    </div>
  );
};

export default LogOutButton;
