import {
    Container,
    Filters,
    ProductsGroupList,
    Title,
    TopBar,
} from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function HomePage() {
    const categories = await prisma.category.findMany({
        include: {
            products: {
                include: {
                    ingredients: true,
                    items: true,
                },
            },
        },
    });

    return (
        <>
            <Container className="mt-5">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>

            <TopBar categories={categories} />

            <Container className="my-14">
                <div className="flex gap-[60px]">
                    <Filters />

                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map((category) => (
                                <ProductsGroupList
                                    key={category.id}
                                    title={category.name}
                                    items={category.products}
                                    categoryId={category.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
