'use server';

import { cookies, headers } from 'next/headers';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';

import { CheckoutFormValues } from '@/shared/constants';
import { sendEmail, createPayment } from '@/shared/lib';
import { PayOrderTemplate } from '@/shared/components';

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
        /* Create Stripe session */
        const origin = headers().get('origin') || (process.env.NEXT_PUBLIC_APP_URL as string);
        const url = await createPayment(userCart.items, order.id, origin);

        if (!url) {
            throw new Error('Payment url not found');
        }

        await sendEmail(
            data.email,
            'Next Pizza / Оплатите заказ #' + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl: url,
            }),
        );

        return url;
    } catch (err) {
        console.log('[CreateOrder] Server error', err);
        throw err;
    }
}
