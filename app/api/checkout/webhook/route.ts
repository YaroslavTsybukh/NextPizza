import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';

import { OrderSuccessTemplate } from '@/shared/components';
import { sendEmail } from '@/shared/lib/send-email';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: '2025-08-27.basil',
});

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get('stripe-signature')!;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET!);
        } catch (err) {
            console.log('❌ Webhook signature verification failed:', err);
            return new NextResponse('Webhook Error', { status: 400 });
        }

        let orderId: string | undefined;

        if (event.type.startsWith('checkout.session')) {
            const session = event.data.object as Stripe.Checkout.Session;
            orderId = session.metadata?.orderId;
        } else if (event.type.startsWith('payment_intent')) {
            const intent = event.data.object as Stripe.PaymentIntent;
            orderId = intent.metadata?.orderId;
        } else if (event.type.startsWith('charge')) {
            const charge = event.data.object as Stripe.Charge;
            orderId = charge.metadata?.orderId;
        }

        if (!orderId) return NextResponse.json({ error: 'No orderId in metadata' });

        const order = await prisma.order.findFirst({
            where: { id: Number(orderId) },
        });

        if (!order) return NextResponse.json({ error: 'Order not found' });

        //✅ Successful payment or ❌ Cancel or error

        if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
            await prisma.order.update({
                where: { id: order.id },
                data: { status: OrderStatus.SUCCEEDED },
            });

            const items = JSON.parse(order.items as string);
            await sendEmail(
                order.email,
                'Next Pizza / Ваш заказ успешно оформлен 🎉',
                OrderSuccessTemplate({ orderId: order.id, totalAmount: order.totalAmount, items }),
            );
        } else if (
            event.type === 'checkout.session.expired' ||
            event.type === 'checkout.session.async_payment_failed' ||
            event.type === 'payment_intent.payment_failed' ||
            event.type === 'charge.failed'
        ) {
            await prisma.order.update({
                where: { id: order.id },
                data: { status: OrderStatus.CANCELLED },
            });
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error('[Stripe webhook] Error:', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
