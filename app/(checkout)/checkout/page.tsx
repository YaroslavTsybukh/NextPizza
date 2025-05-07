import { ReactNode } from 'react';
import { Title, WhiteBlock } from '@/shared/components/shared';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';

export default function CheckoutPage({ children }: { children: ReactNode }) {
    return (
        <>
            <Title text="Оформление заказа" className="py-8 text-[36px] font-extrabold" />
            <div className="flex gap-10">
                {/* Левая часть */}
                <div className="mb-20 flex flex-1 flex-col gap-10">
                    <WhiteBlock title="1. Корзина">Lorem ipsum</WhiteBlock>

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
                <div className="w-[450px]">Right side</div>
            </div>
        </>
    );
}
