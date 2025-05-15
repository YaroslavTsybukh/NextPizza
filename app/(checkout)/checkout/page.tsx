'use client';

import { ReactNode } from 'react';

import { Title, WhiteBlock, CheckoutItem, CheckoutSidebar } from '@/shared/components/shared';
import { FormInput } from '@/shared/components/shared/form';
import { Input, Textarea } from '@/shared/components/ui';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { useCart } from '@/shared/hooks';

export default function CheckoutPage({ children }: { children: ReactNode }) {
    const { totalAmount, items, removeCartItem, onClickCountButton } = useCart();

    return (
        <>
            <Title text="Оформление заказа" className="py-8 text-[36px] font-extrabold" />
            <div className="flex gap-10">
                {/* Левая часть */}
                <div className="mb-20 flex flex-1 flex-col gap-10">
                    <WhiteBlock title="1. Корзина">
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

                    <WhiteBlock title="2. Персональная информация">
                        <div className="grid grid-cols-2 gap-5">
                            <FormInput name="firstName" className="text-base" placeholder="Имя" />
                            <FormInput name="lastname" className="text-base" placeholder="Фамилия" />
                            <FormInput name="email" className="text-base" placeholder="E-mail" />
                            <FormInput name="phone" className="text-base" placeholder="Телефон" />
                        </div>
                    </WhiteBlock>

                    <WhiteBlock title="3. Адрес доставки">
                        <div className="flex flex-col gap-5">
                            <Input name="address" className="text-base" placeholder="Укажите адресс" />
                            <Textarea className="text-base" placeholder="Укажите комментарий к заказу" rows={5} />
                        </div>
                    </WhiteBlock>
                </div>

                {/* Правая часть */}
                <div className="w-[450px]">
                    <CheckoutSidebar totalAmount={totalAmount} />
                </div>
            </div>
        </>
    );
}
