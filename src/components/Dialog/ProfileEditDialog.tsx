import { UserInfo } from '@/app/actions/types/response';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@radix-ui/react-label';
import { ContactRound } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface ProfileEditDialogProps {
  userInfo: UserInfo;
}
const ProfileEditDialog = ({ userInfo }: ProfileEditDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} size={'icon'}>
          <ContactRound />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              별명
            </Label>
            <Input id='name' placeholder='닉네임을 적어주세요' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              프로필
            </Label>
            <Input type='file' id='username' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              한마디
            </Label>
            <Input id='name' placeholder='나를 위한 한마디' className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
