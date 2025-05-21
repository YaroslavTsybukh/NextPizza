import { notFound } from 'next/navigation';

import { prisma } from '@/prisma/prisma-client';
import { Container, ProductForm } from '@/shared/components';

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await prisma.product.findFirst({
        where: { id: Number(params.id) },
        include: {
            ingredients: true,
            category: {
                include: {
                    products: {
                        include: {
                            items: true,
                        },
                    },
                },
            },
            items: true,
        },
    });

    if (!product) notFound();

    return (
        <Container className="my-10 flex flex-col">
            <ProductForm product={product} />
        </Container>
    );
}
