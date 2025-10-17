import { FC } from 'react';

import { PizzaSize, PizzaType } from '@/shared/constants';
import { getCartItemDetails, ICartStateItem } from '@/shared/lib';
import { CheckoutItem, Skeleton, WhiteBlock } from '@/shared/components';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

interface IProps {
    items: ICartStateItem[];
    loading: boolean;
    className?: string;
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
    removeCartItem: (id: number) => Promise<void>;
}

export const CheckoutCart: FC<IProps> = ({ items, loading, className, onClickCountButton, removeCartItem }) => {
    return (
        <WhiteBlock title="1. Корзина" className={className}>
            <div className="flex flex-col gap-5">
                {loading ? (
                    [...Array(4)].map((_, idx) => (
                        <div key={idx} className={cn('flex items-center justify-between', className)}>
                            <div className="flex items-center gap-5">
                                <Skeleton className="h-[50px] w-[50px] rounded-full" />
                                <Skeleton className="h-5 w-40 rounded" />
                            </div>
                            <Skeleton className="rounde h-5 w-10" />
                            <Skeleton className="h-8 w-[133px] rounded" />
                        </div>
                    ))
                ) : items.length > 0 ? (
                    items.map((item) => (
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
                    ))
                ) : (
                    <div className="mx-auto flex w-72 flex-col items-center justify-center">
                        <Image src="/assets/images/empty-box.png" alt="Пустая корзина" width={120} height={120} />
                        <p className="font-semibold">Корзина пустая</p>
                        <p className="mb-5 text-center text-neutral-500">Добавьте хотя бы один товар, чтобы совершить заказ</p>
                    </div>
                )}
            </div>
        </WhiteBlock>
    );
};
