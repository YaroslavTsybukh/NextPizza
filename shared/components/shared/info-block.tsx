import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

import { Button, Title } from '@/shared/components';
import { cn } from '@/shared/lib/utils';
import { FC } from 'react';

interface IProps {
    className?: string;
    title: string;
    imageUrl: string;
    altText: string;
}

export const InfoBlock: FC<IProps> = ({ className, title, imageUrl, altText }) => {
    return (
        <div className={cn(className, 'flex w-[840px] items-center justify-between gap-12')}>
            <div className="flex flex-col">
                <div className="w-[445px]">
                    <Title size="lg" text={title} className="font-extrabold" />
                    <p className="text-lg text-gray-600">Данную страницу могут просматривать только авторизованные пользователи</p>
                </div>

                <Link href="/" className="mt-11">
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft />
                        На главную
                    </Button>
                </Link>
            </div>

            <Image src={imageUrl} alt={altText} width={300} height={300} />
        </div>
    );
};
