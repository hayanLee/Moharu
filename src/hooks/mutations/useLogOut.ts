import { logOut } from '@/app/actions/userActions';
import { INTRO } from '@/constant/pathname';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '../use-toast';

const useLogOut = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: () => logOut(),
    onSuccess: (data) => {
      if (data?.success) {
        toast({
          title: '로그아웃 성공',
          description: '로그아웃 되었습니다.',
        });
        router.replace(INTRO);
      }
    },
    onError: () => {
      toast({
        title: '로그아웃 실패',
        description: '로그아웃이 실패하였습니다. 다시 시도해주세요.',
        variant: 'warn',
      });
    },
  });
};

export default useLogOut;
