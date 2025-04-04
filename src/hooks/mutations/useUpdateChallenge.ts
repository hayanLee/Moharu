import { updateChallengeInfo } from '@/app/actions/challengeActions';
import { queryKeys } from '@/services/queryKeys';
import { ModifyChallenge } from '@/types/challenge.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '../use-toast';

const useUpdateChallenge = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateChallegeInfo: ModifyChallenge) => updateChallengeInfo(updateChallegeInfo),
    onSuccess: async (data, variables) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.challeges });
        queryClient.invalidateQueries({ queryKey: queryKeys.challenge_detail(String(variables.id)) });
        router.back();
        return toast({
          title: '챌린지 수정 완료',
          description: '챌린지가 수정되었습니다!',
        });
      }
    },
    onError: () =>
      toast({
        title: '챌린지 수정 실패',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      }),
  });
};
export default useUpdateChallenge;
