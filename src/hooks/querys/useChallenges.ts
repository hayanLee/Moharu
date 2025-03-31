import { fetchChallenges } from '@/app/actions/challengeActions';
import { queryKeys } from '@/services/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useChallenges = () => {
  return useQuery({ queryKey: queryKeys.challeges, queryFn: async () => await fetchChallenges() });
};

export default useChallenges;
