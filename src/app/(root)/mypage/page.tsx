import VerticalProfile from '@/components/Profile/VerticalProfile';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

const MyPage = () => {
    return (
        <div className='flex flex-col h-full gap-4 py-4'>
            <VerticalProfile />
            <Dialog>
                <DialogTrigger asChild>
                    <Button>프로필 수정</Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>프로필 수정</DialogTitle>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='name' className='text-right'>
                                Name
                            </Label>
                            <Input id='name' placeholder='username' className='col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='username' className='text-right'>
                                Profile
                            </Label>
                            <Input type='file' id='username' className='col-span-3' />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type='submit'>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className='grid grid-cols-3'>
                <div className='flex flex-col items-center'>
                    <p className='text-xl font-bold'>10</p>
                    <p className='text-lg'>Ongoing</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-xl font-bold'>10</p>
                    <p className='text-lg'>Total</p>
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-xl font-bold'>10</p>
                    <p className='text-lg'>Finished</p>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
