'use server';

import { cookies, headers } from 'next/headers';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus, Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';

import { CheckoutFormValues } from '@/shared/constants';
import { sendEmail } from '@/shared/lib/send-email';
import { createPayment } from '@/shared/lib/create-payment';
import { PayOrderTemplate, VerificationUserTemplate } from '@/shared/components';
import { getUserSession } from '@/shared/lib/getUserSession';

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

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) throw new Error('Пользователь не найден');

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
            },
        });
    } catch (err) {
        console.log('Error [UPDATE_USER]', err);
        throw err;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error('Почта не подтверждена');
            }

            throw new Error('Пользователь уже существует');
        }

        const createdUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10),
            },
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
            },
        });

        await sendEmail(createdUser.email, 'Next Pizza / 📝 Подтверждение регистрации', VerificationUserTemplate({ code }));
    } catch (err) {
        console.log('Error [CREATE_USER]', err);
        throw err;
    }
}
