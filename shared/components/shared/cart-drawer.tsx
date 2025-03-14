'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet';
import { useCartStore } from '@/shared/store';
import { getCartItemDetails } from '@/shared/lib';
import { Button } from '../ui/button';
import { CartDrawerItem } from '.';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

interface IProps {
    className?: string;
}

export const CartDrawer: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
    const [totalAmount, items, updateItemQuantity, getCartItems, removeCartItem] = useCartStore(
        useShallow((state) => [state.totalAmount, state.items, state.updateItemQuantity, state.getCartItems, state.removeCartItem]),
    );

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    useEffect(() => {
        getCartItems();
    }, []);

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className="flex flex-col justify-between bg-[#F4F1EE] pb-0">
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span className="font-bold">{items.length} товара</span>
                    </SheetTitle>
                </SheetHeader>

                {/* Items */}
                <div className="scrollbar -mx-6 mt-5 flex-1 overflow-auto">
                    {items.map((item) => (
                        <div className="mb-2" key={item.id}>
                            <CartDrawerItem
                                id={item.id}
                                imageUrl={item.imageUrl}
                                details={getCartItemDetails(item.pizzaType as PizzaType, item.pizzaSize as PizzaSize, item.ingredients)}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                onClickRemove={() => removeCartItem(item.id)}
                            />
                        </div>
                    ))}
                </div>

                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="mb-4 flex">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Итого
                                <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
                            </span>

                            <span className="text-lg font-bold">{totalAmount} грн</span>
                        </div>

                        <Link href="/cart">
                            <Button type="submit" className="h-12 w-full text-base">
                                Оформить заказ
                                <ArrowRight className="ml-2 w-5" />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
