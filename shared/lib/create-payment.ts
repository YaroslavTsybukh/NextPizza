import Stripe from 'stripe';

import { IUserCart } from '@/@types';

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: '2025-08-27.basil',
});

export const createPayment = async (userCartItems: IUserCart[], orderId: number, origin: string) => {
    const session = await stripe.checkout.sessions.create({
        automatic_tax: { enabled: false },
        line_items: userCartItems.map((item) => {
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
        metadata: { orderId: orderId.toString() },
        payment_intent_data: {
            metadata: { orderId: orderId.toString() },
        },
    });

    return session.url;
};
