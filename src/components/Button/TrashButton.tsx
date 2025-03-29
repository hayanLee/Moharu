'use client';
import { deleteChallenge } from '@/app/actions/challengeActions';
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
import { HOME } from '@/constant/pathname';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TrashButton = ({ goalId }: { goalId: number }) => {
  const { toast } = useToast();
  const router = useRouter();
  const handleClick = async (goalId: number) => {
    const { status } = await deleteChallenge(goalId);
    if (status === 'success') {
      router.replace(HOME);
      return toast({
        title: '챌린지 삭제 완료',
        description: '챌린지가 삭제 되었습니다.',
        duration: 2000,
      });
    }
  };
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
