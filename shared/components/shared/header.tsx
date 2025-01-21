import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container, SearchInput, CartButton } from '.';
import { Button } from '../ui/button';
import { User } from 'lucide-react';

export const Header: FC = () => {
    return (
        <header className="my-10">
            <Container className="flex items-center justify-between">
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" width={35} height={35} alt="Logo" />
                        <div>
                            <p className="text-2xl font-black uppercase">NEXT PIZZA</p>
                            <p className="text-base text-gray-400">вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>

                <div className="mx-10 flex-1">
                    <SearchInput />
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-1">
                        <User size={16} />
                        Войти
                    </Button>

                    <CartButton />
                </div>
            </Container>
        </header>
    );
};
