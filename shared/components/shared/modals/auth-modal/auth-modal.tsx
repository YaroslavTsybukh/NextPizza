'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { Dialog, DialogContent, Button, DialogTitle, LoginForm, RegisterForm } from '@/shared/components';

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
                    <DialogTitle></DialogTitle>
                </VisuallyHidden.Root>

                {formType === 'signIn' ? <LoginForm onClose={onClose} /> : <RegisterForm />}

                <hr />
                <div className="flex gap-2">
                    <Button
                        onClick={() =>
                            signIn('github', {
                                callbackUrl: '/',
                                redirect: true,
                            })
                        }
                        variant="secondary"
                        type="button"
                        className="h-12 flex-1 gap-2 p-2"
                    >
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
