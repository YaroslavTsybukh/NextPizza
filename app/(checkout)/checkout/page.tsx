'use client';

import { ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Title, CheckoutSidebar, CheckoutCart, CheckoutPersonalForm, CheckoutAddressForm } from '@/shared/components/shared';
import { useCart } from '@/shared/hooks';
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants';

export default function CheckoutPage({ children }: { children: ReactNode }) {
    const { totalAmount, items, removeCartItem, onClickCountButton } = useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
        },
    });

    const onSubmit = (data) => console.log(data);

    return (
        <>
            <Title text="Оформление заказа" className="py-8 text-[36px] font-extrabold" />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                </form>
            </FormProvider>
        </>
    );
}
