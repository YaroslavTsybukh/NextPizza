import { FC } from 'react';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { Button, CheckoutItemDetails, WhiteBlock } from '@/shared/components';

interface IProps {
    totalAmount: number;
    className?: string;
}

const VAT = 15;
const DELIVERY_PRICE = 100;

export const CheckoutSidebar: FC<IProps> = ({ totalAmount, className }) => {
    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

    return (
        <WhiteBlock className={cn('sticky top-4 p-6', className)}>
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого</span>
                <span className="text-[34px] font-extrabold">{totalPrice} грн</span>
            </div>

            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Package size={18} className="mr-2 text-gray-400" />
                        <p>Стоиомсть корзины:</p>
                    </div>
                }
                value={`${totalAmount} грн`}
            />

            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Percent size={18} className="mr-2 text-gray-400" />
                        <p>Налоги:</p>
                    </div>
                }
                value={vatPrice}
            />

            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Truck size={18} className="mr-2 text-gray-400" />
                        <p>Доставка:</p>
                    </div>
                }
                value={`${DELIVERY_PRICE} грн`}
            />

            <Button type="submit" className="mt-6 h-14 w-full rounded-2xl text-base font-bold">
                Перейти к оплате
                <ArrowRight className="ml-2 w-5" />
            </Button>
        </WhiteBlock>
    );
};
