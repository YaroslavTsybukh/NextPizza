import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useCartStore } from '@/shared/store';
import { ICartStateItem } from '@/shared/lib';

interface IReturnValues {
    totalAmount: number;
    items: ICartStateItem[];
    removeCartItem: (id: number) => Promise<void>;
    onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
}

export const useCart = (): IReturnValues => {
    const [totalAmount, items, updateItemQuantity, getCartItems, removeCartItem] = useCartStore(
        useShallow((state) => [state.totalAmount, state.items, state.updateItemQuantity, state.getCartItems, state.removeCartItem]),
    );

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    useEffect(() => {
        getCartItems();
    }, []);

    return {
        totalAmount,
        items,
        removeCartItem,
        onClickCountButton,
    };
};
