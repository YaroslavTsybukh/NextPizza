'use client';

import { FC } from 'react';
import { Category } from '@prisma/client';

import { useCategoryStore } from '@/shared/store';
import { cn } from '@/shared/lib/utils';

interface IProps {
    items: Category[];
    className?: string;
}

export const Categories: FC<IProps> = ({ items, className }) => {
    const activeId = useCategoryStore((state) => state.activeId);

    return (
        <div className={cn('inline-flex gap-1 rounded-2xl bg-gray-50 p-1', className)}>
            {items.map(({ name, href, id }) => (
                <a
                    className={cn(
                        'flex h-11 items-center rounded-2xl px-5 font-bold',
                        activeId === id && 'bg-white text-primary shadow-md shadow-gray-200',
                    )}
                    href={`/#${href}`}
                    key={id}
                >
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};
