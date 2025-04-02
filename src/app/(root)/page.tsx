import Profile from '@/components/Profile/Profile';
import ChallengeList from './_components/ChallengeList';

const MainPage = () => {
  return (
    <div className='flex flex-col h-full gap-2'>
      <Profile />
      <ChallengeList />
    </div>
  );
};

export default MainPage;
