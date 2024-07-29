import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Title } from './title';

interface IProps {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string;
}

export const ProductCard: FC<IProps> = ({
    id,
    name,
    price,
    imageUrl,
    className,
}) => {
    return (
        <div className={cn(className)}>
            <Link href={`/product/${id}`}>
                <div className="flex h-[260px] justify-center rounded-lg bg-secondary p-6">
                    <Image src={imageUrl} width={215} height={215} alt="Logo" />
                </div>

                <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

                <p className="text-sm text-gray-400">
                    Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус,
                    томаты, соус альфредо, чеснок
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[20px]">
                        от <b>{price} ₽</b>
                    </span>

                    <Button variant="secondary" className="text-base font-bold">
                        <Plus className="mr-1 h-5 w-5" />
                        Добавить
                    </Button>
                </div>
            </Link>
        </div>
    );
};
