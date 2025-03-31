import { logIn } from '@/app/actions/userActions';
import { HOME } from '@/constant/pathname';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '../use-toast';

const useLogIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  return useMutation({
    mutationFn: async (values: { email: string; password: string }) => await logIn(values),
    onSuccess: (data) => {
      toast({
        title: '로그인 성공',
        description: '로그인이 정상적으로 되었습니다.',
        duration: 2000,
      });
      router.replace(HOME);
    },
    onError: () => {
      toast({
        title: '로그인 실패',
        description: '로그인이 실패하였습니다.',
        variant: 'warn',
      });
    },
  });
};

export default useLogIn;
