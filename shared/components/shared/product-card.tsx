import { FC } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { Ingredient } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { Button, Title } from '@/shared/components';

interface IProps {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    ingredients: Ingredient[];
    className?: string;
}

export const ProductCard: FC<IProps> = ({ id, name, price, imageUrl, ingredients, className }) => {
    return (
        <div className={cn(className)}>
            <Link href={`/product/${id}`}>
                <div className="flex h-[260px] justify-center rounded-lg bg-secondary">
                    <Image className="w-full" src={imageUrl} width={215} height={215} alt="Лого" />
                </div>

                <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

                <p className="text-sm text-gray-400">{ingredients.map((ingredient) => ingredient.name).join(', ')}</p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[20px]">
                        от <b>{price} грн</b>
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
