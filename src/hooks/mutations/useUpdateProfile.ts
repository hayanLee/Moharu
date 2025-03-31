import { updateUserProfile } from '@/app/actions/userActions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useToast } from '../use-toast';

const useUpdateProfile = () => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => await updateUserProfile(formData),
    onSuccess: (data) => {
      if (data.success) {
        router.back();
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        return toast({
          title: '프로필 변경 성공',
          description: '프로필이 정상적으로 변경되었습니다.',
        });
      }
    },
    onError: () =>
      toast({
        title: '프로필 변경 실패',
        description: '문제가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      }),
  });
};
export default useUpdateProfile;
