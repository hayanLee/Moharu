import { deleteChallenge } from '@/app/actions/challengeActions';
import { HOME } from '@/constant/pathname';
import { queryKeys } from '@/services/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '../use-toast';

const useDeleteChallenge = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goalId: number) => await deleteChallenge(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.challeges });
      router.replace(HOME);
      return toast({
        title: '챌린지 삭제 완료',
        description: '챌린지가 삭제 되었습니다.',
      });
    },
    onError: () =>
      toast({
        title: '챌린지 삭제 실패',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      }),
  });
};

export default useDeleteChallenge;
