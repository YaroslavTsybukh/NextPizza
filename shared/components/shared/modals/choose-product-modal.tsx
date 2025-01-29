'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ProductWithRelations } from '@/@types/prisma';
import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent, DialogTitle } from '../../ui/dialog';
import { ChoosePizzaForm, ChooseProductForm } from '..';
import { useCartStore } from '@/shared/store';
import toast from 'react-hot-toast';

interface IProps {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: FC<IProps> = ({ product, className }) => {
    const [addCartItem, loading] = useCartStore(useShallow((state) => [state.addCartItem, state.loading]));
    const router = useRouter();
    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem.pizzaType);

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id;

            await addCartItem({ productItemId: itemId, ingredients });

            toast.success(`${product.name} добавлена в корзину`);
            router.back();
        } catch (e) {
            if (e instanceof Error) {
                toast.error('Не удалось добавить товар в корзину.');
                console.error(e);
            }
        }
    };

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <VisuallyHidden.Root>
                <DialogTitle />
            </VisuallyHidden.Root>
            <DialogContent className={cn('min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0', className)}>
                {isPizzaForm ? (
                    <ChoosePizzaForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        ingredients={product.ingredients}
                        productItems={product.items}
                        onSubmit={onSubmit}
                        loading={loading}
                    />
                ) : (
                    <ChooseProductForm
                        imageUrl={product.imageUrl}
                        name={product.name}
                        price={firstItem.price}
                        onSubmit={onSubmit}
                        loading={loading}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
