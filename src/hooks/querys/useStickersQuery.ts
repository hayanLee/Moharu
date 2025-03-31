import { getAllStickers } from '@/app/actions/stickerAction';
import { queryKeys } from '@/services/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useStickersQuery = () => {
  return useQuery({
    queryKey: queryKeys.stickers,
    queryFn: () => getAllStickers(),
    staleTime: Infinity,
  });
};

export default useStickersQuery;
