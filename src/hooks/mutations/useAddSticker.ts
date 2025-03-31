import { addStickerToChallenge } from '@/app/actions/challengeActions';
import { queryKeys } from '@/services/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../use-toast';

const useAddSticker = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ goalId, selectedSticker }: { goalId: string; selectedSticker: string }) =>
      addStickerToChallenge(Number(goalId), selectedSticker),
    onSuccess: (data, variables) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.challenge_detail(variables.goalId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.challeges });
      }
    },
    onError: () =>
      toast({
        title: '스티커 추가 실패',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      }),
  });
};
export default useAddSticker;
