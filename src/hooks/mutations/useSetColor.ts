import { ColorChip } from '@/app/(root)/settings/theme/page';
import { setMainColor } from '@/app/actions/userActions';
import { HOME } from '@/constant/pathname';
import { queryKeys } from '@/services/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '../use-toast';

const useSetColor = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (color: ColorChip) => setMainColor(color),
    onSuccess: (data, variable) => {
      if (data) {
        document.documentElement.style.setProperty('--point', variable);
        queryClient.invalidateQueries({ queryKey: queryKeys.profile });
        router.push(HOME);
        toast({
          title: '변경 성공',
          description: '메인 컬러가 변경되었습니다.',
          duration: 2000,
        });
      }
    },
    onError: () =>
      toast({
        title: '컬러 변경 실패',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive',
        duration: 2000,
      }),
  });
};

export default useSetColor;
