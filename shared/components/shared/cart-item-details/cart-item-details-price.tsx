import { FC } from 'react';
import { cn } from '@/shared/lib/utils';

interface IProps {
    className?: string;
    value: number;
}

export const CartItemDetailsPrice: FC<IProps> = ({ className, value }) => {
    return <h2 className={cn('font-bold', className)}>{value} грн</h2>;
};
