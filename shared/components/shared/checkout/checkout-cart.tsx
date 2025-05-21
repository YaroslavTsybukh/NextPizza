import { FC } from 'react';

import { PizzaSize, PizzaType } from '@/shared/constants';
import { getCartItemDetails, ICartStateItem } from '@/shared/lib';
import { CheckoutItem, WhiteBlock } from '@/shared/components';

interface IProps {
    items: ICartStateItem[];
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    removeCartItem: (id: number) => Promise<void>;
    className?: string;
}

export const CheckoutCart: FC<IProps> = ({ items, onClickCountButton, removeCartItem, className }) => {
    return (
        <WhiteBlock title="1. Корзина" className={className}>
            <div className="flex flex-col gap-5">
                {items.map((item) => (
                    <CheckoutItem
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        details={getCartItemDetails(item.pizzaType as PizzaType, item.pizzaSize as PizzaSize, item.ingredients)}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        disabled={item.disabled}
                        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                        onClickRemove={() => removeCartItem(item.id)}
                    />
                ))}
            </div>
        </WhiteBlock>
    );
};
