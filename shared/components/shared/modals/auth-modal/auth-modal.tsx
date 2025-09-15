'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { Dialog, DialogContent, Button, DialogTitle, LoginForm } from '@/shared/components';

interface IProps {
    open: boolean;
    onClose: () => void;
}

export const AuthModal: FC<IProps> = ({ open, onClose }) => {
    const [formType, setFormType] = useState<'signIn' | 'signUp'>('signIn');

    const onSwitchType = () => {
        setFormType((prev) => (prev === 'signIn' ? 'signUp' : 'signIn'));
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[450px] bg-white p-10">
                <VisuallyHidden.Root>
                    <DialogTitle>Register / Login form (заглушка)</DialogTitle>
                </VisuallyHidden.Root>

                {formType === 'signIn' ? <LoginForm /> : <div>Sign up form</div>}

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
                <Button onClick={onSwitchType} variant="outline" type="button" className="h-12">
                    {formType !== 'signIn' ? 'Войти' : 'Зарегистрироваться'}
                </Button>
            </DialogContent>
        </Dialog>
    );
};
