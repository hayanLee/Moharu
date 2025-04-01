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
      if (data.success) {
        toast({
          title: '로그인 성공',
          description: '로그인이 정상적으로 되었습니다.',
          duration: 2000,
        });
        router.replace(HOME);
      }
    },
    onError: (e) => {
      toast({
        title: '로그인 실패',
        description: e.message,
        variant: 'warn',
        duration: 2000,
      });
    },
  });
};

export default useLogIn;
