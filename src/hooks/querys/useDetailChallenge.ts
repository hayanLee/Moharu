import { fetchChallengeById } from '@/app/actions/challengeActions';
import { queryKeys } from '@/services/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useDetailChallenge = (goalId: string) => {
  return useQuery({
    queryKey: queryKeys.challenge_detail(goalId),
    queryFn: () => fetchChallengeById(Number(goalId)),
  });
};
export default useDetailChallenge;
