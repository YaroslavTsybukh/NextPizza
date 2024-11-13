import {
    Container,
    GroupVariants,
    PizzaImage,
    Title,
} from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductPage({
    params,
}: {
    params: { id: string };
}) {
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
            <div className="flex flex-1">
                <PizzaImage src={product.imageUrl} className="" size={40} />

                <div className="w-[490px] bg-[#f7f6f5] p-7">
                    <Title
                        text={product.name}
                        size="md"
                        className="mb-1 font-extrabold"
                    />
                    <p className="text-gray-400">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Quod, voluptas maiores deserunt accusantium, ullam
                        error suscipit temporibus nemo enim doloremque dolores
                        dolorum, et vero minima incidunt praesentium iusto
                        inventore quaerat!
                    </p>

                    <GroupVariants
                        value="1"
                        items={[
                            {
                                name: 'Маленькая',
                                value: '1',
                            },
                            {
                                name: 'Средняя',
                                value: '2',
                            },
                            {
                                name: 'Большая',
                                value: '3',
                                disabled: true,
                            },
                        ]}
                    />
                </div>
            </div>
        </Container>
    );
}
