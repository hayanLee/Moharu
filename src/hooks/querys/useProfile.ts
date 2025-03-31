import { getUserInfo } from '@/app/actions/userActions';
import { queryKeys } from '@/services/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useProfile = () => {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: async () => await getUserInfo(),
  });
};

export default useProfile;
