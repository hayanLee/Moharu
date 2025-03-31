import { PropsWithChildren } from 'react';

const GoalsLayout = ({ children }: PropsWithChildren) => {
  return <div className='flex flex-col justify-between h-full overflow-y-auto scrollbar-hide'>{children}</div>;
};

export default GoalsLayout;
