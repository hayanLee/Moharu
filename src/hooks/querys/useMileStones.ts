import { getEndedChallenge } from '@/app/actions/challengeActions';
import { queryKeys } from '@/services/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useMileStones = () => {
  return useQuery({
    queryKey: queryKeys.milestones(),
    queryFn: () => getEndedChallenge(),
  });
};

export default useMileStones;
