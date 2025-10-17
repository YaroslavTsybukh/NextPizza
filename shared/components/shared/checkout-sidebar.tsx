import { FC } from 'react';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';

import { cn } from '@/shared/lib/utils';
import { calculateTotalWithFees } from '@/shared/lib';
import { Button, CheckoutItemDetails, WhiteBlock, Skeleton } from '@/shared/components';

interface IProps {
    totalAmount: number;
    loading: boolean;
    className?: string;
}

export const CheckoutSidebar: FC<IProps> = ({ totalAmount, loading, className }) => {
    const { totalPriceWithFees, vatPrice, deliveryPrice } = calculateTotalWithFees(totalAmount);

    return (
        <WhiteBlock className={cn('sticky top-4 p-6', className)}>
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого</span>
                {loading ? <Skeleton className="h-11 w-48" /> : <span className="h-11 text-[34px] font-extrabold">{totalPriceWithFees} грн</span>}
            </div>

            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Package size={18} className="mr-2 text-gray-400" />
                        <p>Стоимость корзины:</p>
                    </div>
                }
                value={loading ? <Skeleton className="rounde-[6px] h-6 w-16" /> : `${totalAmount} грн`}
            />

            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Percent size={18} className="mr-2 text-gray-400" />
                        <p>Налоги (15%) :</p>
                    </div>
                }
                value={loading ? <Skeleton className="rounde-[6px] h-6 w-16" /> : vatPrice}
            />

            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Truck size={18} className="mr-2 text-gray-400" />
                        <p>Доставка:</p>
                    </div>
                }
                value={loading ? <Skeleton className="rounde-[6px] h-6 w-16" /> : `${deliveryPrice} грн`}
            />

            <Button loading={loading} type="submit" className="mt-6 h-14 w-full rounded-2xl text-base font-bold">
                Перейти к оплате
                <ArrowRight className="ml-2 w-5" />
            </Button>
        </WhiteBlock>
    );
};
