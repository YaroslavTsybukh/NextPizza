import { Suspense } from 'react';

import { Container, Filters, ProductsGroupList, QueryToaster, Stories, Title, TopBar } from '@/shared/components';
import { IGetSearchParams, findPizzas } from '@/shared/lib';

export default async function HomePage({ searchParams }: { searchParams: IGetSearchParams }) {
    const categories = await findPizzas(searchParams);

    return (
        <>
            <Suspense fallback={null}>
                <QueryToaster />
            </Suspense>

            <Container className="mt-5">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>

            <TopBar categories={categories} />

            <Stories />

            <Container className="my-14">
                <div className="flex gap-[60px]">
                    <Suspense fallback={null}>
                        <Filters />
                    </Suspense>

                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            {categories.map((category) => (
                                <ProductsGroupList key={category.id} title={category.name} items={category.products} categoryId={category.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
