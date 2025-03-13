import { PropsWithChildren } from 'react';

const GoalsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex flex-col justify-between h-full'>
      {children}
      {/* 임시 주석 */}
      {/* <MotivationCard /> */}
    </div>
  );
};

export default GoalsLayout;
