import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useLoginMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (provider?: string) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/provider?provider=${provider}`);
      const data = await response.json();
      if (data) return data;
    },
    onSuccess: (data) => router.replace(data.url),
    onError: () => {
      console.error('에러');
    },
  });
};

export default useLoginMutation;
