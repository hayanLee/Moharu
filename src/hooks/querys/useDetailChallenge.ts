import { fetchChallengeById } from '@/app/actions/challengeActions';
import { queryKeys } from '@/services/queryKeys';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';

const useDetailChallenge = (goalId: string) => {
  return useQuery({
    queryKey: queryKeys.challenge_detail(goalId),
    queryFn: () => fetchChallengeById(Number(goalId)),
    select: (data) => ({
      ...data,
      progress: data.data.progress.sort((a: Tables<'progress'>, b: Tables<'progress'>) =>
        a.created_at.localeCompare(b.created_at)
      ),
    }),
  });
};
export default useDetailChallenge;
