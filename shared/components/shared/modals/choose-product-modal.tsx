'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

import { ProductWithRelations } from '@/@types/prisma';
import { cn } from '@/shared/lib/utils';
import { Dialog, DialogContent, DialogTitle } from '../../ui';
import { ProductForm } from '..';

interface IProps {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: FC<IProps> = ({ product, className }) => {
    const router = useRouter();

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <VisuallyHidden.Root>
                <DialogTitle />
            </VisuallyHidden.Root>
            <DialogContent className={cn('min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0', className)}>
                <ProductForm product={product} onSubmit={() => router.back()} />
            </DialogContent>
        </Dialog>
    );
};
