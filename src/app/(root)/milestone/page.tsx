import FinishedChallengeList from './components/FinishedChallengeList';

const StickersPage = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='flex flex-col items-center mb-3'>
        <p className='text-center text-base sm:text-lg'>
          작은 도전들이 모여 더 큰 변화를 만들어갑니다. <br />
          다음 목표도 도전해볼까요?
        </p>
      </div>
      <FinishedChallengeList />
    </div>
  );
};

export default StickersPage;
