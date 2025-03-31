import { fetchChallenges } from '@/app/actions/challengeActions';
import { useQuery } from '@tanstack/react-query';

const useChallenges = () => {
  return useQuery({ queryKey: ['all, challenges'], queryFn: async () => await fetchChallenges() });
};

export default useChallenges;
