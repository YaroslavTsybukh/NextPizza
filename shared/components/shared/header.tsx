import { FC } from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Container, SearchInput, CartButton, ProfileButton } from '@/shared/components';

interface IProps {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}

export const Header: FC<IProps> = ({ hasSearch = true, hasCart = true, className }) => {
    return (
        <header className={cn('border-b', className)}>
            <Container className="flex items-center justify-between py-8">
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" width={35} height={35} alt="Logo" />
                        <div>
                            <p className="text-2xl font-black uppercase">NEXT PIZZA</p>
                            <p className="text-base text-gray-400">Вершина наслаждения</p>
                        </div>
                    </div>
                </Link>

                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <ProfileButton />

                    {hasCart && <CartButton />}
                </div>
            </Container>
        </header>
    );
};
