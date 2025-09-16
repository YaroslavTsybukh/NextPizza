import { FC } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { CircleUser, User } from 'lucide-react';

import { Button } from '@/shared/components';

interface IProps {
    className?: string;
    onClick: () => void;
}

export const ProfileButton: FC<IProps> = ({ className, onClick }) => {
    const { data: session } = useSession();

    return (
        <div className={className}>
            {!session ? (
                <Button onClick={onClick} variant="outline" className="flex items-center gap-1">
                    <User size={16} />
                    Войти
                </Button>
            ) : (
                <Link href="/profile">
                    <Button variant="secondary" className="flex items-center gap-2">
                        <CircleUser size={18} />
                        Профиль
                    </Button>
                </Link>
            )}
        </div>
    );
};
