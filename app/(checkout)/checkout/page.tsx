'use client';

import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';

import { Title, CheckoutSidebar, CheckoutCart, CheckoutPersonalForm, CheckoutAddressForm } from '@/shared/components';
import { useCart } from '@/shared/hooks';
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants';
import { Api } from '@/shared/services/api-client';
import { useSession } from 'next-auth/react';
import { email } from 'zod';

export default function CheckoutPage() {
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const { totalAmount, items, loading, removeCartItem, onClickCountButton } = useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            comment: '',
        },
        mode: 'onChange',
    });

    useEffect(() => {
        async function fetchUserData() {
            const res = await Api.auth.getMeInfo();

            const [firstName, lastName] = res.fullName.split(' ');

            form.setValue('firstName', firstName);
            form.setValue('lastName', lastName);
            form.setValue('email', res.email);
        }

        if (session) {
            fetchUserData();
        }
    }, [session]);

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);

            const url = await createOrder(data);

            toast.success('Заказ успешно оформлен! 📝 Переход на оплату... ', {
                icon: '✅',
            });

            if (url) {
                window.location.href = url;
            }
        } catch (err) {
            console.log(err);
            setSubmitting(false);
            toast.error('Не удалось создать заказ', {
                icon: '❌',
            });
        }
    };
    return (
        <>
            <Title text="Оформление заказа" className="py-8 text-[36px] font-extrabold" />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        {/* Левая часть */}
                        <div className="mb-20 flex flex-1 flex-col gap-10">
                            <CheckoutCart items={items} loading={loading} onClickCountButton={onClickCountButton} removeCartItem={removeCartItem} />

                            <CheckoutPersonalForm className={loading ? 'pointer-events-none opacity-40' : ''} />

                            <CheckoutAddressForm className={loading ? 'pointer-events-none opacity-40' : ''} />
                        </div>

                        {/* Правая часть */}
                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}
