import { getAllStickers } from '@/app/actions/stickerAction';
import { useQuery } from '@tanstack/react-query';

const useStickersQuery = () => {
  return useQuery({
    queryKey: ['stickers'],
    queryFn: () => getAllStickers(),
    staleTime: Infinity,
  });
};

export default useStickersQuery;
