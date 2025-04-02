import { createChallenge } from '@/app/actions/challengeActions';
import { HOME } from '@/constant/pathname';
import { queryKeys } from '@/services/queryKeys';
import { NewChallenge } from '@/types/challenge.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '../use-toast';

const useAddChallenge = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newChallenge: NewChallenge) => createChallenge(newChallenge),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: queryKeys.challeges });
        router.replace(HOME);
        return toast({
          title: '등록 완료',
          description: '새로운 챌린지가 등록되었습니다!',
          duration: 2000,
        });
      }
    },
    onError: () =>
      toast({
        title: '챌린지 추가 실패',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive',
        duration: 2000,
      }),
  });
};
export default useAddChallenge;
