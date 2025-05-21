'use client';

import { FC } from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/react/shallow';

import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/shared/store';
import { ChoosePizzaForm, ChooseProductForm } from '@/shared/components';

interface IProps {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
}

export const ProductForm: FC<IProps> = ({ product, onSubmit: _onSubmit }) => {
    const [addCartItem, loading] = useCartStore(useShallow((state) => [state.addCartItem, state.loading]));
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;

            await addCartItem({ productItemId: itemId, ingredients });

            toast.success(`${product.name} добавлена в корзину`);

            _onSubmit?.();
        } catch (e) {
            if (e instanceof Error) {
                toast.error('Не удалось добавить товар в корзину.');
                console.error(e);
            }
        }
    };

    if (isPizzaForm) {
        return (
            <ChoosePizzaForm
                imageUrl={product.imageUrl}
                name={product.name}
                ingredients={product.ingredients}
                productItems={product.items}
                onSubmit={onSubmit}
                loading={loading}
            />
        );
    }

    return <ChooseProductForm imageUrl={product.imageUrl} name={product.name} price={firstItem.price} onSubmit={onSubmit} loading={loading} />;
};
