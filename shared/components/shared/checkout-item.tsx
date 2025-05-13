import { FC } from 'react';
import { X } from 'lucide-react';

import { ICartItemProps } from '@/@types/cart-item-details';
import { cn } from '@/shared/lib/utils';
import * as CartItem from './cart-item-details';

interface IProps extends ICartItemProps {
    onClickCountButton: (type: 'plus' | 'minus') => void;
    onClickRemove: () => void;
    className?: string;
}

export const CheckoutItem: FC<IProps> = ({ name, price, imageUrl, quantity, details, disabled, onClickCountButton, onClickRemove, className }) => {
    return (
        <div className={cn('flex items-center justify-between', { 'pointer-events-none opacity-50': disabled }, className)}>
            <div className="flex flex-1 items-center gap-5">
                <CartItem.Image src={imageUrl} />
                <CartItem.Info name={name} details={details} />
            </div>

            <CartItem.Price value={price} />

            <div className="ml-20 flex items-center gap-5">
                <CartItem.CountButton onClick={onClickCountButton} value={quantity} />
                <button type="button" onClick={onClickRemove}>
                    <X size={20} className="cursor-pointer text-gray-400 hover:text-gray-600" />
                </button>
            </div>
        </div>
    );
};
