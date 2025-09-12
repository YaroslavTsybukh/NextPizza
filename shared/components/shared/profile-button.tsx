'use client';

import { FC } from 'react';
import { useSession } from 'next-auth/react';
import { CircleUser, User } from 'lucide-react';

import { Button } from '@/shared/components';

interface IProps {
    className?: string;
}

export const ProfileButton: FC<IProps> = ({ className }) => {
    const { data: session } = useSession();
    console.log('session', session);

    return (
        <div className={className}>
            {!session ? (
                <Button variant="outline" className="flex items-center gap-1">
                    <User size={16} />
                    Войти
                </Button>
            ) : (
                <Button variant="secondary" className="flex items-center gap-2">
                    <CircleUser size={18} />
                    Профиль
                </Button>
            )}
        </div>
    );
};
