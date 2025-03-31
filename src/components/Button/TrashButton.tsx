'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import useDeleteChallenge from '@/hooks/mutations/useDeleteChallenge';
import { Trash2 } from 'lucide-react';

const TrashButton = ({ goalId }: { goalId: number }) => {
  const { mutate } = useDeleteChallenge();
  const handleClick = async (goalId: number) => mutate(goalId);
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash2 className='cursor-pointer' />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>챌린지 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            이 항목을 <span className='text-destructive font-semibold'>삭제</span>하시겠습니까? <br /> 삭제된 데이터는
            복구할 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleClick(goalId)}>삭제</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TrashButton;
