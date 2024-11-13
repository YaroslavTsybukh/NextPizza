import { FC } from 'react';
import { Container, SearchInput } from '.';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';

export const Header: FC = () => {
    return (
        <header className="my-10">
            <Container className="flex items-center justify-between">
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/logo.png"
                            width={35}
                            height={35}
                            alt="Logo"
                        />
                        <div>
                            <p className="text-2xl font-black uppercase">
                                NEXT PIZZA
                            </p>
                            <p className="text-base text-gray-400">
                                вкусней уже некуда
                            </p>
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

                    <Button className="group relative">
                        <b>520 ₽</b>
                        <span className="mx-3 h-full w-[1px] bg-white/30" />
                        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                            <ShoppingCart size={16} />
                            <b>3</b>
                        </div>
                        <ArrowRight className="absolute right-5 w-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </Button>
                </div>
            </Container>
        </header>
    );
};
