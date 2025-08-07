'use server';

import { prisma } from '@/prisma/prisma-client';
import { CheckoutFormValues } from '@/shared/constants';
import { OrderStatus } from '@prisma/client';
import { cookies } from 'next/headers';

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
        const order = prisma.order.create({
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

        //TODO: Сделать создание ссылки оплаты
        return 'https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations';
    } catch (err) {}
}
