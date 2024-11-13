import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';
import { Category } from '@prisma/client';
import { FC } from 'react';

interface IProps {
    categories: Category[];
    className?: string;
}

export const TopBar: FC<IProps> = ({ categories, className }) => {
    return (
        <div
            className={cn(
                'sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5',
            )}
        >
            <Container className="flex items-center justify-between">
                <Categories items={categories} />
                <SortPopup />
            </Container>
        </div>
    );
};
