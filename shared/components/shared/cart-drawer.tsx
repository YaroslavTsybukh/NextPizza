'use client';

import { FC, PropsWithChildren, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants';
import { useCart } from '@/shared/hooks';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, Button, CartDrawerItem } from '@/shared/components';

interface IProps {
    className?: string;
}

export const CartDrawer: FC<PropsWithChildren<IProps>> = ({ children, className }) => {
    const [redirecting, setRedirecting] = useState<boolean>(false);
    const { totalAmount, items, removeCartItem, onClickCountButton } = useCart();

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className="flex flex-col justify-between bg-[#F4F1EE] pb-0">
                <div className={cn('flex h-full flex-col', !totalAmount && 'justify-center')}>
                    {totalAmount > 0 && (
                        <SheetHeader>
                            <SheetTitle>
                                В корзине <span className="font-bold">{items.length} товара</span>
                            </SheetTitle>
                        </SheetHeader>
                    )}

                    {!totalAmount && (
                        <div className="mx-auto flex w-72 flex-col items-center justify-center">
                            <Image src="/assets/images/empty-box.png" alt="Пустая корзина" width={120} height={120} />
                            <SheetTitle>Корзина пустая</SheetTitle>
                            <p className="mb-5 text-center text-neutral-500">Добавьте хотя бы один товар, чтобы совершить заказ</p>
                            <SheetClose asChild>
                                <Button className="h-12 w-56 text-base" size="lg">
                                    <ArrowLeft className="mr-2 w-5" />
                                    Вернуться назад
                                </Button>
                            </SheetClose>
                        </div>
                    )}

                    {totalAmount > 0 && (
                        <>
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
                                            disabled={item.disabled}
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

                                    <Link href="/checkout">
                                        <Button
                                            onClick={() => setRedirecting(true)}
                                            loading={redirecting}
                                            type="submit"
                                            className="h-12 w-full text-base"
                                        >
                                            Оформить заказ
                                            <ArrowRight className="ml-2 w-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </SheetFooter>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};
