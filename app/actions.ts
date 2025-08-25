'use server';
import { cookies, headers } from 'next/headers';
import { prisma } from '@/prisma/prisma-client';
import Stripe from 'stripe';

import { OrderStatus } from '@prisma/client';
import { CheckoutFormValues } from '@/shared/constants';
import { sendEmail } from '@/shared/lib';
import { PayOrderTemplate } from '@/shared/components';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: '2025-07-30.basil',
});

export async function createOrder(data: CheckoutFormValues) {
    try {
        const cookieStore = cookies();
        const cartToken = cookieStore.get('cartToken')?.value;

        if (!cartToken) {
            throw new Error('Cart token not found');
        }

        /* Find the cart by token */
        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
            where: {
                token: cartToken,
            },
        });

        /* If the cart is not found, return an error */
        if (!userCart) {
            throw new Error('Cart not found');
        }

        /* If the cart is empty, return an error */
        if (userCart.totalAmount === 0) {
            throw new Error('Cart is empty');
        }

        /* Create an order */
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            },
        });

        /* Clear the cart */
        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            },
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id,
            },
        });

        //TODO: при деплои заменить url process.env.NEXT_PUBLIC_APP_URL с локалки на продовский.
        //TODO: сделать отдельную функцию для работы со Stripe (рефакторинг)
        /* Origin для success/cancel url */
        const headersList = headers();
        const origin = headersList.get('origin') || process.env.NEXT_PUBLIC_APP_URL;

        /* Создание сессии Stripe */
        const session = await stripe.checkout.sessions.create({
            automatic_tax: { enabled: false },
            line_items: userCart.items.map((item) => {
                const basePrice = item.productItem.price;
                const ingredientsPrice = item.ingredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
                const totalPrice = basePrice + ingredientsPrice;

                return {
                    price_data: {
                        currency: 'uah',
                        product_data: {
                            name: item.productItem.product.name,
                        },
                        unit_amount: totalPrice * 100,
                    },
                    quantity: item.quantity,
                    tax_rates: ['txr_1RzznhRvrpSR50qJacyq6gFW'],
                };
            }),
            mode: 'payment',
            shipping_options: [
                {
                    shipping_rate_data: {
                        display_name: 'Доставка',
                        fixed_amount: {
                            amount: 10000,
                            currency: 'uah',
                        },
                        type: 'fixed_amount',
                    },
                },
            ],
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?canceled=true`,
            metadata: { orderId: order.id.toString() },
        });

        await sendEmail(
            data.email,
            'Next Pizza / Оплатите заказ #' + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl: 'https://resend.com/docs/send-with-nextjs',
            }),
        );

        return session.url;
    } catch (err) {
        console.log('[CreateOrder] Server error', err);
        throw err;
    }
}
