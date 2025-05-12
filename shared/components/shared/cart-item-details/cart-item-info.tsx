import { FC } from 'react';
import { Ingredient } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { mapPizzaType, PizzaSize, PizzaType } from '@/shared/constants/pizza';

interface IProps {
    name: string;
    details: string;
    className?: string;
}

export const CartItemInfo: FC<IProps> = ({ name, details, className }) => {
    return (
        <div>
            <div className={cn('flex items-center justify-between', className)}>
                <h2 className="flex-1 text-lg font-bold leading-6">{name}</h2>
            </div>
            {details && <p className="w-[90%] text-xs text-gray-400">{details}</p>}
        </div>
    );
};
