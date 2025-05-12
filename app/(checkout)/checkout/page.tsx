'use client';

import { ReactNode } from 'react';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

import { Title, WhiteBlock, CheckoutItemDetails, CheckoutItem } from '@/shared/components/shared';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { Button } from '@/shared/components/ui/button';
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
                            <Input name="firstName" className="text-base" placeholder="Имя" />
                            <Input name="lastname" className="text-base" placeholder="Фамилия" />
                            <Input name="email" className="text-base" placeholder="E-mail" />
                            <Input name="phone" className="text-base" placeholder="Телефон" />
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
                    <WhiteBlock className="sticky top-4 p-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-xl">Итого</span>
                            <span className="text-[34px] font-extrabold">1500 грн</span>
                        </div>

                        <CheckoutItemDetails
                            title={
                                <div className="flex items-center">
                                    <Package size={18} className="mr-2 text-gray-400" />
                                    <p>Стоиомсть корзины:</p>
                                </div>
                            }
                            value="500 грн"
                        />

                        <CheckoutItemDetails
                            title={
                                <div className="flex items-center">
                                    <Percent size={18} className="mr-2 text-gray-400" />
                                    <p>Налоги:</p>
                                </div>
                            }
                            value="500 грн"
                        />

                        <CheckoutItemDetails
                            title={
                                <div className="flex items-center">
                                    <Truck size={18} className="mr-2 text-gray-400" />
                                    <p>Доставка:</p>
                                </div>
                            }
                            value="500 грн"
                        />

                        <Button type="submit" className="mt-6 h-14 w-full rounded-2xl text-base font-bold">
                            Перейти к оплате
                            <ArrowRight className="ml-2 w-5" />
                        </Button>
                    </WhiteBlock>
                </div>
            </div>
        </>
    );
}
