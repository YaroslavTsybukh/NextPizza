'use client';

import { ReactNode } from 'react';

import { Title, CheckoutSidebar, CheckoutCart, CheckoutPersonalForm, CheckoutAddressForm } from '@/shared/components/shared';
import { useCart } from '@/shared/hooks';

export default function CheckoutPage({ children }: { children: ReactNode }) {
    const { totalAmount, items, removeCartItem, onClickCountButton } = useCart();

    return (
        <>
            <Title text="Оформление заказа" className="py-8 text-[36px] font-extrabold" />
            <div className="flex gap-10">
                {/* Левая часть */}
                <div className="mb-20 flex flex-1 flex-col gap-10">
                    <CheckoutCart items={items} onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} />

                    <CheckoutPersonalForm />

                    <CheckoutAddressForm />
                </div>

                {/* Правая часть */}
                <div className="w-[450px]">
                    <CheckoutSidebar totalAmount={totalAmount} />
                </div>
            </div>
        </>
    );
}
