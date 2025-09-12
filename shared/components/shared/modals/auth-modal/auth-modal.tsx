import { FC } from 'react';
import Image from 'next/image';

import { Dialog, DialogContent, Button, DialogTitle, DialogHeader } from '@/shared/components';

interface IProps {
    open: boolean;
    onClose: () => void;
}

export const AuthModal: FC<IProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[450px] bg-white p-10">
                <DialogHeader>
                    <DialogTitle>Register / Login form (заглушка)</DialogTitle>
                </DialogHeader>

                <hr />
                <div className="flex gap-2">
                    <Button variant="secondary" type="button" className="h-12 flex-1 gap-2 p-2">
                        <Image width={24} height={24} src="https://github.githubassets.com/favicons/favicon.svg" alt="Github Logo" />
                        Github
                    </Button>
                    <Button variant="secondary" type="button" className="h-12 flex-1 gap-2 p-2">
                        <Image width={24} height={24} src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google Logo" />
                    </Button>
                </div>
                <Button variant="outline" type="button" className="h-12">
                    Sign in / Sign up (заглушка)
                </Button>
            </DialogContent>
        </Dialog>
    );
};
