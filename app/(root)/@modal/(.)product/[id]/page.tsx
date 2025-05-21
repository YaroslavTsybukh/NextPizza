import { notFound } from 'next/navigation';

import { prisma } from '@/prisma/prisma-client';
import { ChooseProductModal } from '@/shared/components';

export default async function ProductModalPage({ params }: { params: { id: string } }) {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(params.id),
        },
        include: {
            ingredients: true,
            items: true,
        },
    });

    if (!product) notFound();

    return <ChooseProductModal product={product} />;
}
