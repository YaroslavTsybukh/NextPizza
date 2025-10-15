import { FC } from 'react';
import { Category } from '@prisma/client';

import { cn } from '@/shared/lib/utils';
import { Container, Categories, SortPopup } from '@/shared/components';

interface IProps {
    categories: Category[];
    className?: string;
}

export const TopBar: FC<IProps> = ({ categories, className }) => {
    return (
        <div className={cn('sticky top-0 z-10 bg-white shadow-lg shadow-black/5', className)}>
            <Container className="flex items-center justify-between">
                <Categories items={categories} />
                <SortPopup />
            </Container>
        </div>
    );
};
