'use client';

import { FC } from 'react';
import { ArrowRight, Car, ShoppingCart } from 'lucide-react';
import { CartDrawer } from '.';
import { Button } from '../ui/button';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store';
import { useShallow } from 'zustand/react/shallow';

interface IProps {
    className?: string;
}

export const CartButton: FC<IProps> = ({ className }) => {
    const [loading, items, totalAmount] = useCartStore(useShallow((state) => [state.loading, state.items, state.totalAmount]));

    return (
        <CartDrawer>
            <Button loading={loading} className={cn('group relative', { 'w-[105px]': loading }, className)}>
                <b>{totalAmount} грн</b>
                <span className="mx-3 h-full w-[1px] bg-white/30" />
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart size={16} />
                    <b>{items.length}</b>
                </div>
                <ArrowRight className="absolute right-5 w-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </Button>
        </CartDrawer>
    );
};
