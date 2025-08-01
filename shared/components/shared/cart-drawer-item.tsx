import { FC } from 'react';
import { Trash2Icon } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { ICartItemProps } from '@/@types';
import * as CartItem from './cart-item-details';

interface IProps extends ICartItemProps {
    className?: string;
    onClickCountButton: (type: 'plus' | 'minus') => void;
    onClickRemove: () => void;
}

export const CartDrawerItem: FC<IProps> = ({
    className,
    id,
    imageUrl,
    name,
    price,
    quantity,
    details,
    disabled,
    onClickCountButton,
    onClickRemove,
}) => {
    return (
        <div className={cn('flex gap-6 bg-white p-5', { 'pointer-events-none opacity-50': disabled }, className)}>
            <CartItem.Image src={imageUrl} />
            <div className="flex-1">
                <CartItem.Info name={name} details={details} />
                <hr className="my-3" />

                <div className="flex items-center justify-between">
                    <CartItem.CountButton value={quantity} onClick={(type) => onClickCountButton(type)} />

                    <div className="flex items-center gap-3">
                        <CartItem.Price value={price} />
                        <Trash2Icon onClick={onClickRemove} className="cursor-pointer text-gray-400 hover:text-gray-600" size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};
