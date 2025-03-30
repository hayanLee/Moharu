import { createChallenge } from '@/app/actions/challengeActions';
import { HOME } from '@/constant/pathname';
import { NewChallenge } from '@/types/challenge.type';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '../use-toast';

const useAddChallenge = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: async (newChallengeDate: NewChallenge) => await createChallenge(newChallengeDate),
    onSuccess: (data) => {
      if (data.success) {
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
      }),
  });
};
export default useAddChallenge;
